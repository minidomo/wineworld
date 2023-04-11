# mypy: disable-error-code="name-defined"

from sqlalchemy import JSON, Column, Integer, String
from sqlalchemy.orm import relationship

from src.common.core import db


class RedditPost(db.Model):
    __tablename__ = "reddit_posts"
    id = Column(Integer, primary_key=True)
    wine_type = Column(String(20))
    urls = Column(JSON)
    wines = relationship("Wine", back_populates="reddit_post")
