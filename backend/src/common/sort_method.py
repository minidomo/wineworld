from sqlalchemy import Column
from sqlalchemy.sql.expression import text

from src.models import Region, Vineyard, Wine


class SortMethod:
    def __init__(self, column: Column, ascending: bool, name: str, group: str) -> None:
        self.key: str = column.key
        self.name = name
        self.group = group
        self.ascending = ascending

        direction = "asc" if ascending else "desc"
        self.id = f"{self.key}_{direction}"
        self.clause = text(f"{self.key} {direction}")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "group": self.group,
            "ascending": self.ascending,
        }
