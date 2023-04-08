import unittest

from unidecode import unidecode

import __init__  # type: ignore
from src.common.util import PAGE_SIZE
from tests.common.flask_testcase import FlaskTestCase
from tests.common.util import JsonObject, create_url, is_alphabetical_order


class RegionIdTests(FlaskTestCase):
    endpoint = "/regions"

    def test_status_code_200(self):
        """Written by JB"""
        res = self.client.get(f"{RegionIdTests.endpoint}/1")
        self.assertEqual(res.status_code, 200)

    def test_status_code_404(self):
        """Written by JB"""
        res = self.client.get(f"{RegionIdTests.endpoint}/0")
        self.assertEqual(res.status_code, 404)

    def test_format(self):
        """Written by JB"""
        res = self.client.get(f"{RegionIdTests.endpoint}/1").get_json()

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


if __name__ == "__main__":
    unittest.main()
