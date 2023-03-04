from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import Wine, Vineyard, Region

mm = Marshmallow()


class WineSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Wine


class VineyardSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Vineyard


class RegionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Region


wine_schema = WineSchema()
vineyard_schema = VineyardSchema()
region_schema = RegionSchema()
