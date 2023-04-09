import re

from ..types import Availability
from ..util import parse_12_hour_format, word_to_time

range_regex = re.compile(r"^([^\s]+)\s+(?:to|-)\s+([^\s]+)$", re.IGNORECASE)


def is_match(s: str) -> bool:
    return range_regex.match(s) is not None


def parse(s: str) -> Availability:
    res: re.Match[str] = range_regex.match(s)  # type: ignore
    opening = res[1]
    closing = res[2]

    opening_time = word_to_time(opening)
    closing_time = word_to_time(closing)

    if opening_time is None:
        opening_time = parse_12_hour_format(opening)

    if closing_time is None:
        closing_time = parse_12_hour_format(closing)

    return (opening_time, closing_time)
