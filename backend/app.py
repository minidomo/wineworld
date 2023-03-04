import re
from typing import Any, Iterator

from flask import make_response

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


@app.route("/")
def hello_world():
    return """
    <h1> Welcome to the WineWorld API </h1> <br>
    Check out the <a href="https://documenter.getpostman.com/view/21507814/2s93CEvGRv">documentation</a>
    """


@app.route("/regions/<int:id>", methods=["GET"])
def get_region(id: int):
    region: Region = db.get_or_404(Region, id)

    wine_region_pairs: Iterator[WineRegionAssociation] = db.session.execute(
        db.select(WineRegionAssociation).where(WineRegionAssociation.region_id == region.id)
    ).scalars()
    wines = [db.session.get(Wine, e.wine_id) for e in wine_region_pairs]

    vineyard_region_pairs: Iterator[VineyardRegionAssociation] = db.session.execute(
        db.select(VineyardRegionAssociation).where(VineyardRegionAssociation.region_id == region.id)
    ).scalars()
    vineyards = [db.session.get(Vineyard, e.vineyard_id) for e in vineyard_region_pairs]

    data: dict[str, Any] = {
        **to_full_dict_region(region),
        "related": {
            "wines": [to_mini_dict_wine(e) for e in wines],
            "vineyards": [to_mini_dict_vineyard(e) for e in vineyards],
        },
    }

    return make_response(data, 200)


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
