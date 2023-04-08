from sqlalchemy.sql.expression import Select

from src.common.core import db
from src.models import RedditPost, Wine

WINES_REDDIT_QUERY: Select = db.select(Wine, RedditPost).join_from(
    Wine, RedditPost, Wine.reddit_post_id == RedditPost.id
)
