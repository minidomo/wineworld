import requests
from flask_restful import Resource
from typing import Any

# from src.util.general import JsonObject

JsonObject = dict[str, Any]

state_names=["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

def get_response() -> JsonObject:
    return requests.get("https://api4.parkscape.me/airports").json()

def count_airports(response: JsonObject) -> JsonObject:
    states:JsonObject = {}
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

    return {
        "min" : states[key_min],
        "max" : states[key_max],
        "data": data
    }

class VisualizationChoropleth(Resource):
    def get(self):
        response = get_response()
        states = count_airports(response)
        data = create_response(states)
        return data
    
a = VisualizationChoropleth()
print(a.get())