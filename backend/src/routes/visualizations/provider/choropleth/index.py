from typing import Any

import requests
from flask_restful import Resource

from src.util.general import JsonObject
from util import state_names


def get_response() -> JsonObject:
    return requests.get("https://api4.parkscape.me/airports").json()


def count_airports(response: JsonObject) -> JsonObject:
    states: JsonObject = {}
    for airport in response["data"]:
        state = airport["state"]
        if state in state_names:
            if state in states:
                states[state] += 1
            else:
                states[state] = 1
    return states


def create_response(states: JsonObject) -> JsonObject:
    key_min = min(states.keys(), key=(lambda k: states[k]))
    key_max = max(states.keys(), key=(lambda k: states[k]))

    data: list[JsonObject] = []
    data.append(states)

    return {"min": states[key_min], "max": states[key_max], "data": data}


class VisualizationChoropleth(Resource):
    def get(self):
        response = get_response()
        states = count_airports(response)
        data = create_response(states)
        return data
