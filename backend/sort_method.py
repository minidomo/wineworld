from sqlalchemy.sql.expression import text


class SortMethod:
    def __init__(self, key: str, ascending: bool, name: str, group: str) -> None:
        self.key = key
        self.name = name
        self.group = group

        direction = "asc" if ascending else "desc"
        self.id = f"{key}_{direction}"
        self.clause = text(f"{key} {direction}")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "group": self.group,
        }
