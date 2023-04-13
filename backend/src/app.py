import __init__  # type: ignore
from src import routes
from src.common.core import api, app

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

api.add_resource(routes.Welcome, "/")

api.add_resource(routes.RegionsAll, "/regions")
api.add_resource(routes.RegionsId, "/regions/<int:id>")
api.add_resource(routes.RegionsConstraints, "/regions/constraints")

api.add_resource(routes.WinesAll, "/wines")
api.add_resource(routes.WinesId, "/wines/<int:id>")
api.add_resource(routes.WinesConstraints, "/wines/constraints")

api.add_resource(routes.VineyardsAll, "/vineyards")
api.add_resource(routes.VineyardsId, "/vineyards/<int:id>")
api.add_resource(routes.VineyardsConstraints, "/vineyards/constraints")

api.add_resource(routes.VisualizationLine, "/visualizations/provider/line")
api.add_resource(routes.VisualizationChoropleth, "/visualizations/provider/choropleth")
api.add_resource(routes.VisualizationBubble, "/visualizations/provider/bubble")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
