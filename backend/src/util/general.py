import math
import re
from typing import Any, TypeVar

from flask import Request
from sqlalchemy.sql.expression import Select

from src.common.core import db
from src.models import RedditPost, Region, Vineyard, Wine

T = TypeVar("T")
JsonObject = dict[str, Any]

PAGE_SIZE = 20


def determine_total_pages(elements: int, page_size: int) -> int:
    if elements <= 0:
        return 1
    return math.ceil(elements / page_size)


class WineParams:
    def __init__(self, request: Request) -> None:
        self.page = request.args.get("page", type=int)
        self.name = request.args.get("name", type=str)  # TODO remove this
        self.country = request.args.getlist("country")
        self.winery = request.args.getlist("winery")
        self.start_rating = request.args.get("startRating", type=float)
        self.end_rating = request.args.get("endRating", type=float)
        self.start_reviews = request.args.get("startReviews", type=int)
        self.end_reviews = request.args.get("endReviews", type=int)
        self.type = request.args.getlist("type")
        self.sort = request.args.get("sort", type=str)
        self.search = request.args.get("search", type=str)


class VineyardParams:
    def __init__(self, request: Request) -> None:
        self.page = request.args.get("page", type=int)
        self.name = request.args.get("name", type=str)  # TODO remove this
        self.country = request.args.getlist("country")
        self.start_price = request.args.get("startPrice", type=int)
        self.end_price = request.args.get("endPrice", type=int)
        self.start_rating = request.args.get("startRating", type=float)
        self.end_rating = request.args.get("endRating", type=float)
        self.start_reviews = request.args.get("startReviews", type=int)
        self.end_reviews = request.args.get("endReviews", type=int)
        self.sort = request.args.get("sort", type=str)
        self.search = request.args.get("search", type=str)


class RegionUtil:
    @staticmethod
    def to_json(data: Region, small: bool = False) -> JsonObject:
        ret = {
            "id": data.id,
            "name": data.name,
            "country": data.country,
            "rating": float(data.rating),
            "reviews": data.reviews,
            "tags": data.tags,
            "tripTypes": data.trip_types,
            "coordinates": {
                "longitude": float(data.longitude),
                "latitude": float(data.latitude),
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
            "rating": float(data.rating),
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

            ret["redditPosts"] = posts

        return ret


class VineyardUtil:
    @staticmethod
    def to_json(data: Vineyard, small: bool = False) -> JsonObject:
        ret = {
            "id": data.id,
            "name": data.name,
            "price": data.price,
            "rating": float(data.rating),
            "reviews": data.reviews,
            "image": data.image,
            "country": data.country,
            "url": data.url,
            "coordinates": {
                "longitude": float(data.longitude),
                "latitude": float(data.latitude),
            },
        }

        if small:
            ret.pop("coordinates", None)

        return ret
