import os
import sys

import requests
from dotenv import load_dotenv

from .abstract_scrape_script import (
    AbstractScrapeScript,
    JsonObject,
    ScriptMode,
    SimpleRegion,
)

load_dotenv()


class RegionNearbyLocationsScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptMode) -> None:
        super().__init__(filename, script_type)

    def get_unique_regions(self) -> set[SimpleRegion]:
        data = self.read_json_file(self.root_dir / "data/modify/vineyards.json")
        vineyards: list[JsonObject] = data["data"]

        ret: set[SimpleRegion] = set()

        for vineyard in vineyards:
            regions: list[JsonObject] = vineyard["regions"]
            for region in regions:
                ret.add(SimpleRegion(region["name"], region["country"], region["latitude"], region["longitude"]))

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

    def apply_changes(self) -> JsonObject:
        data = self.read_json_file(self.root_dir / "data/raw" / self.filename)
        nearby_search_data: JsonObject = data["nearby_search"]

        locations_dict: dict[str, JsonObject] = {}
        region_count = 0
        zero_location_count = 0

        for country in nearby_search_data:
            country_data: JsonObject = nearby_search_data[country]

            for region in country_data:
                region_data: JsonObject = country_data[region]
                locations: list[JsonObject] = region_data["data"]

                if len(locations) == 0:
                    zero_location_count += 1
                    continue

                region_count += 1
                region_info = {
                    "region": region,
                    "country": country,
                }

                for location in locations:
                    key: str = location["location_id"]

                    if key in locations_dict:
                        region_list: list[JsonObject] = locations_dict[key]["regions"]
                        region_list.append(region_info)
                    else:
                        model: JsonObject = {
                            "regions": [region_info],
                            "raw": location,
                        }

                        locations_dict[key] = model

        print(f"final region count: {region_count}")
        print(f"unique locations found count: {len(locations_dict)}")
        print(f"regions with zero locations found count: {zero_location_count}")

        return {"data": list(locations_dict.values())}

    def final_changes(self) -> JsonObject:
        return {}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = RegionNearbyLocationsScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptMode[enum_key])
    script.run()
