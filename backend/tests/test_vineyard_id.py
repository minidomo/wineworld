import unittest

from unidecode import unidecode

import __init__  # type: ignore
from tests.common.flask_testcase import FlaskTestCase


class VineyardIdTests(FlaskTestCase):
    endpoint = "/vineyards"

    def test_status_code_200(self):
        """Written by JB"""
        res = self.client.get(f"{VineyardIdTests.endpoint}/1")
        self.assertEqual(res.status_code, 200)

    def test_status_code_404(self):
        """Written by JB"""
        res = self.client.get(f"{VineyardIdTests.endpoint}/0")
        self.assertEqual(res.status_code, 404)

    def test_format(self):
        """Written by JB"""
        res = self.client.get(f"{VineyardIdTests.endpoint}/1").get_json()

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


if __name__ == "__main__":
    unittest.main()
