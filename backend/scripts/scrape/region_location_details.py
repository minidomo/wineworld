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


class LocationInfo:
    def __init__(self, location_id: str, name: str, level: str) -> None:
        self.location_id = location_id
        self.name = name
        self.level = level
        self.frequency: int = 0
        self.levels: list[int] = []

    def score(self) -> float:
        return self.frequency * 0.5 + sum(self.levels) * 0.5

    def average_level(self) -> float:
        return sum(self.levels) / self.frequency

    def __lt__(self, __o) -> bool:
        assert isinstance(__o, LocationInfo)
        other: LocationInfo = __o

        if self.score() == other.score():
            return self.average_level() < other.average_level()
        return self.score() < other.score()

    def __le__(self, __o) -> bool:
        assert isinstance(__o, LocationInfo)
        other: LocationInfo = __o

        if self.score() == other.score():
            return self.average_level() <= other.average_level()
        return self.score() <= other.score()

    def __eq__(self, __o) -> bool:
        if isinstance(__o, LocationInfo):
            other: LocationInfo = __o
            return self.score() == other.score() and self.average_level() == other.average_level()

        return False

    def __ne__(self, __o) -> bool:
        if isinstance(__o, LocationInfo):
            return not self.__eq__(__o)
        return False

    def __gt__(self, __o) -> bool:
        assert isinstance(__o, LocationInfo)
        other: LocationInfo = __o

        if self.score() == other.score():
            return self.average_level() > other.average_level()
        return self.score() > other.score()

    def __ge__(self, __o) -> bool:
        assert isinstance(__o, LocationInfo)
        other: LocationInfo = __o

        if self.score() == other.score():
            return self.average_level() >= other.average_level()
        return self.score() >= other.score()


class RegionLocationDetailsScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptMode) -> None:
        super().__init__(filename, script_type)

    def get_locations(self) -> list[JsonObject]:
        data = self.read_json_file(self.root_dir / "data/modify/region_nearby_locations.json")
        return data["data"]

    def scrape_api(self) -> JsonObject:
        def location_details_url(id):
            return f"https://api.content.tripadvisor.com/api/v1/location/{id}/details"

        headers = {"accept": "application/json"}

        location_details_endpoint_data: list[JsonObject] = []

        for location in self.get_locations():
            id: str = location["raw"]["location_id"]
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

            location_details_endpoint_data.append(
                {
                    "regions": location["regions"],
                    "raw": response,
                }
            )

        data: JsonObject = {
            "location_details": location_details_endpoint_data,
        }

        return data

    def apply_changes(self) -> JsonObject:
        data = self.read_json_file(self.root_dir / "data/raw" / self.filename)
        location_details_data: list[JsonObject] = data["location_details"]
        region_locations = self.get_region_location_dict(location_details_data)

        region_data: list[JsonObject] = []
        error_count = 0

        for location_metadata in region_locations:
            try:
                location_list = region_locations[location_metadata]

                self.assert_reviews(location_list)
                self.assert_tag_format(location_list)
                self.assert_trip_types(location_list)

                ancestor = self.determine_best_ancestor(location_list)

                model: JsonObject = {
                    "name": location_metadata.name,
                    "country": location_metadata.country,
                    "best_trip_advisor_ancestor": ancestor,
                    "raw": location_list,
                }

                region_data.append(model)
            except Exception:
                error_count += 1

        print(f"final region count: {len(region_data)}")
        print(f"error count: {error_count}")

        return {"data": region_data}

    def assert_reviews(self, location_list: list[JsonObject]):
        total_reviews = 0

        for location in location_list:
            if "review_rating_count" in location:
                counts: JsonObject = location["review_rating_count"]
                for num in counts:
                    total_reviews += int(counts[num])

        assert total_reviews > 0

    def assert_tag_format(self, location_list: list[JsonObject]):
        for location in location_list:
            assert "subcategory" in location
            assert "groups" in location

            groups: list[JsonObject] = location["groups"]
            for group in groups:
                assert "categories" in group

    def assert_trip_types(self, location_list: list[JsonObject]):
        total_score = 0

        for location in location_list:
            assert "trip_types" in location

            trip_types: list[JsonObject] = location["trip_types"]
            for trip_type in trip_types:
                assert "value" in trip_type
                total_score += int(trip_type["value"])

        assert total_score > 0

    def determine_best_ancestor(self, location_list: list[JsonObject]) -> JsonObject:
        location_id_stats: dict[str, LocationInfo] = {}

        for location in location_list:
            ancestors: list[JsonObject] = location["ancestors"]

            for i in range(len(ancestors)):
                ancestor = ancestors[i]
                location_id: str = ancestor["location_id"]

                if location_id not in location_id_stats:
                    location_id_stats[location_id] = LocationInfo(location_id, ancestor["name"], ancestor["level"])

                location_id_stats[location_id].frequency += 1
                location_id_stats[location_id].levels.append(len(ancestors) - i)

        best = max(location_id_stats.values())

        return {"level": best.level, "name": best.name, "location_id": best.location_id}

    def get_region_location_dict(self, data: list[JsonObject]) -> dict[SimpleRegion, list[JsonObject]]:
        ret: dict[SimpleRegion, list[JsonObject]] = {}

        for location in data:
            regions: list[JsonObject] = location["regions"]

            for region in regions:
                region_metadata = SimpleRegion(region["region"], region["country"])

                if region_metadata not in ret:
                    ret[region_metadata] = []

                ret[region_metadata].append(location["raw"])

        return ret

    def final_changes(self) -> JsonObject:
        return {}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = RegionLocationDetailsScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptMode[enum_key])
    script.run()
