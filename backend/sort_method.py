from sqlalchemy import Column, String
from sqlalchemy.sql.expression import text


class SortMethod:
    def __init__(self, column: Column, ascending: bool, name: str, group: str) -> None:
        self.key: str = column.key
        self.name = name
        self.group = group

        direction = "asc" if ascending else "desc"
        self.id = f"{self.key}_{direction}"
        self.clause = text(f"{self.key} {direction}")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "group": self.group,
        }
