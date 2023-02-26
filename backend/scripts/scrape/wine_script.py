from .abstract_scrape_script import JsonObject, ScriptType, AbstractScrapeScript
import sys
import requests
import json
import re


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
