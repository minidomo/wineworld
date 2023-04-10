from flask_marshmallow.fields import fields

from src.common.core import ma
from src.models import Vineyard


class VineyardSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Vineyard
        ordered = True

    id = ma.auto_field()
    name = ma.auto_field()
    price = ma.auto_field()
    reviews = ma.auto_field()
    image = ma.auto_field()
    country = ma.auto_field()
    url = ma.auto_field()

    rating = fields.Method("get_rating")
    coordinates = fields.Method("get_coordinates")

    def get_rating(self, obj: Vineyard):
        return float(obj.rating)

    def get_coordinates(self, obj: Vineyard):
        return {
            "longitude": float(obj.longitude),
            "latitude": float(obj.latitude),
        }


vineyard_schema = VineyardSchema()
vineyards_schema = VineyardSchema(many=True)
