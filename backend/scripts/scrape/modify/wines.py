from pathlib import Path
import json
from typing import Any
import re

JsonObject = dict[str, Any]

file_name = "wines.json"
base_dir: Path = Path(__file__).resolve().parent
target_dir = (base_dir / ".." / ".." / ".." / "data" / "modify").resolve()
target_file = target_dir / file_name


def create_dir():
    print(f"creating directory (if needed): {target_dir}")
    target_dir.mkdir(parents=True, exist_ok=True)


def retrieve_data() -> JsonObject:
    file_path = (base_dir / ".." / ".." / ".." / "data" / "retrieve" / file_name).resolve()

    print(f"retrieving data from: {file_path}")
    json_data = file_path.read_text(encoding="utf-8")
    data: JsonObject = json.loads(json_data)

    return data


def apply_changes(data: JsonObject) -> list[JsonObject]:
    print("applying changes to original data")

    ret: list[JsonObject] = []
    error_count = 0
    wine_types = {
        "reds": "Red",
        "whites": "White",
        "sparkling": "Sparkling",
        "rose": "Rose",
        "dessert": "Dessert",
        "port": "Port",
    }

    for endpoint in data:
        wines: list[JsonObject] = data[endpoint]

        for wine in wines:
            try:
                original_rating: JsonObject = wine.pop("rating")

                wine["rating"] = float(original_rating["average"])

                m = re.search(r"\d+", original_rating["reviews"])
                assert m is not None
                wine["reviews"] = int(m.group(0))

                original_location: str = wine.pop("location")
                location_parts = original_location.split("\n·\n")
                wine["country"] = location_parts[0]
                wine["region"] = location_parts[1]

                wine["name"] = wine.pop("wine")
                wine["type"] = wine_types[endpoint]

                ret.append(wine)
            except Exception:
                error_count += 1

    for i in range(len(ret)):
        ret[i]["id"] = i

    print(f"final wine count: {len(ret)}")
    print(f"errored wine count: {error_count}")

    return ret


def write_data(data: list[JsonObject]):
    with target_file.open(mode="w") as file:
        content = json.dumps({"data": data}, ensure_ascii=False, indent=4)
        print(f"writing to: {target_file}")
        file.write(content)


def main():
    create_dir()
    original_data = retrieve_data()
    modified_data = apply_changes(original_data)
    write_data(modified_data)


if __name__ == "__main__":
    main()
