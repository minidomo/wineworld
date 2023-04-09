sort_method_schema = {
    "type": "object",
    "properties": {
        "ascending": {"type": "boolean"},
        "group": {"type": "string"},
        "id": {"type": "string"},
        "name": {"type": "string"},
    },
    "required": ["ascending", "group", "id", "name"],
    "additionalProperties": False,
}
