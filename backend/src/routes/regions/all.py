from flask_restful import Resource, reqparse
from sqlalchemy.engine import Row
from sqlalchemy.sql.expression import Select, or_, text

from src.common.core import db
from src.common.sort_method import region_sort_methods
from src.models import Region
from src.schemas import regions_schema
from src.util.general import PAGE_SIZE, JsonObject, determine_total_pages

parser = reqparse.RequestParser()
parser.add_argument("page", type=int, location="values")
parser.add_argument("name", type=str, location="values")  # deprecated
parser.add_argument("country", type=str, location="values", action="append")
parser.add_argument("startRating", type=float, location="values")
parser.add_argument("endRating", type=float, location="values")
parser.add_argument("startReviews", type=int, location="values")
parser.add_argument("endReviews", type=int, location="values")
parser.add_argument("tags", type=str, location="values", action="append")
parser.add_argument("tripTypes", type=str, location="values", action="append")
parser.add_argument("sort", type=str, location="values")
parser.add_argument("search", type=str, location="values")


class RegionsAll(Resource):
    def get(self):
        args = parser.parse_args()
        query: Select = db.select(Region, text("COUNT(*) OVER() as total_count"))

        if args["search"] is not None:
            clauses = [
                Region.name.contains(args["search"]),
                Region.country.contains(args["search"]),
                text(f"REGEXP_LIKE(`{Region.trip_types.key}`, '.*{args['search']}.*', 'i')"),
            ]
            query = query.filter(or_(*clauses))

        # TODO remove this
        if args["name"] is not None:
            query = query.filter(Region.name.contains(args["name"]))

        if args["startRating"] is not None:
            query = query.filter(Region.rating >= args["startRating"])

        if args["endRating"] is not None:
            query = query.filter(Region.rating <= args["endRating"])

        if args["startReviews"] is not None:
            query = query.filter(Region.reviews >= args["startReviews"])

        if args["endReviews"] is not None:
            query = query.filter(Region.reviews <= args["endReviews"])

        if args["country"] is not None:
            clauses = [Region.country == e for e in args["country"]]
            query = query.filter(or_(*clauses))

        if args["tags"] is not None:
            for tag in args["tags"]:
                clause = text(f"'{tag}' MEMBER OF({Region.tags.key})")
                query = query.filter(clause)

        if args["tripTypes"] is not None:
            for trip_type in args["tripTypes"]:
                clause = text(f"'{trip_type}' MEMBER OF({Region.trip_types.key})")
                query = query.filter(clause)

        if args["sort"] in region_sort_methods:
            sort_method = region_sort_methods[args["sort"]]
            query = query.order_by(sort_method.clause)

        if args["page"] is not None:
            query = query.limit(PAGE_SIZE)
            query = query.offset((args["page"] - 1) * PAGE_SIZE)

        rows: list[Row] = db.session.execute(query).fetchall() if args["page"] is None or args["page"] >= 1 else []

        region_list: list[JsonObject] = regions_schema.dump(e for e, _ in rows)
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
            "length": len(region_list),
            "list": region_list,
        }

        return data
