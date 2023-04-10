# mypy: disable-error-code="name-defined"

from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship

from src.common.core import db


class WineVineyardAssociation(db.Model):
    __tablename__ = "wine_vineyard_association"
    wine_id = Column(ForeignKey("wines.id"), primary_key=True)
    vineyard_id = Column(ForeignKey("vineyards.id"), primary_key=True)
    wine = relationship("Wine", back_populates="vineyard_list")
    vineyard = relationship("Vineyard", back_populates="wine_list")
