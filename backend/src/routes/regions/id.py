from flask_restful import Resource
from sqlalchemy.engine import Row
from sqlalchemy.sql.expression import Select

from src.common.core import db
from src.models import (
    Region,
    Vineyard,
    VineyardRegionAssociation,
    Wine,
    WineRegionAssociation,
)
from src.schemas import WineSchema, region_schema, vineyards_schema
from src.util.database import WINES_REDDIT_QUERY
from src.util.general import JsonObject


class RegionsId(Resource):
    def get(self, id: int):
        region: Region = db.get_or_404(Region, id)

        vineyard_filter = Vineyard.id.in_(
            db.select(VineyardRegionAssociation.vineyard_id).where(VineyardRegionAssociation.region_id == id)
        )
        vineyard_query: Select = db.select(Vineyard).filter(vineyard_filter)
        vineyard_rows: list[Row] = db.session.execute(vineyard_query).fetchall()
        vineyards: list[JsonObject] = vineyards_schema.dump(e[0] for e in vineyard_rows)

        wine_filter = Wine.id.in_(db.select(WineRegionAssociation.wine_id).where(WineRegionAssociation.region_id == id))
        wine_query: Select = WINES_REDDIT_QUERY.filter(wine_filter)
        wine_rows: list[Row] = db.session.execute(wine_query).fetchall()
        wines: list[JsonObject] = [WineSchema(context={"reddit_post": reddit}).dump(wine) for wine, reddit in wine_rows]

        return {
            **region_schema.dump(region),
            "related": {
                "wines": wines,
                "vineyards": vineyards,
            },
        }
