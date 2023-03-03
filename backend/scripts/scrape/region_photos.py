import os
import sys

import requests
from dotenv import load_dotenv

from .abstract_scrape_script import AbstractScrapeScript, JsonObject, ScriptMode

load_dotenv()


class RegionPhotosScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptMode) -> None:
        super().__init__(filename, script_type)

    def get_unique_region_ids(self) -> set[str]:
        data = self.read_json_file(self.root_dir / "data/modify/region_location_details.json")
        regions: list[JsonObject] = data["data"]

        ret: set[str] = set()

        for region in regions:
            ret.add(region["best_trip_advisor_ancestor"]["location_id"])

        return ret

    def scrape_api(self) -> JsonObject:
        def location_photos_url(id):
            return f"https://api.content.tripadvisor.com/api/v1/location/{id}/photos"

        headers = {"accept": "application/json"}

        location_photos_endpoint_data: JsonObject = {}
        region_ids = self.get_unique_region_ids()

        for id in region_ids:
            url = location_photos_url(id)

            print(f"performing GET {url}")
            response: JsonObject = requests.get(
                url,
                headers=headers,
                params={
                    "key": os.environ["TRIP_ADVISOR_API_KEY"],
                    "language": "en",
                },
            ).json()

            location_photos_endpoint_data[id] = response

        print(f"total GET requests: {len(region_ids)}")

        return {
            "location_photos": location_photos_endpoint_data,
        }

    def apply_changes(self) -> JsonObject:
        return {}

    def final_changes(self) -> JsonObject:
        return {}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = RegionPhotosScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptMode[enum_key])
    script.run()
