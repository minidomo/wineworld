# mypy: disable-error-code="name-defined"

from typing import Any

from sqlalchemy import DECIMAL, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from src.common.core import db


class Wine(db.Model):
    __tablename__ = "wines"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    country = Column(String(100))
    region = Column(String(100))
    winery = Column(String(100))
    rating = Column(DECIMAL(2, 1))
    reviews = Column(Integer)
    type = Column(String(100))
    image = Column(String(100))
    reddit_post_id = Column(Integer, ForeignKey("reddit_posts.id"))
    reddit_post = relationship("RedditPost", back_populates="wines")
    region_list = relationship("WineRegionAssociation", back_populates="wine")
    vineyard_list = relationship("WineVineyardAssociation", back_populates="wine")
