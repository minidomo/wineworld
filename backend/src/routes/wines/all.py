from flask_restful import Resource, reqparse
from sqlalchemy.engine import Row
from sqlalchemy.sql.expression import Select, or_, text

from src.common.core import db
from src.common.sort_method import wine_sort_methods
from src.models import Wine
from src.schemas import wines_partial_schema
from src.util.general import PAGE_SIZE, JsonObject, determine_total_pages

parser = reqparse.RequestParser()
parser.add_argument("page", type=int, location="values")
parser.add_argument("name", type=str, location="values")  # deprecated
parser.add_argument("country", type=str, location="values", action="append")
parser.add_argument("winery", type=str, location="values", action="append")
parser.add_argument("type", type=str, location="values", action="append")
parser.add_argument("startRating", type=float, location="values")
parser.add_argument("endRating", type=float, location="values")
parser.add_argument("startReviews", type=int, location="values")
parser.add_argument("endReviews", type=int, location="values")
parser.add_argument("sort", type=str, location="values")
parser.add_argument("search", type=str, location="values")


class WinesAll(Resource):
    def get(self):
        args = parser.parse_args()
        query: Select = db.select(Wine, text("COUNT(*) OVER() as total_count"))

        if args["search"] is not None:
            clauses = [
                Wine.name.contains(args["search"]),
                Wine.country.contains(args["search"]),
                Wine.region.contains(args["search"]),
                Wine.winery.contains(args["search"]),
                Wine.type.contains(args["search"]),
            ]
            query = query.filter(or_(*clauses))

        # TODO remove this
        if args["name"] is not None:
            query = query.filter(Wine.name.contains(args["name"]))

        if args["startRating"] is not None:
            query = query.filter(Wine.rating >= args["startRating"])

        if args["endRating"] is not None:
            query = query.filter(Wine.rating <= args["endRating"])

        if args["startReviews"] is not None:
            query = query.filter(Wine.reviews >= args["startReviews"])

        if args["endReviews"] is not None:
            query = query.filter(Wine.reviews <= args["endReviews"])

        if args["country"] is not None:
            clauses = [Wine.country == e for e in args["country"]]
            query = query.filter(or_(*clauses))

        if args["type"] is not None:
            clauses = [Wine.type == e for e in args["type"]]
            query = query.filter(or_(*clauses))

        if args["winery"] is not None:
            clauses = [Wine.winery == e for e in args["winery"]]
            query = query.filter(or_(*clauses))

        if args["sort"] in wine_sort_methods:
            sort_method = wine_sort_methods[args["sort"]]
            query = query.order_by(sort_method.clause)

        if args["page"] is not None:
            query = query.limit(PAGE_SIZE)
            query = query.offset((args["page"] - 1) * PAGE_SIZE)

        rows: list[Row] = db.session.execute(query).fetchall() if args["page"] is None or args["page"] >= 1 else []

        wine_list: list[JsonObject] = wines_partial_schema.dump(e for e, _ in rows)
        _, total_instances = rows[0] if len(rows) > 0 else (0, 0)
        total_pages = determine_total_pages(total_instances, PAGE_SIZE)

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
