import re
import sys

import requests

from .abstract_scrape_script import AbstractScrapeScript, JsonObject, ScriptType


class WineScript(AbstractScrapeScript):
    def __init__(self, file_name: str, script_type: ScriptType) -> None:
        super().__init__(file_name, script_type)

    def scrape_api(self) -> JsonObject:
        data: JsonObject = {}

        base_url = "https://api.sampleapis.com/wines"
        endpoints = ["reds", "whites", "sparkling", "rose", "dessert", "port"]

        for endpoint in endpoints:
            url = f"{base_url}/{endpoint}"

            print(f"performing GET {url}")
            response: list[JsonObject] = requests.get(url).json()

            data[endpoint] = response

        return data

    def apply_changes(self, data: JsonObject) -> JsonObject:
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

                    assert isinstance(wine["winery"], str) and len(wine["winery"]) > 0
                    assert isinstance(wine["image"], str) and len(wine["image"]) > 0
                    assert isinstance(wine["rating"], float) and wine["rating"] > 0
                    assert isinstance(wine["reviews"], int) and wine["reviews"] > 0
                    assert isinstance(wine["country"], str) and len(wine["country"]) > 0
                    assert isinstance(wine["region"], str) and len(wine["region"]) > 0
                    assert isinstance(wine["name"], str) and len(wine["name"]) > 0
                    assert isinstance(wine["type"], str) and len(wine["type"]) > 0

                    ret.append(wine)
                except Exception:
                    error_count += 1

        for i in range(len(ret)):
            ret[i]["id"] = i

        print(f"final wine count: {len(ret)}")
        print(f"errored wine count: {error_count}")

        return {"data": ret}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = WineScript("wines.json", ScriptType[enum_key])
    script.run()
