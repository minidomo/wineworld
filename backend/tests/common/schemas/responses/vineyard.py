from ..region import region_schema
from ..sort_method import sort_method_schema
from ..vineyard import vineyard_schema
from ..wine import wine_schema

id_response_schema = {
    "type": "object",
    "properties": {
        **vineyard_schema["properties"],  # type: ignore
        "related": {
            "type": "object",
            "properties": {
                "regions": {
                    "type": "array",
                    "items": {**region_schema},
                },
                "wines": {
                    "type": "array",
                    "items": {**wine_schema},
                },
            },
        },
    },
}

constraints_response_schema = {
    "type": "object",
    "properties": {
        "countries": {
            "type": "array",
            "items": {"type": "string"},
        },
        "price": {
            "type": "object",
            "properties": {
                "max": {"type": "number"},
                "min": {"type": "number"},
            },
        },
        "rating": {
            "type": "object",
            "properties": {
                "max": {"type": "number"},
                "min": {"type": "number"},
            },
        },
        "reviews": {
            "type": "object",
            "properties": {
                "min": {"type": "number"},
            },
        },
        "sorts": {
            "type": "array",
            "items": {**sort_method_schema},
        },
    },
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
            "items": {**vineyard_schema},
        },
    },
}
