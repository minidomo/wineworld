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
