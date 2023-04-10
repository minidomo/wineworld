from typing import Any, Callable

from sqlalchemy.sql.expression import Select

from .simple_argument import SimpleArgument


class QueryArgument(SimpleArgument):
    def __init__(self, name: str, callback: Callable[[Select, Any], Select], **kwargs) -> None:
        super().__init__(name, **kwargs)
        self.callback = callback
