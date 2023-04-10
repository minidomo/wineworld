from flask_restful import Resource

from src.common.core import db
from src.models import (
    Region,
    Vineyard,
    VineyardRegionAssociation,
    Wine,
    WineVineyardAssociation,
)
from src.schemas import regions_schema, vineyard_schema, wines_partial_schema
from src.util.database import get_related_instances


class VineyardsId(Resource):
    def get(self, id: int):
        vineyard: Vineyard = db.get_or_404(Vineyard, id)

        regions = get_related_instances(
            Region, VineyardRegionAssociation.region_id, VineyardRegionAssociation.vineyard_id == id, regions_schema
        )

        wines = get_related_instances(
            Wine, WineVineyardAssociation.wine_id, WineVineyardAssociation.vineyard_id == id, wines_partial_schema
        )

        return {
            **vineyard_schema.dump(vineyard),
            "related": {
                "wines": wines,
                "regions": regions,
            },
        }
