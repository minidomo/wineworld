# mypy: disable-error-code="name-defined"

from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship

from src.common.core import db


class VineyardRegionAssociation(db.Model):
    __tablename__ = "vineyard_region_association"
    vineyard_id = Column(ForeignKey("vineyards.id"), primary_key=True)
    region_id = Column(ForeignKey("regions.id"), primary_key=True)
    vineyard = relationship("Vineyard", back_populates="region_list")
    region = relationship("Region", back_populates="vineyard_list")
