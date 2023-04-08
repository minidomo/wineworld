from flask_restful import Resource, reqparse
from sqlalchemy.engine import Row
from sqlalchemy.sql.expression import Select, or_, text

from src.common.core import db
from src.common.query_argument import QueryArgument
from src.common.sort_method import SortMethod
from src.models import Vineyard
from src.schemas import vineyards_schema
from src.util.general import PAGE_SIZE, JsonObject, determine_total_pages

sort_methods: dict[str, SortMethod] = {
    e.id: e
    for e in [
        SortMethod(
            column=Vineyard.name,
            ascending=True,
            name="Name",
            group="Name",
        ),
        SortMethod(
            column=Vineyard.name,
            ascending=False,
            name="Name (Reverse)",
            group="Name",
        ),
        SortMethod(
            column=Vineyard.price,
            ascending=True,
            name="Price (Low to High)",
            group="Price",
        ),
        SortMethod(
            column=Vineyard.price,
            ascending=False,
            name="Price (High to Low)",
            group="Price",
        ),
        SortMethod(
            column=Vineyard.rating,
            ascending=True,
            name="Rating (Low to High)",
            group="Rating",
        ),
        SortMethod(
            column=Vineyard.rating,
            ascending=False,
            name="Rating (High to Low)",
            group="Rating",
        ),
        SortMethod(
            column=Vineyard.reviews,
            ascending=True,
            name="Review Count (Low to High)",
            group="Review Count",
        ),
        SortMethod(
            column=Vineyard.reviews,
            ascending=False,
            name="Review Count (High to Low)",
            group="Review Count",
        ),
        SortMethod(
            column=Vineyard.country,
            ascending=True,
            name="Country",
            group="Country",
        ),
        SortMethod(
            column=Vineyard.country,
            ascending=False,
            name="Country (Reverse)",
            group="Country",
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
            "name",  # TODO deprecated
            lambda query, value: query.filter(Vineyard.name.contains(value)),
            type=str,
            location="values",
        ),
        QueryArgument(
            "country",
            lambda query, value: query.filter(or_(Vineyard.country == e for e in value)),
            type=str,
            location="values",
            action="append",
        ),
        QueryArgument(
            "startPrice",
            lambda query, value: query.filter(Vineyard.price >= value),
            type=int,
            location="values",
        ),
        QueryArgument(
            "endPrice",
            lambda query, value: query.filter(Vineyard.price <= value),
            type=int,
            location="values",
        ),
        QueryArgument(
            "startRating",
            lambda query, value: query.filter(Vineyard.rating >= value),
            type=float,
            location="values",
        ),
        QueryArgument(
            "endRating",
            lambda query, value: query.filter(Vineyard.rating <= value),
            type=float,
            location="values",
        ),
        QueryArgument(
            "startReviews",
            lambda query, value: query.filter(Vineyard.reviews >= value),
            type=int,
            location="values",
        ),
        QueryArgument(
            "endReviews",
            lambda query, value: query.filter(Vineyard.reviews <= value),
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
                    Vineyard.name.contains(value),
                    Vineyard.country.contains(value),
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


class VineyardsAll(Resource):
    def get(self):
        args = parser.parse_args()
        query: Select = db.select(Vineyard, text("COUNT(*) OVER() as total_count"))

        for name in args:
            if args[name] is not None:
                query = arguments[name].callback(query, args[name])

        rows: list[Row] = db.session.execute(query).fetchall() if args["page"] is None or args["page"] >= 1 else []

        vineyard_list: list[JsonObject] = vineyards_schema.dump(e for e, _ in rows)
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
            "length": len(vineyard_list),
            "list": vineyard_list,
        }

        return data
