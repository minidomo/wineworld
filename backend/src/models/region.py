# mypy: disable-error-code="name-defined"

from sqlalchemy import DECIMAL, JSON, Column, Integer, String
from sqlalchemy.orm import relationship

from src.common.core import db


class Region(db.Model):
    __tablename__ = "regions"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    country = Column(String(100))
    rating = Column(DECIMAL(2, 1))
    reviews = Column(Integer)
    tags = Column(JSON)
    trip_types = Column(JSON)
    longitude = Column(DECIMAL(9, 6))
    latitude = Column(DECIMAL(9, 6))
    url = Column(String(150))
    image = Column(String(100))
    image_width = Column(Integer)
    image_height = Column(Integer)
    wine_list = relationship("WineRegionAssociation", back_populates="region")
    vineyard_list = relationship("VineyardRegionAssociation", back_populates="region")
