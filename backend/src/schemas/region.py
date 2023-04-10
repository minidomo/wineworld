from flask_marshmallow.fields import fields

from src.common.core import ma
from src.models import Region


class RegionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Region
        ordered = True

    id = ma.auto_field()
    name = ma.auto_field()
    country = ma.auto_field()
    reviews = ma.auto_field()
    tags = ma.auto_field()
    url = ma.auto_field()

    tripTypes = fields.Method("get_trip_types")
    rating = fields.Method("get_rating")
    coordinates = fields.Method("get_coordinates")
    image = fields.Method("get_image")

    def get_trip_types(self, obj: Region):
        return obj.trip_types

    def get_rating(self, obj: Region):
        return float(obj.rating)

    def get_coordinates(self, obj: Region):
        return {
            "longitude": float(obj.longitude),
            "latitude": float(obj.latitude),
        }

    def get_image(self, obj: Region):
        return {
            "url": obj.image,
            "width": obj.image_width,
            "height": obj.image_height,
        }


region_schema = RegionSchema()
regions_schema = RegionSchema(many=True)
