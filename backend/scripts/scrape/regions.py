import sys

from dotenv import load_dotenv

from .abstract_scrape_script import AbstractScrapeScript, JsonObject, ScriptMode

load_dotenv()


class RegionScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptMode) -> None:
        super().__init__(filename, script_type)

    def scrape_api(self) -> JsonObject:
        return {}

    def apply_changes(self) -> JsonObject:
        return {}

    def get_region_info(self) -> JsonObject:
        data = self.read_json_file(self.root_dir / "data/raw/region_info.json")
        return data["location_details"]

    def get_region_photos(self) -> list[JsonObject]:
        data = self.read_json_file(self.root_dir / "data/misc/reviewed_photos.json")
        return data["data"]

    def get_locations(self) -> list[JsonObject]:
        data = self.read_json_file(self.root_dir / "data/modify/region_location_details.json")
        return data["data"]

    def final_changes(self) -> JsonObject:
        locations = self.get_locations()
        region_photos = self.get_region_photos()
        region_info = self.get_region_info()

        regions: list[JsonObject] = []
        error_count = 0

        for location in locations:
            try:
                id: str = location["best_trip_advisor_ancestor"]["location_id"]
                location_list = location["raw"]

                rating_info = self.determine_rating_info(location_list)
                image = self.get_first_image(region_photos, id)

                model: JsonObject = {
                    "name": location["name"],
                    "country": location["country"],
                    "rating": rating_info["rating"],
                    "reviews": rating_info["reviews"],
                    "tags": self.determine_tags(location_list),
                    "tripTypes": self.determine_trip_types(location_list),
                    "latitude": float(region_info[id]["latitude"]),
                    "longitude": float(region_info[id]["longitude"]),
                    "url": self.remove_url_params(region_info[id]["web_url"]),
                    "image": image["url"],
                    "imageWidth": image["width"],
                    "imageHeight": image["height"],
                }

                regions.append(model)
            except Exception:
                error_count += 1

        print(f"final region count: {len(regions)}")
        print(f"error count: {error_count}")

        return {"data": regions}

    def get_first_image(self, photo_submissions: list[JsonObject], id: str) -> JsonObject:
        for photo_submission in photo_submissions:
            if photo_submission["is_good"] and photo_submission["location_id"] == id:
                images = photo_submission["images"]
                image = images["large"]

                return {
                    "url": image["url"],
                    "width": image["width"],
                    "height": image["height"],
                }

        return {}

    def determine_tags(self, location_list: list[JsonObject]) -> list[str]:
        tag_set: set[str] = set()

        for location in location_list:
            tag: str = ""

            subcategories: list[JsonObject] = location["subcategory"]
            for subcategory in subcategories:
                tag = subcategory["localized_name"]
                tag_set.add(tag.strip())

            groups: list[JsonObject] = location["groups"]
            for group in groups:
                tag = group["localized_name"]
                tag_set.add(tag.strip())

                categories: list[JsonObject] = group["categories"]
                for category in categories:
                    tag = category["localized_name"]
                    tag_set.add(tag.strip())

        stripped: map[str] = map(lambda e: e.strip(), tag_set)
        nonempty = filter(lambda e: len(e) > 0, stripped)
        ret = list(nonempty)

        return ret

    def determine_trip_types(self, location_list: list[JsonObject]) -> list[str]:
        trip_type_dict: dict[str, int] = {
            "Business": 0,
            "Couples": 0,
            "Solo travel": 0,
            "Family": 0,
            "Friends getaway": 0,
        }

        for location in location_list:
            trip_types: list[JsonObject] = location["trip_types"]

            for trip_type in trip_types:
                trip_type_dict[trip_type["localized_name"]] += int(trip_type["value"])

        average_score = sum(trip_type_dict.values()) // 5
        ret = list(filter(lambda e: trip_type_dict[e] >= average_score, trip_type_dict.keys()))

        return ret

    def determine_rating_info(self, location_list: list[JsonObject]) -> JsonObject:
        ratings = [0, 0, 0, 0, 0, 0]

        for location in location_list:
            if "review_rating_count" in location:
                counts: JsonObject = location["review_rating_count"]
                for num in counts:
                    count = int(counts[num])
                    ratings[int(num)] += count

        sum_rating = 0
        for i in range(len(ratings)):
            sum_rating += i * ratings[i]

        reviews = sum(ratings)
        final_rating = sum_rating / reviews

        return {
            "rating": round(final_rating, 1),
            "reviews": reviews,
        }


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = RegionScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptMode[enum_key])
    script.run()
