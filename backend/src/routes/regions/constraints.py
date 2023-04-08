from flask_restful import Resource
from sqlalchemy.sql.expression import Select, text

from src.common.core import db
from src.common.sort_method import region_sort_methods
from src.models import Region


class RegionsConstraints(Resource):
    def get(self):
        countries_query: Select = db.select(Region.country)
        countries_query = countries_query.distinct().order_by(Region.country.asc())
        countries: list[str] = db.session.execute(countries_query).scalars().all()

        trip_type_val = "trip_type_val"
        trip_types_query = text(
            f"""
            SELECT DISTINCT
                {trip_type_val}
            FROM
                {Region.__tablename__},
                JSON_TABLE(
                    {Region.trip_types.key},
                    '$[*]' COLUMNS(
                        {trip_type_val} VARCHAR(100) PATH '$'
                    )
                ) as _temp
            ORDER BY
                {trip_type_val}
                ASC
        """
        )
        trip_types: list[str] = db.session.execute(trip_types_query).scalars().all()

        tag_val = "tag_val"
        tags_query = text(
            f"""
            SELECT DISTINCT
                {tag_val}
            FROM
                {Region.__tablename__},
                JSON_TABLE(
                    {Region.tags.key},
                    '$[*]' COLUMNS(
                        {tag_val} VARCHAR(100) PATH '$'
                    )
                ) as _temp
            ORDER BY
                {tag_val}
                ASC
        """
        )
        tags: list[str] = db.session.execute(tags_query).scalars().all()

        sorts = [e.to_json() for e in region_sort_methods.values()]
        sorts.sort(key=lambda e: e["id"])

        data = {
            "rating": {
                "min": 0.0,
                "max": 5.0,
            },
            "reviews": {
                "min": 0,
            },
            "tripTypes": trip_types,
            "tags": tags,
            "countries": countries,
            "sorts": sorts,
        }

        return data
