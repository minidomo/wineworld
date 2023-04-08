import unittest

from unidecode import unidecode

import __init__  # type: ignore
from src.common.util import PAGE_SIZE
from tests.common.flask_testcase import FlaskTestCase
from tests.common.util import JsonObject, create_url, is_alphabetical_order


class RegionAllTests(FlaskTestCase):
    endpoint = "/regions"

    def test_status_code_200(self):
        """Written by JB"""
        res = self.client.get(RegionAllTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_unspecified_param(self):
        """Written by JB"""
        res = self.client.get(create_url(RegionAllTests.endpoint, {"this_is_not_defined": 0}))
        self.assertEqual(res.status_code, 200)

    def test_invalid_formatted_param(self):
        """Written by JB"""
        res = self.client.get(
            create_url(
                RegionAllTests.endpoint,
                {
                    "page": "this should be a number",
                    "startRating": "this should also be a number",
                },
            )
        )

        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by JB"""
        res = self.client.get(RegionAllTests.endpoint).get_json()

        self.assertEqual(type(res["length"]), int)
        self.assertEqual(type(res["list"]), list)
        self.assertEqual(type(res["page"]), int)
        self.assertEqual(type(res["totalPages"]), int)
        self.assertEqual(type(res["totalInstances"]), int)

        regions: list = res["list"]
        self.assertGreater(len(regions), 0)

    def test_page_out_of_bounds_1(self):
        """Written by JB"""
        page_num = -1
        res = self.client.get(create_url(RegionAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_page_out_of_bounds_2(self):
        """Written by JB"""
        page_num = 39485
        res = self.client.get(create_url(RegionAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_length(self):
        """Written by JB"""
        res = self.client.get(RegionAllTests.endpoint).get_json()
        self.assertEqual(res["length"], len(res["list"]))

    def test_page(self):
        """Written by JB"""
        page_num = 2
        res_1 = self.client.get(RegionAllTests.endpoint).get_json()
        res_2 = self.client.get(create_url(RegionAllTests.endpoint, {"page": page_num})).get_json()

        self.assertGreaterEqual(res_1["totalInstances"], PAGE_SIZE)
        self.assertEqual(res_2["page"], page_num)
        self.assertNotEqual(res_1["list"][0]["id"], res_2["list"][0]["id"])
        self.assertEqual(res_2["length"], PAGE_SIZE)
        self.assertGreaterEqual(res_2["totalInstances"], PAGE_SIZE)

    # TODO remove this
    def test_name(self):
        """Written by JB"""
        name_query = "os"
        res = self.client.get(create_url(RegionAllTests.endpoint, {"name": name_query})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            name: str = region["name"].lower()
            self.assertTrue(name_query in name)

    def test_search(self):
        """Written by JB"""
        search_query = "ta"
        res = self.client.get(create_url(RegionAllTests.endpoint, {"search": search_query})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        found_dict: dict[str, bool] = {
            "name": False,
            "country": False,
            "tripTypes": False,
        }

        for region in regions:
            found = False

            for key in found_dict.keys():
                is_match = False

                if isinstance(region[key], str):
                    val: str = unidecode(region[key]).lower()
                    is_match = search_query in val
                else:
                    for trip_type in region[key]:
                        val = unidecode(trip_type).lower()
                        is_match |= search_query in val

                found |= is_match
                if is_match:
                    found_dict[key] = True

            self.assertTrue(found)

        for key in found_dict.keys():
            self.assertTrue(found_dict[key], key)

    def test_country(self):
        """Written by JB"""
        country_query = ["United States", "Portugal"]
        res = self.client.get(create_url(RegionAllTests.endpoint, {"country": country_query})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        country_set = set(country_query)
        for region in regions:
            country: str = region["country"]
            self.assertTrue(country in country_set)

    def test_rating(self):
        """Written by JB"""
        start_rating = 4.5
        end_rating = 4.9

        res = self.client.get(
            create_url(
                RegionAllTests.endpoint,
                {
                    "startRating": start_rating,
                    "endRating": end_rating,
                },
            )
        ).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            rating: float = region["rating"]
            self.assertTrue(start_rating <= rating <= end_rating)

    def test_reviews(self):
        """Written by JB"""
        start_reviews = 2
        end_reviews = 50

        res = self.client.get(
            create_url(
                RegionAllTests.endpoint,
                {
                    "startReviews": start_reviews,
                    "endReviews": end_reviews,
                },
            )
        ).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            reviews: int = region["reviews"]
            self.assertTrue(start_reviews <= reviews <= end_reviews)

    def test_tags(self):
        """Written by JB"""
        tags_query = ["Sights & Landmarks", "Spas & Wellness"]
        res = self.client.get(create_url(RegionAllTests.endpoint, {"tags": tags_query})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            tags: set[str] = set(region["tags"])

            for tag in tags_query:
                self.assertTrue(tag in tags)

    def test_trip_types(self):
        """Written by JB"""
        trip_types_query = ["Solo travel", "Couples"]
        res = self.client.get(create_url(RegionAllTests.endpoint, {"tripTypes": trip_types_query})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for region in regions:
            trip_types: set[str] = set(region["tripTypes"])

            for trip_type in trip_types_query:
                self.assertTrue(trip_type in trip_types)

    def test_sort(self):
        """Written by JB"""
        res = self.client.get(create_url(RegionAllTests.endpoint, {"sort": "name_asc"})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for i in range(len(regions) - 1):
            cur_name: str = regions[i]["name"].lower()
            next_name: str = regions[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(False, cur_name, next_name))

    def test_sort_reverse(self):
        """Written by JB"""
        res = self.client.get(create_url(RegionAllTests.endpoint, {"sort": "name_desc"})).get_json()

        regions: list[JsonObject] = res["list"]
        self.assertGreater(len(regions), 0)

        for i in range(len(regions) - 1):
            cur_name: str = regions[i]["name"].lower()
            next_name: str = regions[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(True, cur_name, next_name))

    def test_mix_1(self):
        """Written by JB"""
        country_query = ["United States", "Portugal"]
        trip_types_query = ["Couples"]
        tags_query = ["Tours"]
        end_rating = 4.7
        start_reviews = 50

        params: JsonObject = {
            "country": country_query,
            "tripTypes": trip_types_query,
            "tags": tags_query,
            "endRating": end_rating,
            "startReviews": start_reviews,
            "sort": "rating_desc",
        }

        res = self.client.get(create_url(RegionAllTests.endpoint, params)).get_json()

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
            cur_rating: float = regions[i]["rating"]
            next_rating: float = regions[i + 1]["rating"]
            self.assertTrue(cur_rating >= next_rating)

    def test_floating_point_rating(self):
        """Written by JB"""
        res1 = self.client.get(create_url(RegionAllTests.endpoint)).get_json()
        original: JsonObject = res1["list"][0]
        rating: float = original["rating"]

        res2 = self.client.get(
            create_url(
                RegionAllTests.endpoint,
                {
                    "startRating": rating,
                    "endRating": rating,
                },
            )
        ).get_json()

        regions: list[JsonObject] = res2["list"]
        self.assertGreater(len(regions), 0)
        found_original = False

        for region in regions:
            self.assertAlmostEqual(region["rating"], rating)
            found_original |= region["id"] == original["id"]

        self.assertTrue(found_original)


if __name__ == "__main__":
    unittest.main()
