import unittest

from jsonschema import validate

import __init__  # type: ignore
from src.routes.regions.all import sort_methods
from tests.common.flask_testcase import FlaskTestCase
from tests.common.util import JsonObject, is_alphabetical_order
from tests.schemas.responses.region import constraints_response_schema


class RegionConstraintTests(FlaskTestCase):
    endpoint = "/regions/constraints"

    def test_status_code_200(self):
        """Written by JB"""
        res = self.client.get(RegionConstraintTests.endpoint)
        self.assertEqual(res.status_code, 200)

    def test_format(self):
        """Written by JB"""
        res: JsonObject = self.client.get(RegionConstraintTests.endpoint).get_json()

        validate(res, constraints_response_schema)

        trip_types: list[str] = res["tripTypes"]
        self.assertGreater(len(trip_types), 0)
        self.assertTrue(is_alphabetical_order(False, *trip_types))

        tags: list[str] = res["tags"]
        self.assertGreater(len(tags), 0)
        self.assertTrue(is_alphabetical_order(False, *tags))

        countries: list[str] = res["countries"]
        self.assertGreater(len(countries), 0)
        self.assertTrue(is_alphabetical_order(False, *countries))

        sort_methods: list[dict] = res["sorts"]
        self.assertGreater(len(sort_methods), 0)
        self.assertTrue(is_alphabetical_order(False, *[e["id"] for e in sort_methods]))

    def test_values(self):
        """Written by JB"""
        res: JsonObject = self.client.get(RegionConstraintTests.endpoint).get_json()

        self.assertEqual(res["rating"]["min"], 0.0)
        self.assertEqual(res["rating"]["max"], 5.0)
        self.assertEqual(res["reviews"]["min"], 0)

        all_sorts: list[JsonObject] = res["sorts"]
        for sort_obj in all_sorts:
            self.assertTrue(sort_obj["id"] in sort_methods)


if __name__ == "__main__":
    unittest.main()
