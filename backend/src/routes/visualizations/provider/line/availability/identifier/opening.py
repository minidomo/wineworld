import re

from ..types import Availability
from ..util import parse_12_hour_format, word_to_time

regex = re.compile(r"^opens\s+at\s+([^\s]+)$", re.IGNORECASE)


def is_match(s: str) -> bool:
    return regex.match(s) is not None


def parse(s: str) -> Availability:
    res: re.Match[str] = regex.match(s)  # type: ignore
    time_str = res[1]

    time = word_to_time(time_str)
    if time is None:
        time = parse_12_hour_format(time_str)

    return (time, None)
