import math
from typing import Any, TypeVar

T = TypeVar("T")
JsonObject = dict[str, Any]

PAGE_SIZE = 20


def determine_total_pages(elements: int, page_size: int) -> int:
    if elements <= 0:
        return 1
    return math.ceil(elements / page_size)
