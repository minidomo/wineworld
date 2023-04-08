from typing import Any, Type, TypeVar

from sqlalchemy.engine import Row
from sqlalchemy.sql.expression import Select

from src.common.core import db
from src.models import RedditPost, Wine

JsonObject = dict[str, Any]
T = TypeVar("T")

WINES_REDDIT_QUERY: Select = db.select(Wine, RedditPost).join_from(
    Wine, RedditPost, Wine.reddit_post_id == RedditPost.id
)


def get_related_instances(model, atable_id, atable_where_clause, schema) -> list[JsonObject]:
    filter: Select = model.id.in_(db.select(atable_id).where(atable_where_clause))
    query: Select = db.select(model).filter(filter)
    rows: list[Row] = db.session.execute(query).fetchall()
    instances: list[JsonObject] = schema.dump(e[0] for e in rows)
    return instances
