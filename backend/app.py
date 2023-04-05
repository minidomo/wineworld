from typing import Iterator

from flask import request
from sqlalchemy.engine import Row
from sqlalchemy.sql.expression import Select, or_, text

from models import (
    Region,
    Vineyard,
    VineyardRegionAssociation,
    Wine,
    WineRegionAssociation,
    WineVineyardAssociation,
    app,
    db,
)
from sort_method_data import (
    region_sort_methods,
    vineyard_sort_methods,
    wine_sort_methods,
)
from util import (
    PAGE_SIZE,
    JsonObject,
    RegionParams,
    RegionUtil,
    VineyardParams,
    VineyardUtil,
    WineParams,
    WineUtil,
    determine_total_pages,
)

"""
useful info/documentation

db.session.execute()
- https://docs.sqlalchemy.org/en/14/orm/session_api.html#sqlalchemy.orm.Session.execute
- https://docs.sqlalchemy.org/en/14/core/connections.html#sqlalchemy.engine.Result

db.select()
- https://docs.sqlalchemy.org/en/14/core/selectable.html#sqlalchemy.sql.expression.Select

flask sqlalchemy
- https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/

converting json property to rows
- https://vladmihalcea.com/mysql-json-table/
- https://dev.mysql.com/doc/refman/8.0/en/json-table-functions.html

or_(), text()
- https://docs.sqlalchemy.org/en/14/core/sqlelement.html

JSON MEMBER OF function
- https://dev.mysql.com/doc/refman/8.0/en/json-search-functions.html#operator_member-of
"""


@app.route("/")
def hello_world():
    return """
    <h1> Welcome to the WineWorld API </h1> <br>
    Check out the <a href="https://documenter.getpostman.com/view/21507814/2s93CEvGRv">documentation</a>
    """


@app.route("/wines", methods=["GET"])
def get_all_wines():
    params = WineParams(request)
    query: Select = db.select(Wine, text("COUNT(*) OVER() as total_count"))

    if params.name is not None:
        query = query.filter(Wine.name.contains(params.name))

    if params.start_rating is not None:
        query = query.filter(Wine.rating >= params.start_rating)

    if params.end_rating is not None:
        query = query.filter(Wine.rating <= params.end_rating)

    if params.start_reviews is not None:
        query = query.filter(Wine.reviews >= params.start_reviews)

    if params.end_reviews is not None:
        query = query.filter(Wine.reviews <= params.end_reviews)

    if len(params.country) > 0:
        clauses = [Wine.country == e for e in params.country]
        query = query.filter(or_(*clauses))

    if len(params.type) > 0:
        clauses = [Wine.type == e for e in params.type]
        query = query.filter(or_(*clauses))

    if len(params.winery) > 0:
        clauses = [Wine.winery == e for e in params.winery]
        query = query.filter(or_(*clauses))

    if params.sort in wine_sort_methods:
        sort_method = wine_sort_methods[params.sort]
        query = query.order_by(sort_method.clause)

    query = query.limit(PAGE_SIZE)
    query = query.offset((params.page - 1) * PAGE_SIZE)

    rows: list[Row] = db.session.execute(query).fetchall() if params.page >= 1 else []

    wine_list: list[JsonObject] = [WineUtil.to_json(e, small=True) for e, _ in rows]
    _, total_instances = rows[0] if len(rows) > 0 else (0, 0)
    total_pages = determine_total_pages(total_instances, PAGE_SIZE)

    data = {
        "page": params.page,
        "totalPages": total_pages,
        "totalInstances": total_instances,
        "length": len(wine_list),
        "list": wine_list,
    }

    return data


@app.route("/wines/<int:id>", methods=["GET"])
def get_wine(id: int):
    wine: Wine = db.get_or_404(Wine, id)

    vineyard_query: Select = db.select(WineVineyardAssociation).where(WineVineyardAssociation.wine_id == wine.id)
    vineyard_wine_pairs: Iterator[WineVineyardAssociation] = db.session.execute(vineyard_query).scalars()
    vineyards: list[Vineyard] = [db.session.get(Vineyard, e.vineyard_id) for e in vineyard_wine_pairs]

    region_query: Select = db.select(WineRegionAssociation).where(WineRegionAssociation.wine_id == wine.id)
    region_wine_pairs: Iterator[WineRegionAssociation] = db.session.execute(region_query).scalars()
    regions: list[Region] = [db.session.get(Region, e.region_id) for e in region_wine_pairs]

    data = {
        **WineUtil.to_json(wine),
        "related": {
            "vineyards": [VineyardUtil.to_json(e, small=True) for e in vineyards],
            "regions": [RegionUtil.to_json(e, small=True) for e in regions],
        },
    }

    return data


@app.route("/wines/constraints", methods=["GET"])
def get_wine_constraints():
    countries_query: Select = db.select(Wine.country)
    countries_query = countries_query.distinct().order_by(Wine.country.asc())
    countries: list[str] = db.session.execute(countries_query).scalars().all()

    wineries_query: Select = db.select(Wine.winery)
    wineries_query = wineries_query.distinct().order_by(Wine.winery.asc())
    wineries: list[str] = db.session.execute(wineries_query).scalars().all()

    types_query: Select = db.select(Wine.type)
    types_query = types_query.distinct().order_by(Wine.type.asc())
    types: list[str] = db.session.execute(types_query).scalars().all()

    sorts = [e.to_json() for e in wine_sort_methods.values()]
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


@app.route("/vineyards", methods=["GET"])
def get_all_vineyards():
    params = VineyardParams(request)
    query: Select = db.select(Vineyard, text("COUNT(*) OVER() as total_count"))

    if params.name is not None:
        query = query.filter(Vineyard.name.contains(params.name))

    if params.start_price is not None:
        query = query.filter(Vineyard.price >= params.start_price)

    if params.end_price is not None:
        query = query.filter(Vineyard.price <= params.end_price)

    if params.start_rating is not None:
        query = query.filter(Vineyard.rating >= params.start_rating)

    if params.end_rating is not None:
        query = query.filter(Vineyard.rating <= params.end_rating)

    if params.start_reviews is not None:
        query = query.filter(Vineyard.reviews >= params.start_reviews)

    if params.end_reviews is not None:
        query = query.filter(Vineyard.reviews <= params.end_reviews)

    if len(params.country) > 0:
        clauses = [Vineyard.country == e for e in params.country]
        query = query.filter(or_(*clauses))

    if params.sort in vineyard_sort_methods:
        sort_method = vineyard_sort_methods[params.sort]
        query = query.order_by(sort_method.clause)

    query = query.limit(PAGE_SIZE)
    query = query.offset((params.page - 1) * PAGE_SIZE)

    rows: list[Row] = db.session.execute(query).fetchall() if params.page >= 1 else []

    vineyard_list: list[JsonObject] = [VineyardUtil.to_json(e, small=True) for e, _ in rows]
    _, total_instances = rows[0] if len(rows) > 0 else (0, 0)
    total_pages = determine_total_pages(total_instances, PAGE_SIZE)

    data = {
        "page": params.page,
        "totalPages": total_pages,
        "totalInstances": total_instances,
        "length": len(vineyard_list),
        "list": vineyard_list,
    }

    return data


@app.route("/vineyards/<int:id>", methods=["GET"])
def get_vineyard(id: int):
    vineyard: Vineyard = db.get_or_404(Vineyard, id)

    wine_query: Select = db.select(WineVineyardAssociation).where(WineVineyardAssociation.vineyard_id == vineyard.id)
    wine_vineyard_pairs: Iterator[WineVineyardAssociation] = db.session.execute(wine_query).scalars()
    wines: list[Wine] = [db.session.get(Wine, e.wine_id) for e in wine_vineyard_pairs]

    region_query: Select = db.select(VineyardRegionAssociation).where(
        VineyardRegionAssociation.vineyard_id == vineyard.id
    )
    region_vineyard_pairs: Iterator[VineyardRegionAssociation] = db.session.execute(region_query).scalars()
    regions: list[Region] = [db.session.get(Region, e.region_id) for e in region_vineyard_pairs]

    data = {
        **VineyardUtil.to_json(vineyard),
        "related": {
            "wines": [WineUtil.to_json(e, small=True) for e in wines],
            "regions": [RegionUtil.to_json(e, small=True) for e in regions],
        },
    }

    return data


@app.route("/vineyards/constraints", methods=["GET"])
def get_vineyard_constraints():
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


@app.route("/regions", methods=["GET"])
def get_all_regions():
    params = RegionParams(request)
    query: Select = db.select(Region, text("COUNT(*) OVER() as total_count"))

    if params.name is not None:
        query = query.filter(Region.name.contains(params.name))

    if params.start_rating is not None:
        query = query.filter(Region.rating >= params.start_rating)

    if params.end_rating is not None:
        query = query.filter(Region.rating <= params.end_rating)

    if params.start_reviews is not None:
        query = query.filter(Region.reviews >= params.start_reviews)

    if params.end_reviews is not None:
        query = query.filter(Region.reviews <= params.end_reviews)

    if len(params.country) > 0:
        clauses = [Region.country == e for e in params.country]
        query = query.filter(or_(*clauses))

    if len(params.tags) > 0:
        for tag in params.tags:
            clause = text(f"'{tag}' MEMBER OF({Region.tags.key}) = 1")
            query = query.filter(clause)

    if len(params.trip_types) > 0:
        for trip_type in params.trip_types:
            clause = text(f"'{trip_type}' MEMBER OF({Region.trip_types.key}) = 1")
            query = query.filter(clause)

    if params.sort in region_sort_methods:
        sort_method = region_sort_methods[params.sort]
        query = query.order_by(sort_method.clause)

    query = query.limit(PAGE_SIZE)
    query = query.offset((params.page - 1) * PAGE_SIZE)

    rows: list[Row] = db.session.execute(query).fetchall() if params.page >= 1 else []

    region_list: list[JsonObject] = [RegionUtil.to_json(e, small=True) for e, _ in rows]
    _, total_instances = rows[0] if len(rows) > 0 else (0, 0)
    total_pages = determine_total_pages(total_instances, PAGE_SIZE)

    data = {
        "page": params.page,
        "totalPages": total_pages,
        "totalInstances": total_instances,
        "length": len(region_list),
        "list": region_list,
    }

    return data


@app.route("/regions/<int:id>", methods=["GET"])
def get_region(id: int):
    region: Region = db.get_or_404(Region, id)

    wine_query: Select = db.select(WineRegionAssociation).where(WineRegionAssociation.region_id == region.id)
    wine_region_pairs: Iterator[WineRegionAssociation] = db.session.execute(wine_query).scalars()
    wines: list[Wine] = [db.session.get(Wine, e.wine_id) for e in wine_region_pairs]

    vineyard_query: Select = db.select(VineyardRegionAssociation).where(
        VineyardRegionAssociation.region_id == region.id
    )
    vineyard_region_pairs: Iterator[VineyardRegionAssociation] = db.session.execute(vineyard_query).scalars()
    vineyards: list[Vineyard] = [db.session.get(Vineyard, e.vineyard_id) for e in vineyard_region_pairs]

    data = {
        **RegionUtil.to_json(region),
        "related": {
            "wines": [WineUtil.to_json(e, small=True) for e in wines],
            "vineyards": [VineyardUtil.to_json(e, small=True) for e in vineyards],
        },
    }

    return data


@app.route("/regions/constraints", methods=["GET"])
def get_region_constraints():
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
