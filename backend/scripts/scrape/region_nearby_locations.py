import os
import sys

import requests
from dotenv import load_dotenv

from .abstract_scrape_script import AbstractScrapeScript, JsonObject, ScriptType

load_dotenv()


class RegionMetadata:
    def __init__(self, name: str, country: str, longitude: float, latitude: float) -> None:
        self.name = name
        self.country = country
        self.longitude = longitude
        self.latitude = latitude

    def __eq__(self, __o: object) -> bool:
        if isinstance(__o, RegionMetadata):
            other: RegionMetadata = __o
            return self.name == other.name and self.country == other.country
        return False

    def __hash__(self) -> int:
        return hash((self.name, self.country))

    def __str__(self) -> str:
        return f"({self.name}, {self.country}, ({self.longitude}, {self.latitude}))"


class RegionNearbyLocationsScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptType) -> None:
        super().__init__(filename, script_type)

    def get_unique_regions(self) -> set[RegionMetadata]:
        data = self.read_json_file(self.root_dir / "data/modify/vineyards.json")
        vineyards: list[JsonObject] = data["data"]

        ret: set[RegionMetadata] = set()

        for vineyard in vineyards:
            regions: list[JsonObject] = vineyard["regions"]
            for region in regions:
                ret.add(RegionMetadata(region["name"], vineyard["country"], region["longitude"], region["latitude"]))

        print(f"found unique regions: {len(ret)}")

        return ret

    def scrape_api(self) -> JsonObject:
        nearby_search_url = "https://api.content.tripadvisor.com/api/v1/location/nearby_search"

        headers = {"accept": "application/json"}

        nearby_search_endpoint_data: JsonObject = {}

        for region in self.get_unique_regions():
            print(f"performing GET {nearby_search_url} with {region.name}, {region.country}")
            response: JsonObject = requests.get(
                nearby_search_url,
                headers=headers,
                params={
                    "key": os.environ["TRIP_ADVISOR_API_KEY"],
                    "latLong": f"{region.latitude},{region.longitude}",
                    "language": "en",
                    "category": "attractions",
                },
            ).json()

            if region.country not in nearby_search_endpoint_data:
                nearby_search_endpoint_data[region.country] = {}
            country_data = nearby_search_endpoint_data[region.country]

            country_data[region.name] = response

        data: JsonObject = {
            "nearby_search": nearby_search_endpoint_data,
        }

        return data

    def apply_changes(self, data: JsonObject) -> JsonObject:
        return {}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = RegionNearbyLocationsScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptType[enum_key])
    script.run()
