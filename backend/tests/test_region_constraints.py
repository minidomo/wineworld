import unittest

from unidecode import unidecode

import __init__  # type: ignore
from src.common.sort_method import region_sort_methods
from src.util.general import PAGE_SIZE
from tests.common.flask_testcase import FlaskTestCase
from tests.common.util import JsonObject, create_url, is_alphabetical_order


class RegionConstraintTests(FlaskTestCase):
    endpoint = "/regions/constraints"

    def test_status_code_200(self):
        """Written by JB"""
        res = self.client.get(RegionConstraintTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by JB"""
        res: JsonObject = self.client.get(RegionConstraintTests.endpoint).get_json()

        self.assertEqual(type(res["rating"]), dict)
        self.assertEqual(type(res["reviews"]), dict)
        self.assertEqual(type(res["tripTypes"]), list)
        self.assertEqual(type(res["tags"]), list)
        self.assertEqual(type(res["countries"]), list)
        self.assertEqual(type(res["sorts"]), list)

        self.assertEqual(type(res["rating"]["min"]), float)
        self.assertEqual(type(res["rating"]["max"]), float)
        self.assertEqual(type(res["reviews"]["min"]), int)

        trip_types: list[str] = res["tripTypes"]
        self.assertGreater(len(trip_types), 0)
        self.assertEqual(type(trip_types[0]), str)
        self.assertTrue(is_alphabetical_order(False, *trip_types))

        tags: list[str] = res["tags"]
        self.assertGreater(len(tags), 0)
        self.assertEqual(type(tags[0]), str)
        self.assertTrue(is_alphabetical_order(False, *tags))

        countries: list[str] = res["countries"]
        self.assertGreater(len(countries), 0)
        self.assertEqual(type(countries[0]), str)
        self.assertTrue(is_alphabetical_order(False, *countries))

        sort_methods: list[dict] = res["sorts"]
        self.assertGreater(len(sort_methods), 0)
        self.assertEqual(type(sort_methods[0]), dict)
        self.assertTrue(is_alphabetical_order(False, *[e["id"] for e in sort_methods]))

    def test_values(self):
        """Written by JB"""
        res: JsonObject = self.client.get(RegionConstraintTests.endpoint).get_json()

        self.assertEqual(res["rating"]["min"], 0.0)
        self.assertEqual(res["rating"]["max"], 5.0)
        self.assertEqual(res["reviews"]["min"], 0)

        sort_methods: list[JsonObject] = res["sorts"]
        for sort_method in sort_methods:
            self.assertTrue(sort_method["id"] in region_sort_methods)


if __name__ == "__main__":
    unittest.main()
