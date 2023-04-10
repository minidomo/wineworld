from flask_restful.reqparse import RequestParser


class SimpleArgument:
    def __init__(self, name: str, **kwargs) -> None:
        self.name = name
        self.kwargs = kwargs

    def add_to_parser(self, parser: RequestParser):
        parser.add_argument(self.name, **self.kwargs)
