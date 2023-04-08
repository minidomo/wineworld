import unittest

import __init__  # type: ignore
from src.common.sort_method_data import wine_sort_methods
from tests.common.flask_testcase import FlaskTestCase
from tests.common.util import JsonObject, is_alphabetical_order


class WineConstraintTests(FlaskTestCase):
    endpoint = "/wines/constraints"

    def test_status_code_200(self):
        """Written by Ryan"""
        res = self.client.get(WineConstraintTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by Ryan"""
        res: JsonObject = self.client.get(WineConstraintTests.endpoint).get_json()

        self.assertEqual(type(res["rating"]), dict)
        self.assertEqual(type(res["reviews"]), dict)
        self.assertEqual(type(res["wineries"]), list)
        self.assertEqual(type(res["types"]), list)
        self.assertEqual(type(res["countries"]), list)
        self.assertEqual(type(res["sorts"]), list)

        self.assertEqual(type(res["rating"]["min"]), float)
        self.assertEqual(type(res["rating"]["max"]), float)
        self.assertEqual(type(res["reviews"]["min"]), int)

        wineries: list[str] = res["wineries"]
        self.assertGreater(len(wineries), 0)
        self.assertEqual(type(wineries[0]), str)
        self.assertTrue(is_alphabetical_order(False, *wineries))

        types: list[str] = res["types"]
        self.assertGreater(len(types), 0)
        self.assertEqual(type(types[0]), str)
        self.assertTrue(is_alphabetical_order(False, *types))

        countries: list[str] = res["countries"]
        self.assertGreater(len(countries), 0)
        self.assertEqual(type(countries[0]), str)
        self.assertTrue(is_alphabetical_order(False, *countries))

        sort_methods: list[dict] = res["sorts"]
        self.assertGreater(len(sort_methods), 0)
        self.assertEqual(type(sort_methods[0]), dict)
        self.assertTrue(is_alphabetical_order(False, *[e["id"] for e in sort_methods]))

    def test_values(self):
        """Written by Ryan"""
        res: JsonObject = self.client.get(WineConstraintTests.endpoint).get_json()

        self.assertEqual(res["rating"]["min"], 0.0)
        self.assertEqual(res["rating"]["max"], 5.0)
        self.assertEqual(res["reviews"]["min"], 0)

        sort_methods: list[JsonObject] = res["sorts"]
        for sort_method in sort_methods:
            self.assertTrue(sort_method["id"] in wine_sort_methods)


if __name__ == "__main__":
    unittest.main()
