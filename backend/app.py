import math
import re
from typing import Any, Callable, Iterator

from flask import Request, make_response, request
from sqlalchemy.sql.expression import Select

from models import (
    RedditPost,
    Region,
    Vineyard,
    VineyardRegionAssociation,
    Wine,
    WineRegionAssociation,
    app,
    db,
)

PAGE_SIZE = 20

"""
useful info/documentation

db.session.execute()
- https://docs.sqlalchemy.org/en/14/orm/session_api.html#sqlalchemy.orm.Session.execute
- https://docs.sqlalchemy.org/en/14/core/connections.html#sqlalchemy.engine.Result

db.select()
- https://docs.sqlalchemy.org/en/14/core/selectable.html#sqlalchemy.sql.expression.Select

flask sqlalchemy
- https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/
"""


@app.route("/")
def hello_world():
    return """
    <h1> Welcome to the WineWorld API </h1> <br>
    Check out the <a href="https://documenter.getpostman.com/view/21507814/2s93CEvGRv">documentation</a>
    """


@app.route("/regions/<int:id>", methods=["GET"])
def get_region(id: int):
    region: Region = db.get_or_404(Region, id)

    wine_query: Select = db.select(WineRegionAssociation).where(WineRegionAssociation.region_id == region.id)
    wine_region_pairs: Iterator[WineRegionAssociation] = db.session.execute(wine_query).scalars()
    wines: list[Wine] = [db.session.get(Wine, e.wine_id) for e in wine_region_pairs]

    vineyard_query: Select = db.select(VineyardRegionAssociation).where(
        VineyardRegionAssociation.region_id == region.id
    )
    vineyard_region_pairs: Iterator[VineyardRegionAssociation] = db.session.execute(vineyard_query).scalars()
    vineyards: list[Vineyard] = [db.session.get(Vineyard, e.vineyard_id) for e in vineyard_region_pairs]

    data: dict[str, Any] = {
        **to_full_dict_region(region),
        "related": {
            "wines": [to_mini_dict_wine(e) for e in wines],
            "vineyards": [to_mini_dict_vineyard(e) for e in vineyards],
        },
    }

    return make_response(data, 200)


@app.route("/regions", methods=["GET"])
def get_all_regions():
    params = RegionParams(request)
    query: Select = db.select(Region)

    if params.name is not None:
        query = query.filter(Region.name.contains(params.name))

    if params.start_rating is not None:
        query = query.filter(Region.rating >= params.start_rating)

    if params.end_rating is not None:
        query = query.filter(Region.rating <= params.end_rating)

    if params.start_reviews is not None:
        query = query.filter(Region.reviews >= params.start_reviews)

    if params.end_reviews is not None:
        query = query.filter(Region.reviews <= params.end_reviews)

    regions: list[Region] = db.session.execute(query).scalars().all()

    def is_valid_country(e: Region) -> bool:
        for country in params.country:
            if e.country == country:
                return True
        return False

    def has_all_tags(e: Region) -> bool:
        tags: set[str] = set(e.tags)
        for tag in params.tags:
            if tag not in tags:
                return False
        return True

    def has_all_trip_types(e: Region) -> bool:
        trip_types: set[str] = set(e.trip_types)
        for trip_type in params.trip_types:
            if trip_type not in trip_types:
                return False
        return True

    filters: list[Callable[[Region], bool]] = []

    if len(params.country) > 0:
        filters.append(is_valid_country)

    if len(params.tags) > 0:
        filters.append(has_all_tags)

    if len(params.trip_types) > 0:
        filters.append(has_all_trip_types)

    regions = list(filter(lambda e: every(e, filters), regions))

    if params.name_sort is not None:
        reverse = not params.name_sort
        regions.sort(key=lambda e: e.name.lower(), reverse=reverse)

    total_pages = max(math.ceil(len(regions) / PAGE_SIZE), 1)
    params.page = min(max(params.page, 1), total_pages)

    indices = slice((params.page - 1) * PAGE_SIZE, params.page * PAGE_SIZE)
    region_list = [to_full_dict_region(e) for e in regions[indices]]

    data = {
        "page": params.page,
        "totalPages": total_pages,
        "length": len(region_list),
        "list": region_list,
    }

    return make_response(data, 200)


class RegionParams:
    def __init__(self, request: Request) -> None:
        self.page: int
        self.name = request.args.get("name", type=str)
        self.name_sort: bool | None = None
        self.country = request.args.getlist("country[]")
        self.start_rating = request.args.get("startRating", type=float)
        self.end_rating = request.args.get("endRating", type=float)
        self.start_reviews = request.args.get("startReviews", type=int)
        self.end_reviews = request.args.get("endReviews", type=int)
        self.tags = request.args.getlist("tags[]")
        self.trip_types = request.args.getlist("tripTypes[]")

        tmp_page = request.args.get("page", type=int)
        if tmp_page is None:
            self.page = 1
        else:
            self.page = tmp_page

        tmp_name_sort = request.args.get("nameSort", type=str)
        if tmp_name_sort is not None:
            self.name_sort = tmp_name_sort == "true"


def every(element: Any, predicates: list[Callable[[Any], bool]]) -> bool:
    for predicate in predicates:
        if not predicate(element):
            return False
    return True


def to_full_dict_region(element: Region) -> dict[str, Any]:
    return {
        "id": element.id,
        "name": element.name,
        "country": element.country,
        "rating": element.rating,
        "reviews": element.reviews,
        "tags": element.tags,
        "trip_types": element.trip_types,
        "coordinates": {
            "longitude": element.longitude,
            "latitude": element.latitude,
        },
        "url": element.url,
        "image": {
            "url": element.image,
            "width": element.image_width,
            "height": element.image_height,
        },
    }


def to_mini_dict_region(element: Region) -> dict[str, Any]:
    ret = to_full_dict_region(element)
    ret.pop("coordinates", None)
    return ret


def to_full_dict_wine(element: Wine, include_reddit_posts: bool = True) -> dict[str, Any]:
    ret = {
        "id": element.id,
        "name": element.name,
        "winery": element.winery,
        "image": element.image,
        "rating": element.rating,
        "reviews": element.reviews,
        "country": element.country,
        "region": element.region,
        "type": element.type,
    }

    if include_reddit_posts:
        reddit_post_model: RedditPost = db.session.execute(
            db.select(RedditPost).where(RedditPost.id == element.reddit_post_id)
        ).scalar_one()

        def get_stub(url: str) -> str | None:
            regex = r"(/r/.*)"
            m = re.search(regex, url)
            return None if m is None else m.group(0)

        REDDIT_POSTS = 20
        REDDIT_MEDIA_URL = "https://www.redditmedia.com"

        posts: list[str] = []

        for url in reddit_post_model.urls[0:REDDIT_POSTS]:
            stub = get_stub(url)
            if stub is not None:
                posts.append(f"{REDDIT_MEDIA_URL}{stub}")

        ret["reddit_posts"] = posts

    return ret


def to_mini_dict_wine(element: Wine) -> dict[str, Any]:
    ret = to_full_dict_wine(element, False)
    return ret


def to_full_dict_vineyard(element: Vineyard) -> dict[str, Any]:
    return {
        "id": element.id,
        "name": element.name,
        "price": element.price,
        "rating": element.rating,
        "reviews": element.reviews,
        "image": element.image,
        "country": element.country,
        "url": element.url,
        "coordinates": {
            "longitude": element.longitude,
            "latitude": element.latitude,
        },
    }


def to_mini_dict_vineyard(element: Vineyard) -> dict[str, Any]:
    ret = to_full_dict_vineyard(element)
    ret.pop("coordinates", None)
    return ret


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
