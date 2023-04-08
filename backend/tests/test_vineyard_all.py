import unittest

from unidecode import unidecode

import __init__  # type: ignore
from src.common.util import PAGE_SIZE
from tests.common.flask_testcase import FlaskTestCase
from tests.common.util import JsonObject, create_url, is_alphabetical_order


class VineyardAllTests(FlaskTestCase):
    endpoint = "/vineyards"

    def test_status_code_200(self):
        """Written by Ryan"""
        res = self.client.get(VineyardAllTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_unspecified_param(self):
        """Written by Ryan"""
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"this_is_not_defined": 0}))
        self.assertEqual(res.status_code, 200)

    def test_invalid_formatted_param(self):
        """Written by Ryan"""
        res = self.client.get(
            create_url(
                VineyardAllTests.endpoint,
                {
                    "page": "this should be a number",
                    "startRating": "this should also be a number",
                },
            )
        )

        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by Ryan"""
        res = self.client.get(VineyardAllTests.endpoint).get_json()

        self.assertEqual(type(res["length"]), int)
        self.assertEqual(type(res["list"]), list)
        self.assertEqual(type(res["page"]), int)
        self.assertEqual(type(res["totalPages"]), int)
        self.assertEqual(type(res["totalInstances"]), int)

        regions: list = res["list"]
        self.assertGreater(len(regions), 0)

    def test_page_out_of_bounds_1(self):
        """Written by Ryan"""
        page_num = -1
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_page_out_of_bounds_2(self):
        """Written by Ryan"""
        page_num = 39485
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"page": page_num})).get_json()
        self.assertEqual(res["page"], page_num)
        self.assertEqual(res["totalPages"], 1)
        self.assertEqual(res["totalInstances"], 0)

    def test_length(self):
        """Written by Ryan"""
        res = self.client.get(VineyardAllTests.endpoint).get_json()
        self.assertEqual(res["length"], len(res["list"]))

    def test_page(self):
        """Written by Ryan"""
        page_num = 2
        res_1 = self.client.get(VineyardAllTests.endpoint).get_json()
        res_2 = self.client.get(create_url(VineyardAllTests.endpoint, {"page": page_num})).get_json()

        self.assertGreaterEqual(res_1["totalInstances"], PAGE_SIZE)
        self.assertEqual(res_2["page"], page_num)
        self.assertNotEqual(res_1["list"][0]["id"], res_2["list"][0]["id"])
        self.assertEqual(res_2["length"], PAGE_SIZE)
        self.assertGreaterEqual(res_2["totalInstances"], PAGE_SIZE)

    # TODO remove this
    def test_name(self):
        """Written by Ryan"""
        name_query = "os"
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"name": name_query})).get_json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        for vineyard in vineyards:
            name: str = vineyard["name"].lower()
            self.assertTrue(name_query in name)

    def test_search(self):
        """Written by JB"""
        search_query = "st"
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"search": search_query})).get_json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        found_dict: dict[str, bool] = {
            "name": False,
            "country": False,
        }

        for vineyard in vineyards:
            found = False

            for key in found_dict.keys():
                val: str = unidecode(vineyard[key]).lower()

                is_match = search_query in val
                found |= is_match

                if is_match:
                    found_dict[key] = True

            self.assertTrue(found)

        for key in found_dict.keys():
            self.assertTrue(found_dict[key], key)

    def test_country(self):
        """Written by Ryan"""
        country_query = ["United States", "Portugal"]
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"country": country_query})).get_json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        country_set = set(country_query)
        for vineyard in vineyards:
            country: str = vineyard["country"]
            self.assertTrue(country in country_set)

    def test_sort(self):
        """Written by Ryan"""
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"sort": "name_asc"})).get_json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        for i in range(len(vineyards) - 1):
            cur_name: str = vineyards[i]["name"].lower()
            next_name: str = vineyards[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(False, cur_name, next_name))

    def test_sort_reverse(self):
        """Written by Ryan"""
        res = self.client.get(create_url(VineyardAllTests.endpoint, {"sort": "name_desc"})).get_json()

        vineyards: list[JsonObject] = res["list"]
        self.assertGreater(len(vineyards), 0)

        for i in range(len(vineyards) - 1):
            cur_name: str = vineyards[i]["name"].lower()
            next_name: str = vineyards[i + 1]["name"].lower()
            self.assertTrue(is_alphabetical_order(True, cur_name, next_name))

    def test_floating_point_rating(self):
        """Written by JB"""
        res1 = self.client.get(create_url(VineyardAllTests.endpoint)).get_json()
        original: JsonObject = res1["list"][0]
        rating: float = original["rating"]

        res2 = self.client.get(
            create_url(
                VineyardAllTests.endpoint,
                {
                    "startRating": rating,
                    "endRating": rating,
                },
            )
        ).get_json()

        vineyards: list[JsonObject] = res2["list"]
        self.assertGreater(len(vineyards), 0)
        found_original = False

        for vineyard in vineyards:
            self.assertAlmostEqual(vineyard["rating"], rating)
            found_original |= vineyard["id"] == original["id"]

        self.assertTrue(found_original)


if __name__ == "__main__":
    unittest.main()
