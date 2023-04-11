from flask_restful import Resource, reqparse
from sqlalchemy.engine import Row
from sqlalchemy.sql.expression import Select, or_, text

from src.common.core import db
from src.common.query_argument import QueryArgument
from src.common.sort_method import SortMethod
from src.models import Region
from src.schemas import regions_schema
from src.util.general import PAGE_SIZE, JsonObject, determine_total_pages

sort_methods: dict[str, SortMethod] = {
    e.id: e
    for e in [
        SortMethod(
            column=Region.name,
            ascending=True,
            name="Name (A-Z)",
            group="Name",
        ),
        SortMethod(
            column=Region.name,
            ascending=False,
            name="Name (Z-A)",
            group="Name",
        ),
        SortMethod(
            column=Region.rating,
            ascending=True,
            name="Rating (Low to High)",
            group="Rating",
        ),
        SortMethod(
            column=Region.rating,
            ascending=False,
            name="Rating (High to Low)",
            group="Rating",
        ),
        SortMethod(
            column=Region.reviews,
            ascending=True,
            name="Review Count (Low to High)",
            group="Review Count",
        ),
        SortMethod(
            column=Region.reviews,
            ascending=False,
            name="Review Count (High to Low)",
            group="Review Count",
        ),
        SortMethod(
            column=Region.country,
            ascending=True,
            name="Country (A-Z)",
            group="Country",
        ),
        SortMethod(
            column=Region.country,
            ascending=False,
            name="Country (Z-A)",
            group="Country",
        ),
    ]
}


def process_tags(query: Select, tags: list[str]) -> Select:
    for tag in tags:
        query = query.filter(text(f"'{tag}' MEMBER OF({Region.tags.key})"))
    return query


def process_trip_types(query: Select, trip_types: list[str]) -> Select:
    for trip_type in trip_types:
        query = query.filter(text(f"'{trip_type}' MEMBER OF({Region.trip_types.key})"))
    return query


def process_sort(query: Select, id: str) -> Select:
    if id not in sort_methods:
        return query
    return query.order_by(sort_methods[id].clause)


arguments: dict[str, QueryArgument] = {
    e.name: e
    for e in [
        QueryArgument(
            "page",
            lambda query, value: query.limit(PAGE_SIZE).offset((value - 1) * PAGE_SIZE),
            type=int,
            location="values",
        ),
        QueryArgument(
            "name",  # TODO deprecated
            lambda query, value: query.filter(Region.name.contains(value)),
            type=str,
            location="values",
        ),
        QueryArgument(
            "country",
            lambda query, value: query.filter(or_(Region.country == e for e in value)),
            type=str,
            location="values",
            action="append",
        ),
        QueryArgument(
            "startRating",
            lambda query, value: query.filter(Region.rating >= value),
            type=float,
            location="values",
        ),
        QueryArgument(
            "endRating",
            lambda query, value: query.filter(Region.rating <= value),
            type=float,
            location="values",
        ),
        QueryArgument(
            "startReviews",
            lambda query, value: query.filter(Region.reviews >= value),
            type=int,
            location="values",
        ),
        QueryArgument(
            "endReviews",
            lambda query, value: query.filter(Region.reviews <= value),
            type=int,
            location="values",
        ),
        QueryArgument(
            "tags",
            process_tags,
            type=str,
            location="values",
            action="append",
        ),
        QueryArgument(
            "tripTypes",
            process_trip_types,
            type=str,
            location="values",
            action="append",
        ),
        QueryArgument(
            "sort",
            process_sort,
            type=str,
            location="values",
        ),
        QueryArgument(
            "search",
            lambda query, value: query.filter(
                or_(
                    Region.name.contains(value),
                    Region.country.contains(value),
                    text(f"REGEXP_LIKE(`{Region.trip_types.key}`, '.*{value}.*', 'i')"),
                )
            ),
            type=str,
            location="values",
        ),
    ]
}

parser = reqparse.RequestParser()
for argument in arguments.values():
    argument.add_to_parser(parser)


class RegionsAll(Resource):
    def get(self):
        args = parser.parse_args()
        query: Select = db.select(Region, text("COUNT(*) OVER() as total_count"))

        for name in args:
            if args[name] is not None:
                query = arguments[name].callback(query, args[name])

        rows: list[Row] = db.session.execute(query).fetchall() if args["page"] is None or args["page"] >= 1 else []

        region_list: list[JsonObject] = regions_schema.dump(e for e, _ in rows)
        _, total_instances = rows[0] if len(rows) > 0 else (0, 0)

        cur_page = 1
        total_pages = 1

        if args["page"] is not None:
            cur_page = args["page"]
            total_pages = determine_total_pages(total_instances, PAGE_SIZE)

        data = {
            "page": cur_page,
            "totalPages": total_pages,
            "totalInstances": total_instances,
            "length": len(region_list),
            "list": region_list,
        }

        return data
