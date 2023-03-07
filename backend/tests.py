import os
import unittest
from typing import Any

import requests
from dotenv import load_dotenv

load_dotenv()

JsonObject = dict[str, Any]
base_url = os.environ["TEST_API_URL"]

class WineAllTests(unittest.TestCase):
    url = f"{base_url}/wines"
    
    def test_status_code_200(self):
        res = requests.get(WineAllTests.url)
        self.assertEqual(res.status_code, 200)

    def test_unspecified_param(self):
        res = requests.get(WineAllTests.url, params={"this_is_not_defined": 0})
        self.assertEqual(res.status_code, 200)

    def test_invalid_formatted_param(self):
        res = requests.get(
            WineAllTests.url,
            params={
                "page": "this should be a number",
                "startRating": "this should also be a number",
            },
        )

        self.assertEqual(res.status_code, 200)

    def test_format(self):
        res = requests.get(WineAllTests.url).json()

        self.assertEqual(type(res["length"]), int)
        self.assertEqual(type(res["list"]), list)
        self.assertEqual(type(res["page"]), int)
        self.assertEqual(type(res["totalPages"]), int)

        regions: list = res["list"]
        self.assertGreater(len(regions), 0)

    def test_min_clamp_page(self):
        page_num = -1
        res = requests.get(WineAllTests.url, params={"page": page_num}).json()
        self.assertNotEqual(res["page"], page_num)
        self.assertEqual(res["page"], 1)

    def test_max_clamp_page(self):
        page_num = 39485
        res = requests.get(WineAllTests.url, params={"page": page_num}).json()
        self.assertNotEqual(res["page"], page_num)
        self.assertEqual(res["page"], res["totalPages"])

    def test_length(self):
        res = requests.get(WineAllTests.url).json()
        self.assertEqual(res["length"], len(res["list"]))

    def test_page(self):
        page_num = 2
        res_1 = requests.get(WineAllTests.url).json()
        res_2 = requests.get(WineAllTests.url, params={"page": page_num}).json()

        self.assertEqual(res_2["page"], page_num)
        self.assertNotEqual(res_1["list"][0]["id"], res_2["list"][0]["id"])

    def test_name(self):
        name_query = "os"
        res = requests.get(WineAllTests.url, params={"name": name_query}).json()

        wines: list[JsonObject] = res["list"]
        self.assertGreater(len(wines), 0)

        for wine in wines:
            name: str = wine["name"].lower()
            self.assertTrue(name_query in name)

    def test_country(self):
        country_query = ["United States", "Portugal"]
        res = requests.get(WineAllTests.url, params={"country": country_query}).json()

        wines: list[JsonObject] = res["list"]
        self.assertGreater(len(wines), 0)

        country_set = set(country_query)
        for wine in wines:
            country: str = wine["country"]
            self.assertTrue(country in country_set)


class WineIdTests(unittest.TestCase):
    url = f"{base_url}/wines"

    def test_status_code_200(self):
        res = requests.get(f"{WineIdTests.url}/1")
        self.assertEqual(res.status_code, 200)

    def test_status_code_404(self):
        res = requests.get(f"{WineIdTests.url}/0")
        self.assertEqual(res.status_code, 404)

    def test_format(self):
        res = requests.get(f"{WineIdTests.url}/1").json()

        self.assertEqual(type(res["country"]), str)
        self.assertEqual(type(res["id"]), int)
        self.assertEqual(type(res["image"]), str)
        self.assertEqual(type(res["name"]), str)
        self.assertEqual(type(res["rating"]), float)
        self.assertEqual(type(res["redditPosts"]), list)
        self.assertEqual(type(res["related"]), dict)
        self.assertEqual(type(res["reviews"]), int)
        self.assertEqual(type(res["type"]), str)
        self.assertEqual(type(res["winery"]), str)

        redditPosts: list = res["redditPosts"]
        for post in redditPosts:
            self.assertEqual(type(post), str)

        related: dict = res["related"]
        self.assertEqual(type(related["regions"]), list)
        self.assertEqual(type(related["vineyards"]), list)


class VineyardAllTests(unittest.TestCase):
    url = f"{base_url}/vineyards"

    def test_status_code_200(self):
        res = requests.get(VineyardAllTests.url)
        self.assertEqual(res.status_code, 200)

    def test_unspecified_param(self):
        res = requests.get(VineyardAllTests.url, params={"this_is_not_defined": 0})
        self.assertEqual(res.status_code, 200)

    def test_invalid_formatted_param(self):
        res = requests.get(
            VineyardAllTests.url,
            params={
                "page": "this should be a number",
                "startRating": "this should also be a number",
            },
        )

        self.assertEqual(res.status_code, 200)

    def test_format(self):
        res = requests.get(VineyardAllTests.url).json()

        self.assertEqual(type(res["length"]), int)
        self.assertEqual(type(res["list"]), list)
        self.assertEqual(type(res["page"]), int)
        self.assertEqual(type(res["totalPages"]), int)

        regions: list = res["list"]
        self.assertGreater(len(regions), 0)

    def test_min_clamp_page(self):
        page_num = -1
        res = requests.get(VineyardAllTests.url, params={"page": page_num}).json()
        self.assertNotEqual(res["page"], page_num)
        self.assertEqual(res["page"], 1)

    def test_max_clamp_page(self):
        page_num = 39485
        res = requests.get(VineyardAllTests.url, params={"page": page_num}).json()
        self.assertNotEqual(res["page"], page_num)
        self.assertEqual(res["page"], res["totalPages"])

    def test_length(self):
        res = requests.get(VineyardAllTests.url).json()
        self.assertEqual(res["length"], len(res["list"]))

    def test_page(self):
        page_num = 2
        res_1 = requests.get(VineyardAllTests.url).json()
        res_2 = requests.get(VineyardAllTests.url, params={"page": page_num}).json()

        self.assertEqual(res_2["page"], page_num)
        self.assertNotEqual(res_1["list"][0]["id"], res_2["list"][0]["id"])

    def test_name(self):
        name_query = "os"
        res = requests.get(VineyardAllTests.url, params={"name": name_query}).json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        for vineyard in vineyards:
            name: str = vineyard["name"].lower()
            self.assertTrue(name_query in name)

    def test_country(self):
        country_query = ["United States", "Portugal"]
        res = requests.get(VineyardAllTests.url, params={"country": country_query}).json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        country_set = set(country_query)
        for vineyard in vineyards:
            country: str = vineyard["country"]
            self.assertTrue(country in country_set)


class VineyardIdTests(unittest.TestCase):
    url = f"{base_url}/vineyards"

    def test_status_code_200(self):
        res = requests.get(f"{VineyardIdTests.url}/1")
        self.assertEqual(res.status_code, 200)

    def test_status_code_404(self):
        res = requests.get(f"{VineyardIdTests.url}/0")
        self.assertEqual(res.status_code, 404)

    def test_format(self):
        res = requests.get(f"{VineyardIdTests.url}/1").json()

        self.assertEqual(type(res["coordinates"]), dict)
        self.assertEqual(type(res["country"]), str)
        self.assertEqual(type(res["id"]), int)
        self.assertEqual(type(res["image"]), str)
        self.assertEqual(type(res["name"]), str)
        self.assertEqual(type(res["price"]), int)
        self.assertEqual(type(res["rating"]), float)
        self.assertEqual(type(res["related"]), dict)
        self.assertEqual(type(res["reviews"]), int)
        self.assertEqual(type(res["url"]), str)

        coordinates: dict = res["coordinates"]
        self.assertEqual(type(coordinates["latitude"]), float)
        self.assertEqual(type(coordinates["longitude"]), float)

        related: dict = res["related"]
        self.assertEqual(type(related["regions"]), list)
        self.assertEqual(type(related["wines"]), list)


class RegionAllTests(unittest.TestCase):
    url = f"{base_url}/regions"

    def test_status_code_200(self):
        res = requests.get(RegionAllTests.url)
        self.assertEqual(res.status_code, 200)

    def test_unspecified_param(self):
        res = requests.get(RegionAllTests.url, params={"this_is_not_defined": 0})
        self.assertEqual(res.status_code, 200)

    def test_invalid_formatted_param(self):
        res = requests.get(
            RegionAllTests.url,
            params={
                "page": "this should be a number",
                "startRating": "this should also be a number",
            },
        )

        self.assertEqual(res.status_code, 200)

    def test_format(self):
        res = requests.get(RegionAllTests.url).json()

        self.assertEqual(type(res["length"]), int)
        self.assertEqual(type(res["list"]), list)
        self.assertEqual(type(res["page"]), int)
        self.assertEqual(type(res["totalPages"]), int)

        regions: list = res["list"]
        self.assertGreater(len(regions), 0)

    def test_min_clamp_page(self):
        page_num = -1
        res = requests.get(RegionAllTests.url, params={"page": page_num}).json()
        self.assertNotEqual(res["page"], page_num)
        self.assertEqual(res["page"], 1)

    def test_max_clamp_page(self):
        page_num = 39485
        res = requests.get(RegionAllTests.url, params={"page": page_num}).json()
        self.assertNotEqual(res["page"], page_num)
        self.assertEqual(res["page"], res["totalPages"])

    def test_length(self):
        res = requests.get(RegionAllTests.url).json()
        self.assertEqual(res["length"], len(res["list"]))

    def test_page(self):
        page_num = 2
        res_1 = requests.get(RegionAllTests.url).json()
        res_2 = requests.get(RegionAllTests.url, params={"page": page_num}).json()

        self.assertEqual(res_2["page"], page_num)
        self.assertNotEqual(res_1["list"][0]["id"], res_2["list"][0]["id"])

    def test_name(self):
        name_query = "os"
        res = requests.get(RegionAllTests.url, params={"name": name_query}).json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            name: str = region["name"].lower()
            self.assertTrue(name_query in name)

    def test_country(self):
        country_query = ["United States", "Portugal"]
        res = requests.get(RegionAllTests.url, params={"country": country_query}).json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        country_set = set(country_query)
        for region in regions:
            country: str = region["country"]
            self.assertTrue(country in country_set)


class RegionIdTests(unittest.TestCase):
    url = f"{base_url}/regions"

    def test_status_code_200(self):
        res = requests.get(f"{RegionIdTests.url}/1")
        self.assertEqual(res.status_code, 200)

    def test_status_code_404(self):
        res = requests.get(f"{RegionIdTests.url}/0")
        self.assertEqual(res.status_code, 404)

    def test_format(self):
        res = requests.get(f"{RegionIdTests.url}/1").json()

        self.assertEqual(type(res["coordinates"]), dict)
        self.assertEqual(type(res["country"]), str)
        self.assertEqual(type(res["id"]), int)
        self.assertEqual(type(res["image"]), dict)
        self.assertEqual(type(res["name"]), str)
        self.assertEqual(type(res["rating"]), float)
        self.assertEqual(type(res["related"]), dict)
        self.assertEqual(type(res["reviews"]), int)
        self.assertEqual(type(res["tags"]), list)
        self.assertEqual(type(res["tripTypes"]), list)
        self.assertEqual(type(res["url"]), str)

        coordinates: dict = res["coordinates"]
        self.assertEqual(type(coordinates["latitude"]), float)
        self.assertEqual(type(coordinates["longitude"]), float)

        image: dict = res["image"]
        self.assertEqual(type(image["height"]), int)
        self.assertEqual(type(image["width"]), int)
        self.assertEqual(type(image["url"]), str)

        related: dict = res["related"]
        self.assertEqual(type(related["vineyards"]), list)
        self.assertEqual(type(related["wines"]), list)

        tags: list = res["tags"]
        self.assertGreater(len(tags), 0)
        self.assertEqual(type(tags[0]), str)

        trip_types: list = res["tripTypes"]
        self.assertGreater(len(trip_types), 0)
        self.assertEqual(type(trip_types[0]), str)

    def test_rating(self):
        start_rating = 4.5
        end_rating = 4.9

        res = requests.get(
            RegionAllTests.url,
            params={
                "startRating": start_rating,
                "endRating": end_rating,
            },
        ).json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            rating: float = region["rating"]
            self.assertTrue(start_rating <= rating <= end_rating)

    def test_reviews(self):
        start_reviews = 2
        end_reviews = 50

        res = requests.get(
            RegionAllTests.url,
            params={
                "startReviews": start_reviews,
                "endReviews": end_reviews,
            },
        ).json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            reviews: int = region["reviews"]
            self.assertTrue(start_reviews <= reviews <= end_reviews)

    def test_tags(self):
        tags_query = ["Sights & Landmarks", "Spas & Wellness"]
        res = requests.get(RegionAllTests.url, params={"tags": tags_query}).json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            tags: set[str] = set(region["tags"])

            for tag in tags_query:
                self.assertTrue(tag in tags)

    def test_trip_types(self):
        trip_types_query = ["Solo travel", "Couples"]
        res = requests.get(RegionAllTests.url, params={"tripTypes": trip_types_query}).json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            trip_types: set[str] = set(region["tripTypes"])

            for trip_type in trip_types_query:
                self.assertTrue(trip_type in trip_types)

    def test_sort(self):
        # json files have booleans but are 'true' and 'false' whereas python's booleans are 'True' and 'False'
        # using 'True' or 'False' in params will not convert to 'true' or 'false', so just type it as a string
        res = requests.get(RegionAllTests.url, params={"nameSort": "true"}).json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for i in range(len(regions) - 1):
            cur_name: str = regions[i]["name"].lower()
            next_name: str = regions[i + 1]["name"].lower()
            self.assertTrue(cur_name <= next_name)

    def test_sort_reverse(self):
        # json files have booleans but are 'true' and 'false' whereas python's booleans are 'True' and 'False'
        # using 'True' or 'False' in params will not convert to 'true' or 'false', so just type it as a string
        res = requests.get(RegionAllTests.url, params={"nameSort": "false"}).json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for i in range(len(regions) - 1):
            cur_name: str = regions[i]["name"].lower()
            next_name: str = regions[i + 1]["name"].lower()
            self.assertTrue(cur_name >= next_name)

    def test_mix_1(self):
        country_query = ["United States", "Portugal"]
        trip_types_query = ["Couples"]
        tags_query = ["Tours"]
        end_rating = 4.7
        start_reviews = 50

        params: dict[str, Any] = {
            "nameSort": "true",
            "country": country_query,
            "tripTypes": trip_types_query,
            "tags": tags_query,
            "endRating": end_rating,
            "startReviews": start_reviews,
        }

        res = requests.get(RegionAllTests.url, params=params).json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        country_set = set(country_query)
        for region in regions:
            rating: float = region["rating"]
            reviews: int = region["reviews"]
            country: str = region["country"]
            tags: set[str] = set(region["tags"])
            trip_types: set[str] = set(region["tripTypes"])

            self.assertTrue(rating <= end_rating)
            self.assertTrue(reviews >= start_reviews)
            self.assertTrue(country in country_set)

            for tag in tags_query:
                self.assertTrue(tag in tags)

            for trip_type in trip_types_query:
                self.assertTrue(trip_type in trip_types)

        # checking sort
        for i in range(len(regions) - 1):
            cur_name: str = regions[i]["name"].lower()
            next_name: str = regions[i + 1]["name"].lower()
            self.assertTrue(cur_name <= next_name)


if __name__ == "__main__":
    unittest.main()
