from typing import Any, Optional
from urllib.parse import urlencode

from pyuca import Collator

collator = Collator()

JsonObject = dict[str, Any]


def create_url(url: str, params: Optional[JsonObject] = None):
    if params is None:
        return url
    return f"{url}?{urlencode(params,True)}"


def is_alphabetical_order(reverse: bool, *elements: str) -> bool:
    return sorted(elements, key=collator.sort_key, reverse=reverse) == list(elements)
