import unittest

from jsonschema import validate

import __init__  # type: ignore
from src.routes.wines.all import sort_methods
from tests.common.flask_testcase import FlaskTestCase
from tests.common.schemas.responses.wine import constraints_response_schema
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

        validate(res, constraints_response_schema)

        wineries: list[str] = res["wineries"]
        self.assertGreater(len(wineries), 0)
        self.assertTrue(is_alphabetical_order(False, *wineries))

        types: list[str] = res["types"]
        self.assertGreater(len(types), 0)
        self.assertTrue(is_alphabetical_order(False, *types))

        countries: list[str] = res["countries"]
        self.assertGreater(len(countries), 0)
        self.assertTrue(is_alphabetical_order(False, *countries))

        sort_methods: list[dict] = res["sorts"]
        self.assertGreater(len(sort_methods), 0)
        self.assertTrue(is_alphabetical_order(False, *[e["id"] for e in sort_methods]))

    def test_values(self):
        """Written by Ryan"""
        res: JsonObject = self.client.get(WineConstraintTests.endpoint).get_json()

        self.assertEqual(res["rating"]["min"], 0.0)
        self.assertEqual(res["rating"]["max"], 5.0)
        self.assertEqual(res["reviews"]["min"], 0)

        all_sorts: list[JsonObject] = res["sorts"]
        for sort_obj in all_sorts:
            self.assertTrue(sort_obj["id"] in sort_methods)


if __name__ == "__main__":
    unittest.main()
