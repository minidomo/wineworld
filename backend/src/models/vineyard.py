# mypy: disable-error-code="name-defined"

from sqlalchemy import DECIMAL, JSON, Column, Integer, String
from sqlalchemy.orm import relationship

from src.common.core import db


class Vineyard(db.Model):
    __tablename__ = "vineyards"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    country = Column(String(100))
    price = Column(Integer)
    rating = Column(DECIMAL(2, 1))
    reviews = Column(Integer)
    image = Column(String(100))
    url = Column(String(100))
    longitude = Column(DECIMAL(9, 6))
    latitude = Column(DECIMAL(9, 6))
    region_names = Column(JSON)
    wine_list = relationship("WineVineyardAssociation", back_populates="vineyard")
    region_list = relationship("VineyardRegionAssociation", back_populates="vineyard")
