import re
from typing import Optional

from flask_marshmallow.fields import fields

from src.common.core import ma
from src.models import RedditPost, Wine

REDDIT_POSTS = 20
REDDIT_MEDIA_URL = "https://www.redditmedia.com"


def get_reddit_stub(url: str) -> Optional[str]:
    regex = r"(/r/.*)"
    m = re.search(regex, url)
    return None if m is None else m.group(0)


class WineSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Wine
        ordered = True

    id = ma.auto_field()
    name = ma.auto_field()
    winery = ma.auto_field()
    image = ma.auto_field()
    reviews = ma.auto_field()
    country = ma.auto_field()
    region = ma.auto_field()
    type = ma.auto_field()

    rating = fields.Method("get_rating")
    redditPosts = fields.Method("get_reddit_posts")

    def get_rating(self, obj: Wine):
        return float(obj.rating)

    def get_reddit_posts(self, obj: Wine):
        if "reddit_post" not in self.context:
            return []

        reddit_post: RedditPost = self.context["reddit_post"]
        ret: list[str] = []

        for url in reddit_post.urls[0:REDDIT_POSTS]:
            stub = get_reddit_stub(url)
            if stub is not None:
                ret.append(f"{REDDIT_MEDIA_URL}{stub}")

        return ret


wine_partial_schema = WineSchema(exclude=["redditPosts"])
wines_partial_schema = WineSchema(exclude=["redditPosts"], many=True)
