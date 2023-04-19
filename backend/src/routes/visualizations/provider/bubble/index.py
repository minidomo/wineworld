import re
from typing import Any

import requests
from flask_restful import Resource

from src.util.general import JsonObject, state_names


def get_response() -> JsonObject:
    return requests.get("https://api.parkscape.me/cities").json()


def count_population(response: JsonObject) -> list[JsonObject]:
    cities: list[JsonObject] = []
    for obj in response["data"]:
        city: JsonObject = {}
        city["city"] = obj["short_name"]
        city["state"] = re.split(", ", obj["long_name"])[1]
        if city["state"] not in state_names:
            continue
        city["population"] = obj["population"]
        city["longitude"] = obj["longitude"]
        city["latitude"] = obj["latitude"]
        cities.append(city)
    return cities


def create_response(cities: list[JsonObject]) -> JsonObject:
    return {"data": cities}


class VisualizationBubble(Resource):
    def get(self):
        response = get_response()
        cities = count_population(response)
        data = create_response(cities)
        return data
