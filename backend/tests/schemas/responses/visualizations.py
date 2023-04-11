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
                    "value": {"type": "number"},
                },
                "required": ["state", "value"],
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