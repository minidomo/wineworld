import pendulum

from ..types import TimeConversionFunction, TimeMatchFunction
from . import opening as Opening
from . import range as Range

identifiers: list[tuple[TimeMatchFunction, TimeConversionFunction]] = [
    (
        lambda s: s.lower() == "all day",
        lambda s: (pendulum.Time.min, None),  # type: ignore
    ),
    (
        lambda s: s.lower() == "closed",
        lambda s: (None, pendulum.Time.min),  # type: ignore
    ),
    (
        Range.is_match,
        Range.parse,
    ),
    (
        Opening.is_match,
        Opening.parse,
    ),
]
