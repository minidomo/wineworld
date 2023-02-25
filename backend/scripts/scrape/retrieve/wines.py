from pathlib import Path
import json
from typing import Any
import requests

JsonObject = dict[str, Any]

file_name = "wines.json"
base_dir: Path = Path(__file__).resolve().parent
target_dir = (base_dir / ".." / ".." / ".." / "data" / "retrieve").resolve()
target_file = target_dir / file_name


def create_dir():
    print(f"creating directory (if needed): {target_dir}")
    target_dir.mkdir(parents=True, exist_ok=True)


def retrieve_data() -> JsonObject:
    data: JsonObject = {}

    base_url = "https://api.sampleapis.com/wines"
    endpoints = ["reds", "whites", "sparkling", "rose", "dessert", "port"]

    for endpoint in endpoints:
        url = f"{base_url}/{endpoint}"

        print(f"performing GET {url}")
        response: list[JsonObject] = requests.get(url).json()
        
        data[endpoint] = response

    return data


def write_data(data: JsonObject):
    with target_file.open(mode="w") as file:
        content = json.dumps(data, ensure_ascii=False, indent=4)
        print(f"writing to: {target_file}")
        file.write(content)


def main():
    create_dir()
    data = retrieve_data()
    write_data(data)


if __name__ == "__main__":
    main()
