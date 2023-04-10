from .identifier import identifiers
from .types import Availability


def parse(s: str) -> Availability:
    for is_match, convert in identifiers:
        if is_match(s):
            return convert(s)

    return (None, None)
