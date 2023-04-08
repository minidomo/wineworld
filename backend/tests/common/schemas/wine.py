wine_schema = {
    "type": "object",
    "properties": {
        "country": {"type": "string"},
        "image": {"type": "string"},
        "name": {"type": "string"},
        "region": {"type": "string"},
        "type": {"type": "string"},
        "winery": {"type": "string"},
        "id": {"type": "number"},
        "rating": {"type": "number"},
        "reviews": {"type": "number"},
        "redditPosts": {
            "type": "array",
            "items": {"type": "string"},
        },
    },
}
