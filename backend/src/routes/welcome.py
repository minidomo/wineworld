from flask import make_response, render_template_string
from flask_restful import Resource


class Welcome(Resource):
    def get(self):
        return make_response(
            render_template_string(
                """
                <h1>Welcome to the WineWorld API</h1><br>
                Check out the <a href="https://documenter.getpostman.com/view/21507814/2s93CEvGRv">documentation</a>
                """
            )
        )
