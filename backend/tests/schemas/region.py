from .coordinates import coordinates_schema

region_schema = {
    "type": "object",
    "properties": {
        "country": {"type": "string"},
        "url": {"type": "string"},
        "name": {"type": "string"},
        "id": {"type": "number"},
        "rating": {"type": "number"},
        "reviews": {"type": "number"},
        "tags": {
            "type": "array",
            "items": {"type": "string"},
        },
        "tripTypes": {
            "type": "array",
            "items": {"type": "string"},
        },
        "image": {
            "type": "object",
            "properties": {
                "height": {"type": "number"},
                "width": {"type": "number"},
                "url": {"type": "string"},
            },
            "required": ["height", "width", "url"],
            "additionalProperties": False,
        },
        "coordinates": coordinates_schema,
    },
    "required": [
        "country",
        "url",
        "name",
        "id",
        "rating",
        "reviews",
        "tags",
        "tripTypes",
        "image",
        "coordinates",
    ],
    "additionalProperties": False,
}
