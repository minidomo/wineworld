from ..region import region_schema
from ..sort_method import sort_method_schema
from ..vineyard import vineyard_schema
from ..wine import wine_reddit_schema, wine_schema

id_response_schema = {
    "type": "object",
    "properties": {
        **wine_reddit_schema["properties"],  # type: ignore
        "related": {
            "type": "object",
            "properties": {
                "regions": {
                    "type": "array",
                    "items": region_schema,
                },
                "vineyards": {
                    "type": "array",
                    "items": vineyard_schema,
                },
            },
            "required": ["regions", "vineyards"],
            "additionalProperties": False,
        },
    },
    "required": [
        *wine_reddit_schema["required"],  # type: ignore
        "related",
    ],
    "additionalProperties": False,
}

constraints_response_schema = {
    "type": "object",
    "properties": {
        "countries": {
            "type": "array",
            "items": {"type": "string"},
        },
        "types": {
            "type": "array",
            "items": {"type": "string"},
        },
        "wineries": {
            "type": "array",
            "items": {"type": "string"},
        },
        "rating": {
            "type": "object",
            "properties": {
                "max": {"type": "number"},
                "min": {"type": "number"},
            },
            "required": ["max", "min"],
            "additionalProperties": False,
        },
        "reviews": {
            "type": "object",
            "properties": {
                "min": {"type": "number"},
            },
            "required": ["min"],
            "additionalProperties": False,
        },
        "sorts": {
            "type": "array",
            "items": sort_method_schema,
        },
    },
    "required": [
        "countries",
        "types",
        "wineries",
        "rating",
        "reviews",
        "sorts",
    ],
    "additionalProperties": False,
}

all_response_schema = {
    "type": "object",
    "properties": {
        "length": {"type": "number"},
        "page": {"type": "number"},
        "totalInstances": {"type": "number"},
        "totalPages": {"type": "number"},
        "list": {
            "type": "array",
            "items": wine_schema,
        },
    },
    "required": [
        "length",
        "page",
        "totalInstances",
        "totalPages",
        "list",
    ],
    "additionalProperties": False,
}
