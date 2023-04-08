import unittest

from unidecode import unidecode

import __init__  # type: ignore
from src.routes.vineyards.all import sort_methods
from tests.common.flask_testcase import FlaskTestCase
from tests.common.util import JsonObject, create_url, is_alphabetical_order


class VineyardConstraintTests(FlaskTestCase):
    endpoint = "/vineyards/constraints"

    def test_status_code_200(self):
        """Written by Ryan"""
        res = self.client.get(VineyardConstraintTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by Ryan"""
        res: JsonObject = self.client.get(VineyardConstraintTests.endpoint).get_json()

        self.assertEqual(type(res["rating"]), dict)
        self.assertEqual(type(res["reviews"]), dict)
        self.assertEqual(type(res["price"]), dict)
        self.assertEqual(type(res["countries"]), list)
        self.assertEqual(type(res["sorts"]), list)

        self.assertEqual(type(res["rating"]["min"]), float)
        self.assertEqual(type(res["rating"]["max"]), float)
        self.assertEqual(type(res["reviews"]["min"]), int)

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
        res: JsonObject = self.client.get(VineyardConstraintTests.endpoint).get_json()

        self.assertEqual(res["rating"]["min"], 0.0)
        self.assertEqual(res["rating"]["max"], 5.0)
        self.assertEqual(res["reviews"]["min"], 0)

        all_sorts: list[JsonObject] = res["sorts"]
        for sort_obj in all_sorts:
            self.assertTrue(sort_obj["id"] in sort_methods)


if __name__ == "__main__":
    unittest.main()
