from flask_restful import Resource, reqparse
from sqlalchemy.engine import Row
from sqlalchemy.sql.expression import Select, or_, text

from src.common.core import db
from src.common.query_argument import QueryArgument
from src.common.sort_method import SortMethod
from src.models import Wine
from src.schemas import wines_partial_schema
from src.util.general import PAGE_SIZE, JsonObject, determine_total_pages

sort_methods: dict[str, SortMethod] = {
    e.id: e
    for e in [
        SortMethod(
            column=Wine.name,
            ascending=True,
            name="Name (A-Z)",
            group="Name",
        ),
        SortMethod(
            column=Wine.name,
            ascending=False,
            name="Name (Z-A)",
            group="Name",
        ),
        SortMethod(
            column=Wine.rating,
            ascending=True,
            name="Rating (Low to High)",
            group="Rating",
        ),
        SortMethod(
            column=Wine.rating,
            ascending=False,
            name="Rating (High to Low)",
            group="Rating",
        ),
        SortMethod(
            column=Wine.reviews,
            ascending=True,
            name="Review Count (Low to High)",
            group="Review Count",
        ),
        SortMethod(
            column=Wine.reviews,
            ascending=False,
            name="Review Count (High to Low)",
            group="Review Count",
        ),
        SortMethod(
            column=Wine.country,
            ascending=True,
            name="Country (A-Z)",
            group="Country",
        ),
        SortMethod(
            column=Wine.country,
            ascending=False,
            name="Country (Z-A)",
            group="Country",
        ),
        SortMethod(
            column=Wine.winery,
            ascending=True,
            name="Winery (A-Z)",
            group="Winery",
        ),
        SortMethod(
            column=Wine.winery,
            ascending=False,
            name="Winery (Z-A)",
            group="Winery",
        ),
        SortMethod(
            column=Wine.type,
            ascending=True,
            name="Type (A-Z)",
            group="Type",
        ),
        SortMethod(
            column=Wine.type,
            ascending=False,
            name="Type (Z-A)",
            group="Type",
        ),
    ]
}


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
            "country",
            lambda query, value: query.filter(or_(Wine.country == e for e in value)),
            type=str,
            location="values",
            action="append",
        ),
        QueryArgument(
            "winery",
            lambda query, value: query.filter(or_(Wine.winery == e for e in value)),
            type=str,
            location="values",
            action="append",
        ),
        QueryArgument(
            "type",
            lambda query, value: query.filter(or_(Wine.type == e for e in value)),
            type=str,
            location="values",
            action="append",
        ),
        QueryArgument(
            "startRating",
            lambda query, value: query.filter(Wine.rating >= value),
            type=float,
            location="values",
        ),
        QueryArgument(
            "endRating",
            lambda query, value: query.filter(Wine.rating <= value),
            type=float,
            location="values",
        ),
        QueryArgument(
            "startReviews",
            lambda query, value: query.filter(Wine.reviews >= value),
            type=int,
            location="values",
        ),
        QueryArgument(
            "endReviews",
            lambda query, value: query.filter(Wine.reviews <= value),
            type=int,
            location="values",
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
                    Wine.name.contains(value),
                    Wine.country.contains(value),
                    Wine.region.contains(value),
                    Wine.winery.contains(value),
                    Wine.type.contains(value),
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


class WinesAll(Resource):
    def get(self):
        args = parser.parse_args()
        query: Select = db.select(Wine, text("COUNT(*) OVER() as total_count"))

        for name in args:
            if args[name] is not None:
                query = arguments[name].callback(query, args[name])

        rows: list[Row] = db.session.execute(query).fetchall() if args["page"] is None or args["page"] >= 1 else []

        wine_list: list[JsonObject] = wines_partial_schema.dump(e for e, _ in rows)
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
            "length": len(wine_list),
            "list": wine_list,
        }

        return data
