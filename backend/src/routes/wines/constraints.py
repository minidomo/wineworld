from flask_restful import Resource
from sqlalchemy.sql.expression import Select

from src.common.core import db
from src.models import Wine
from src.routes.wines.all import sort_methods


class WinesConstraints(Resource):
    def get(self):
        countries_query: Select = db.select(Wine.country)
        countries_query = countries_query.distinct().order_by(Wine.country.asc())
        countries: list[str] = db.session.execute(countries_query).scalars().all()

        wineries_query: Select = db.select(Wine.winery)
        wineries_query = wineries_query.distinct().order_by(Wine.winery.asc())
        wineries: list[str] = db.session.execute(wineries_query).scalars().all()

        types_query: Select = db.select(Wine.type)
        types_query = types_query.distinct().order_by(Wine.type.asc())
        types: list[str] = db.session.execute(types_query).scalars().all()

        sorts = [e.to_json() for e in sort_methods.values()]
        sorts.sort(key=lambda e: e["id"])

        data = {
            "rating": {
                "min": 0.0,
                "max": 5.0,
            },
            "reviews": {
                "min": 0,
            },
            "types": types,
            "wineries": wineries,
            "countries": countries,
            "sorts": sorts,
        }

        return data
