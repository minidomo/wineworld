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


class RegionInfoScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptMode) -> None:
        super().__init__(filename, script_type)

    def scrape_api(self) -> JsonObject:
        data = self.read_json_file(self.root_dir / "data/modify/region_location_details.json")
        regions: list[JsonObject] = data["data"]

        def location_details_url(id):
            return f"https://api.content.tripadvisor.com/api/v1/location/{id}/details"

        headers = {"accept": "application/json"}

        location_details_endpoint_data: list[JsonObject] = []

        for region in regions:
            id: str = region["ancestor"]["location_id"]
            url = location_details_url(id)

            print(f"performing GET {url}")
            response: JsonObject = requests.get(
                url,
                headers=headers,
                params={
                    "key": os.environ["TRIP_ADVISOR_API_KEY"],
                    "language": "en",
                    "currency": "USD",
                },
            ).json()

            e = {**region}
            e["raw"] = {
                "locations": e.pop("raw"),
                "region_info": response,
            }

            location_details_endpoint_data.append(e)

        return {
            "location_details": location_details_endpoint_data,
        }

    def apply_changes(self) -> JsonObject:
        data = self.read_json_file(self.root_dir / "data/raw" / self.filename)
        regions: list[JsonObject] = data["location_details"]

        region_data: list[JsonObject] = []
        error_count = 0

        for region in regions:
            try:
                region_info: JsonObject = region["raw"]["region_info"]
                e = {
                    "url": self.remove_url_params(region_info["web_url"]),
                    "longitude": float(region_info["longitude"]),
                    "latitude": float(region_info["latitude"]),
                    **region,
                }

                region_data.append(e)
            except Exception:
                error_count += 1

        print(f"final region count: {len(region_data)}")
        print(f"error count: {error_count}")

        return {"data": region_data}

    def final_changes(self) -> JsonObject:
        return {}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = RegionInfoScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptMode[enum_key])
    script.run()
