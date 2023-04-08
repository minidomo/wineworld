from flask_restful import Resource, reqparse

parser = reqparse.RequestParser()
parser.add_argument("msg", type=str, location="values", help="something")
parser.add_argument("val", type=str, location="values", action="append")


class RegionsAll(Resource):
    def get(self):
        args = parser.parse_args()
        print(args)
        return {"custom_message": "test"}
