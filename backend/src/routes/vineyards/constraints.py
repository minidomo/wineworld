from flask_restful import Resource
from sqlalchemy.sql.expression import Select

from src.common.core import db
from src.common.sort_method import vineyard_sort_methods
from src.models import Vineyard


class VineyardsConstraints(Resource):
    def get(self):
        countries_query: Select = db.select(Vineyard.country)
        countries_query = countries_query.distinct().order_by(Vineyard.country.asc())
        countries: list[str] = db.session.execute(countries_query).scalars().all()

        sorts = [e.to_json() for e in vineyard_sort_methods.values()]
        sorts.sort(key=lambda e: e["id"])

        data = {
            "rating": {
                "min": 0.0,
                "max": 5.0,
            },
            "reviews": {
                "min": 0,
            },
            "price": {
                "min": 0,
                "max": 4,
            },
            "countries": countries,
            "sorts": sorts,
        }

        return data
