import math
import re
from typing import Any, Callable, TypeVar

from flask import Request
from sqlalchemy.sql.expression import Select

from models import RedditPost, Region, Vineyard, Wine, db

T = TypeVar("T")
UnaryPredicate = Callable[[T], bool]
JsonObject = dict[str, Any]

PAGE_SIZE = 20


def every(element: Any, predicates: list[UnaryPredicate[T]]) -> bool:
    for predicate in predicates:
        if not predicate(element):
            return False
    return True


def clamp(min_val: int, max_val: int, val: int) -> int:
    if val < min_val:
        return min_val
    if val > max_val:
        return max_val
    return val


def determine_total_pages(elements: int, page_size: int) -> int:
    if elements <= 0:
        return 1
    return math.ceil(elements / page_size)


class WineParams:
    def __init__(self, request: Request) -> None:
        self.page: int
        self.name = request.args.get("name", type=str)
        self.name_sort: bool | None = None
        self.country = request.args.getlist("country")
        self.winery = request.args.getlist("winery")
        self.start_rating = request.args.get("startRating", type=float)
        self.end_rating = request.args.get("endRating", type=float)
        self.start_reviews = request.args.get("startReviews", type=int)
        self.end_reviews = request.args.get("endReviews", type=int)
        self.type = request.args.getlist("type")

        tmp_page = request.args.get("page", type=int)
        if tmp_page is None:
            self.page = 1
        else:
            self.page = tmp_page

        tmp_name_sort = request.args.get("nameSort", type=str)
        if tmp_name_sort is not None:
            self.name_sort = tmp_name_sort == "true"


class VineyardParams:
    def __init__(self, request: Request) -> None:
        self.page: int
        self.name = request.args.get("name", type=str)
        self.name_sort: bool | None = None
        self.country = request.args.getlist("country")
        self.start_price = request.args.get("startPrice", type=int)
        self.end_price = request.args.get("endPrice", type=int)
        self.start_rating = request.args.get("startRating", type=float)
        self.end_rating = request.args.get("endRating", type=float)
        self.start_reviews = request.args.get("startReviews", type=int)
        self.end_reviews = request.args.get("endReviews", type=int)

        tmp_page = request.args.get("page", type=int)
        if tmp_page is None:
            self.page = 1
        else:
            self.page = tmp_page

        tmp_name_sort = request.args.get("nameSort", type=str)
        if tmp_name_sort is not None:
            self.name_sort = tmp_name_sort == "true"


class RegionParams:
    def __init__(self, request: Request) -> None:
        self.page: int
        self.name = request.args.get("name", type=str)
        self.name_sort: bool | None = None
        self.country = request.args.getlist("country")
        self.start_rating = request.args.get("startRating", type=float)
        self.end_rating = request.args.get("endRating", type=float)
        self.start_reviews = request.args.get("startReviews", type=int)
        self.end_reviews = request.args.get("endReviews", type=int)
        self.tags = request.args.getlist("tags")
        self.trip_types = request.args.getlist("tripTypes")

        tmp_page = request.args.get("page", type=int)
        if tmp_page is None:
            self.page = 1
        else:
            self.page = tmp_page

        tmp_name_sort = request.args.get("nameSort", type=str)
        if tmp_name_sort is not None:
            self.name_sort = tmp_name_sort == "true"


class RegionUtil:
    @staticmethod
    def to_json(data: Region, small: bool = False) -> JsonObject:
        ret = {
            "id": data.id,
            "name": data.name,
            "country": data.country,
            "rating": data.rating,
            "reviews": data.reviews,
            "tags": data.tags,
            "tripTypes": data.trip_types,
            "coordinates": {
                "longitude": data.longitude,
                "latitude": data.latitude,
            },
            "url": data.url,
            "image": {
                "url": data.image,
                "width": data.image_width,
                "height": data.image_height,
            },
        }

        if small:
            ret.pop("coordinates", None)

        return ret


class WineUtil:
    REDDIT_POSTS = 20
    REDDIT_MEDIA_URL = "https://www.redditmedia.com"

    @staticmethod
    def to_json(data: Wine, small: bool = False) -> JsonObject:
        ret = {
            "id": data.id,
            "name": data.name,
            "winery": data.winery,
            "image": data.image,
            "rating": data.rating,
            "reviews": data.reviews,
            "country": data.country,
            "region": data.region,
            "type": data.type,
        }

        if not small:
            query: Select = db.select(RedditPost).where(RedditPost.id == data.reddit_post_id)
            reddit_post_model: RedditPost = db.session.execute(query).scalar_one()

            def get_stub(url: str) -> str | None:
                regex = r"(/r/.*)"
                m = re.search(regex, url)
                return None if m is None else m.group(0)

            posts: list[str] = []

            for url in reddit_post_model.urls[0 : WineUtil.REDDIT_POSTS]:
                stub = get_stub(url)
                if stub is not None:
                    posts.append(f"{WineUtil.REDDIT_MEDIA_URL}{stub}")

            ret["reddit_posts"] = posts

        return ret


class VineyardUtil:
    @staticmethod
    def to_json(data: Vineyard, small: bool = False) -> JsonObject:
        ret = {
            "id": data.id,
            "name": data.name,
            "price": data.price,
            "rating": data.rating,
            "reviews": data.reviews,
            "image": data.image,
            "country": data.country,
            "url": data.url,
            "coordinates": {
                "longitude": data.longitude,
                "latitude": data.latitude,
            },
        }

        if small:
            ret.pop("coordinates", None)

        return ret
