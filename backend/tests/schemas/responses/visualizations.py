time_schema = {
    "type": "object",
    "properties": {
        "time": {
            "type": "object",
            "properties": {
                "hour": {"type": "number"},
                "minute": {"type": "number"},
            },
            "required": ["hour", "minute"],
            "additionalProperties": False,
        },
        "value": {"type": "number"},
    },
    "required": ["time", "value"],
    "additionalProperties": False,
}

provider_line_response_schema = {
    "type": "object",
    "properties": {
        "data": {
            "type": "array",
            "items": time_schema,
        }
    },
    "required": ["data"],
    "additionalProperties": False,
}

state_schema = {
    "type": "object",
    "properties": {
        "state": {"type": "string"},
        "num_airports": {"type": "number"},
    },
    "required": ["state", "num_airports"],
    "additionalProperties": False,
}

provider_choropleth_response_schema = {
    "type": "object",
    "properties": {
        "min": {"type": "number"},
        "max": {"type": "number"},
        "data": {
            "type": "array",
            "items": state_schema,
        },
    },
    "required": ["min", "max", "data"],
    "additionalProperties": False,
}

city_schema = {
    "type": "object",
    "properties": {
        "city": {"type": "string"},
        "state": {"type": "string"},
        "population": {"type": "number"},
        "longitude": {"type": "number"},
        "latitude": {"type": "number"},
    },
    "required": ["city", "state", "population", "longitude", "latitude"],
    "additionalProperties": False,
}

provider_bubble_response_schema = {
    "type": "object",
    "properties": {
        "data": {
            "type": "array",
            "items": city_schema,
        },
    },
    "required": ["data"],
    "additionalProperties": False,
}
