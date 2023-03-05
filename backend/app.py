import math
from typing import Callable, Iterator

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
from util import PAGE_SIZE, RegionParams, RegionUtil, VineyardUtil, WineUtil, every

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

    filters: list[Callable[[Region], bool]] = []

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

    total_pages = max(math.ceil(len(regions) / PAGE_SIZE), 1)
    params.page = min(max(params.page, 1), total_pages)

    indices = slice((params.page - 1) * PAGE_SIZE, params.page * PAGE_SIZE)
    region_list = [RegionUtil.to_json(e) for e in regions[indices]]

    data = {
        "page": params.page,
        "totalPages": total_pages,
        "length": len(region_list),
        "list": region_list,
    }

    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
