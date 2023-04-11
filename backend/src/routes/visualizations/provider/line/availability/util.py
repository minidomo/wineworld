import re
from typing import Optional

import pendulum

time_12_hour_regex = re.compile(r"^(\d+):(\d+)([ap]m)$", re.IGNORECASE)

time_constants = {
    "sunrise": pendulum.time(7),
    "sunset": pendulum.time(19),
}


def word_to_time(s: str) -> Optional[pendulum.Time]:
    return time_constants.get(s.lower())


def to_24_time(hour: int, minute: int, indicator: str) -> pendulum.Time:
    r_hour = hour % 12

    if indicator.lower() == "pm":
        r_hour += 12

    return pendulum.time(r_hour, minute)


def parse_12_hour_format(s: str) -> Optional[pendulum.Time]:
    res = time_12_hour_regex.match(s)

    if res is None:
        return res

    hour = int(res[1])
    minute = int(res[2])
    indicator = res[3]

    return to_24_time(hour, minute, indicator)
