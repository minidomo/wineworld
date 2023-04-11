from ..region import region_schema
from ..sort_method import sort_method_schema
from ..vineyard import vineyard_schema
from ..wine import wine_schema

id_response_schema = {
    "type": "object",
    "properties": {
        **region_schema["properties"],  # type: ignore
        "related": {
            "type": "object",
            "properties": {
                "vineyards": {
                    "type": "array",
                    "items": vineyard_schema,
                },
                "wines": {
                    "type": "array",
                    "items": wine_schema,
                },
            },
            "required": ["vineyards", "wines"],
            "additionalProperties": False,
        },
    },
    "required": [
        *region_schema["required"],  # type: ignore
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
        "tags": {
            "type": "array",
            "items": {"type": "string"},
        },
        "tripTypes": {
            "type": "array",
            "items": {"type": "string"},
        },
        "sorts": {
            "type": "array",
            "items": sort_method_schema,
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
    },
    "required": [
        "countries",
        "tags",
        "tripTypes",
        "sorts",
        "reviews",
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
            "items": region_schema,
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
