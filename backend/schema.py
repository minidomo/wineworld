from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from models import Wine, Vineyard, Region, Tag, TripType

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

class TagSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Tag

class TripTypeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TripType

wine_schema = WineSchema()
vineyard_schema = VineyardSchema()
region_schema = RegionSchema()
tag_schema = TagSchema()
tripType_schema = TripTypeSchema()