from typing import Callable, Optional

import pendulum

Availability = tuple[Optional[pendulum.Time], Optional[pendulum.Time]]
TimeMatchFunction = Callable[[str], bool]
TimeConversionFunction = Callable[[str], Availability]
