import itertools
import os
import sys

import requests
from dotenv import load_dotenv

from .abstract_scrape_script import AbstractScrapeScript, JsonObject, ScriptType

load_dotenv()


class VineyardScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptType) -> None:
        super().__init__(filename, script_type)

    def get_unique_locations(self) -> set[tuple[str, str]]:
        data = self.read_json_file(self.root_dir / "data/modify/wines.json")
        wines: list[JsonObject] = data["data"]

        ret: set[tuple[str, str]] = set()

        for wine in wines:
            ret.add((wine["country"], wine["region"]))

        print(f"found unique locations: {len(ret)}")

        return ret

    def scrape_api(self) -> JsonObject:
        search_url = "https://api.yelp.com/v3/businesses/search"

        headers = {
            "accept": "application/json",
            "Authorization": "Bearer " + os.environ["YELP_API_KEY"],
        }

        # https://docs.developer.yelp.com/docs/resources-categories
        categories = ",".join(
            [
                "wineries",
                "winetastingroom",
                "winetasteclasses",
                "beer_and_wine",
                "winetours",
                "wine_bars",
            ]
        )

        search_endpoint_data: JsonObject = {}

        for country, region in self.get_unique_locations():
            country_data = search_endpoint_data.setdefault(country, {})
            if country not in search_endpoint_data:
                search_endpoint_data[country] = country_data

            search_params: JsonObject = {
                "location": f"{region}, {country}",
                "term": "winery",
                "categories": [categories],
                "limit": "20",
            }

            print(f"performing GET {search_url} with location " + search_params["location"])
            response: JsonObject = requests.get(
                search_url,
                params=search_params,
                headers=headers,
            ).json()

            country_data[region] = response

        data: JsonObject = {
            "search": search_endpoint_data,
        }

        return data

    def apply_changes(self, data: JsonObject) -> JsonObject:
        business_dict: dict[str, JsonObject] = {}

        error_count = 0
        region_error = 0
        zero_found = 0

        search_endpoint_data: JsonObject = data["search"]

        for country in search_endpoint_data:
            country_data: JsonObject = search_endpoint_data[country]

            for region in country_data:
                region_data: JsonObject = country_data[region]

                if "error" in region_data:
                    region_error += 1
                    continue

                if region_data["total"] == 0:
                    zero_found += 1
                    continue

                try:
                    region_info = {
                        "name": region,
                        "longitude": region_data["region"]["center"]["longitude"],
                        "latitude": region_data["region"]["center"]["latitude"],
                    }

                    assert isinstance(region_info["latitude"], float)
                    assert isinstance(region_info["longitude"], float)

                    business_list: list[JsonObject] = region_data["businesses"]

                    for business in business_list:
                        key: str = business["id"]

                        if key in business_dict:
                            region_list: list[JsonObject] = business_dict[key]["regions"]
                            region_list.append(region_info)
                        else:
                            model: JsonObject = {
                                "id": 0,  # modified later
                                "name": business["name"],
                                "price": len(business["price"]),
                                "rating": business["rating"],
                                "reviews": business["review_count"],
                                "image": business["image_url"],
                                "country": country,
                                "regions": [region_info],
                                "raw": business,  # the original business info
                            }

                            assert isinstance(model["name"], str) and len(model["name"]) > 0
                            assert isinstance(model["price"], int) and model["price"] > 0
                            assert isinstance(model["rating"], float) and model["rating"] > 0
                            assert isinstance(model["reviews"], int) and model["reviews"] > 0
                            assert isinstance(model["image"], str) and len(model["image"]) > 0

                            business_dict[key] = model
                except Exception:
                    error_count += 1

        ret: list[JsonObject] = []

        for business, i in zip(business_dict.values(), itertools.count()):
            business["id"] = i
            ret.append(business)

        print(f"final vineyard count: {len(ret)}")
        print(f"errored vineyard count: {error_count}")
        print(f"region error count: {region_error}")
        print(f"zero businesses count: {zero_found}")

        return {"data": ret}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = VineyardScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptType[enum_key])
    script.run()
