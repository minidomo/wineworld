import os
import unittest

import requests
from dotenv import load_dotenv

load_dotenv()

base_url = os.environ["TEST_API_URL"]


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


if __name__ == "__main__":
    unittest.main()
