from flask import abort
from flask_restful import Resource

from src.common.core import db
from src.models import (
    Region,
    Vineyard,
    Wine,
    WineRegionAssociation,
    WineVineyardAssociation,
)
from src.schemas import WineSchema, regions_schema, vineyards_schema
from src.util.database import WINES_REDDIT_QUERY, get_related_instances


class WinesId(Resource):
    def get(self, id: int):
        wine_query = WINES_REDDIT_QUERY.where(Wine.id == id)
        wine_row = db.session.execute(wine_query).fetchone()

        if wine_row is None:
            abort(404)

        vineyards = get_related_instances(
            Vineyard, WineVineyardAssociation.vineyard_id, WineVineyardAssociation.wine_id == id, vineyards_schema
        )

        regions = get_related_instances(
            Region, WineRegionAssociation.region_id, WineRegionAssociation.wine_id == id, regions_schema
        )

        return {
            **WineSchema(context={"reddit_post": wine_row[1]}).dump(wine_row[0]),
            "related": {
                "vineyards": vineyards,
                "regions": regions,
            },
        }
