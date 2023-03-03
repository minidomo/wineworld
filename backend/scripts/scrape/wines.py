import re
import sys

import requests

from .abstract_scrape_script import (
    AbstractScrapeScript,
    JsonObject,
    ScriptMode,
    SimpleRegion,
)


class WineScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptMode) -> None:
        super().__init__(filename, script_type)

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

    def apply_changes(self) -> JsonObject:
        data = self.read_json_file(self.root_dir / "data/raw" / self.filename)
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
                    model: JsonObject = {
                        "winery": wine["winery"],
                        "image": wine["image"],
                        "rating": float(wine["rating"]["average"]),
                        "reviews": 0,
                        "country": "",
                        "region": "",
                        "name": wine["wine"],
                        "type": wine_types[endpoint],
                    }

                    m = re.search(r"\d+", wine["rating"]["reviews"])
                    assert m is not None
                    model["reviews"] = int(m.group(0))

                    original_location: str = wine["location"]
                    location_parts = original_location.split("\n·\n")
                    model["country"] = location_parts[0]
                    model["region"] = location_parts[1]

                    model["type"] = wine_types[endpoint]

                    assert isinstance(model["winery"], str) and len(model["winery"]) > 0
                    assert isinstance(model["image"], str) and len(model["image"]) > 0
                    assert isinstance(model["rating"], float) and model["rating"] > 0
                    assert isinstance(model["reviews"], int) and model["reviews"] > 0
                    assert isinstance(model["country"], str) and len(model["country"]) > 0
                    assert isinstance(model["region"], str) and len(model["region"]) > 0
                    assert isinstance(model["name"], str) and len(model["name"]) > 0
                    assert isinstance(model["type"], str) and len(model["type"]) > 0

                    ret.append(model)
                except Exception:
                    error_count += 1

        print(f"final wine count: {len(ret)}")
        print(f"errored wine count: {error_count}")

        return {"data": ret}

    def final_changes(self) -> JsonObject:
        data = self.read_json_file(self.root_dir / "data/modify" / self.filename)
        wines: list[JsonObject] = data["data"]

        regions = self.get_final_regions()
        ret: list[JsonObject] = []

        for wine in wines:
            if SimpleRegion(wine["region"], wine["country"]) in regions:
                ret.append(wine)

        print(f"final wine count: {len(ret)}")
        print(f"remove count: {len(wines)- len(ret)}")

        return {"data": ret}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = WineScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptMode[enum_key])
    script.run()
