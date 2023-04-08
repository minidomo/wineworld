from .coordinates import coordinates_schema

vineyard_schema = {
    "type": "object",
    "properties": {
        "country": {"type": "string"},
        "image": {"type": "string"},
        "name": {"type": "string"},
        "url": {"type": "string"},
        "id": {"type": "number"},
        "price": {"type": "number"},
        "rating": {"type": "number"},
        "reviews": {"type": "number"},
        "coordinates": {**coordinates_schema},
    },
}
