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
    },
    "required": [
        "country",
        "image",
        "name",
        "region",
        "type",
        "winery",
        "id",
        "rating",
        "reviews",
    ],
    "additionalProperties": False,
}

wine_reddit_schema = {
    "type": "object",
    "properties": {
        **wine_schema["properties"],  # type: ignore
        "redditPosts": {
            "type": "array",
            "items": {"type": "string"},
        },
    },
    "required": [
        *wine_schema["required"],  # type: ignore
        "redditPosts",
    ],
    "additionalProperties": False,
}
