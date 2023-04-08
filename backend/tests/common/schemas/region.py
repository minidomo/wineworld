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
        },
        "coordinates": {**coordinates_schema},
    },
}
