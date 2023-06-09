from typing import Any

import requests
from flask_restful import Resource

from src.util.general import JsonObject, state_names


def get_response() -> JsonObject:
    return requests.get("https://api.parkscape.me/airports").json()


def count_airports(response: JsonObject) -> list[JsonObject]:
    counts: JsonObject = {}
    for airport in response["data"]:
        state = airport["state"]
        if state in state_names:
            if state in counts:
                counts[state] += 1
            else:
                counts[state] = 1

    states: list[JsonObject] = []
    for state in counts:
        states.append(
            {
                "state": state,
                "num_airports": counts[state],
            }
        )
    return states


def create_response(states: list[JsonObject]) -> JsonObject:
    min_num_airports = min([state["num_airports"] for state in states])
    max_num_airports = max([state["num_airports"] for state in states])

    return {
        "min": min_num_airports,
        "max": max_num_airports,
        "data": states,
    }


class VisualizationChoropleth(Resource):
    def get(self):
        response = get_response()
        states = count_airports(response)
        data = create_response(states)
        return data
