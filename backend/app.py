from typing import Iterator

from flask import request
from sqlalchemy.sql.expression import Select

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
from util import (
    PAGE_SIZE,
    RegionParams,
    RegionUtil,
    UnaryPredicate,
    VineyardParams,
    VineyardUtil,
    WineParams,
    WineUtil,
    clamp,
    determine_total_pages,
    every,
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
    query: Select = db.select(Wine)

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

    wines: list[Wine] = db.session.execute(query).scalars().all()

    def is_valid_country(e: Wine) -> bool:
        for country in params.country:
            if e.country == country:
                return True
        return False

    def is_valid_type(e: Wine) -> bool:
        for type in params.type:
            if e.type == type:
                return True
        return False

    def is_valid_winery(e: Wine) -> bool:
        for winery in params.winery:
            if e.winery == winery:
                return True
        return False

    filters: list[UnaryPredicate[Wine]] = []

    if len(params.country) > 0:
        filters.append(is_valid_country)

    if len(params.type) > 0:
        filters.append(is_valid_type)

    if len(params.winery) > 0:
        filters.append(is_valid_winery)

    wines = list(filter(lambda e: every(e, filters), wines))

    if params.name_sort is not None:
        reverse = not params.name_sort
        wines.sort(key=lambda e: e.name.lower(), reverse=reverse)

    total_pages = determine_total_pages(len(wines), PAGE_SIZE)
    params.page = clamp(1, total_pages, params.page)

    indices = slice((params.page - 1) * PAGE_SIZE, params.page * PAGE_SIZE)
    wine_list = [WineUtil.to_json(e, small=True) for e in wines[indices]]

    data = {
        "page": params.page,
        "totalPages": total_pages,
        "totalInstances": len(wines),
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


@app.route("/vineyards", methods=["GET"])
def get_all_vineyards():
    params = VineyardParams(request)
    query: Select = db.select(Vineyard)

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

    vineyards: list[Vineyard] = db.session.execute(query).scalars().all()

    def is_valid_country(e: Vineyard) -> bool:
        for country in params.country:
            if e.country == country:
                return True
        return False

    filters: list[UnaryPredicate[Vineyard]] = []

    if len(params.country) > 0:
        filters.append(is_valid_country)

    vineyards = list(filter(lambda e: every(e, filters), vineyards))

    if params.name_sort is not None:
        reverse = not params.name_sort
        vineyards.sort(key=lambda e: e.name.lower(), reverse=reverse)

    total_pages = determine_total_pages(len(vineyards), PAGE_SIZE)
    params.page = clamp(1, total_pages, params.page)

    indices = slice((params.page - 1) * PAGE_SIZE, params.page * PAGE_SIZE)
    vineyard_list = [VineyardUtil.to_json(e, small=True) for e in vineyards[indices]]

    data = {
        "page": params.page,
        "totalPages": total_pages,
        "totalInstances": len(vineyards),
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


@app.route("/regions", methods=["GET"])
def get_all_regions():
    params = RegionParams(request)
    query: Select = db.select(Region)

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

    regions: list[Region] = db.session.execute(query).scalars().all()

    def is_valid_country(e: Region) -> bool:
        for country in params.country:
            if e.country == country:
                return True
        return False

    def has_all_tags(e: Region) -> bool:
        tags: set[str] = set(e.tags)
        for tag in params.tags:
            if tag not in tags:
                return False
        return True

    def has_all_trip_types(e: Region) -> bool:
        trip_types: set[str] = set(e.trip_types)
        for trip_type in params.trip_types:
            if trip_type not in trip_types:
                return False
        return True

    filters: list[UnaryPredicate[Region]] = []

    if len(params.country) > 0:
        filters.append(is_valid_country)

    if len(params.tags) > 0:
        filters.append(has_all_tags)

    if len(params.trip_types) > 0:
        filters.append(has_all_trip_types)

    regions = list(filter(lambda e: every(e, filters), regions))

    if params.name_sort is not None:
        reverse = not params.name_sort
        regions.sort(key=lambda e: e.name.lower(), reverse=reverse)

    total_pages = determine_total_pages(len(regions), PAGE_SIZE)
    params.page = clamp(1, total_pages, params.page)

    indices = slice((params.page - 1) * PAGE_SIZE, params.page * PAGE_SIZE)
    region_list = [RegionUtil.to_json(e, small=True) for e in regions[indices]]

    data = {
        "page": params.page,
        "totalPages": total_pages,
        "totalInstances": len(regions),
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
