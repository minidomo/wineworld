from flask_restful import Resource

from src.common.core import db
from src.models import (
    Region,
    Vineyard,
    VineyardRegionAssociation,
    Wine,
    WineRegionAssociation,
)
from src.schemas import region_schema, vineyards_schema, wines_partial_schema
from src.util.database import get_related_instances


class RegionsId(Resource):
    def get(self, id: int):
        region: Region = db.get_or_404(Region, id)

        vineyards = get_related_instances(
            Vineyard, VineyardRegionAssociation.vineyard_id, VineyardRegionAssociation.region_id == id, vineyards_schema
        )

        wines = get_related_instances(
            Wine, WineRegionAssociation.wine_id, WineRegionAssociation.region_id == id, wines_partial_schema
        )

        return {
            **region_schema.dump(region),
            "related": {
                "wines": wines,
                "vineyards": vineyards,
            },
        }
