# mypy: disable-error-code="name-defined"

from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship

from src.common.core import db


class WineRegionAssociation(db.Model):
    __tablename__ = "wine_region_association"
    wine_id = Column(ForeignKey("wines.id"), primary_key=True)
    region_id = Column(ForeignKey("regions.id"), primary_key=True)
    wine = relationship("Wine", back_populates="region_list")
    region = relationship("Region", back_populates="wine_list")
