import unittest

import __init__  # type: ignore
from tests.common.flask_testcase import FlaskTestCase


class WineIdTests(FlaskTestCase):
    endpoint = "/wines"

    def test_status_code_200(self):
        """Written by Ryan"""
        res = self.client.get(f"{WineIdTests.endpoint}/1")
        self.assertEqual(res.status_code, 200)

    def test_status_code_404(self):
        """Written by Ryan"""
        res = self.client.get(f"{WineIdTests.endpoint}/0")
        self.assertEqual(res.status_code, 404)

    def test_format(self):
        """Written by Ryan"""
        res = self.client.get(f"{WineIdTests.endpoint}/1").get_json()

        self.assertEqual(type(res["country"]), str)
        self.assertEqual(type(res["id"]), int)
        self.assertEqual(type(res["image"]), str)
        self.assertEqual(type(res["name"]), str)
        self.assertEqual(type(res["rating"]), float)
        self.assertEqual(type(res["redditPosts"]), list)
        self.assertEqual(type(res["related"]), dict)
        self.assertEqual(type(res["reviews"]), int)
        self.assertEqual(type(res["type"]), str)
        self.assertEqual(type(res["winery"]), str)

        redditPosts: list = res["redditPosts"]
        for post in redditPosts:
            self.assertEqual(type(post), str)

        related: dict = res["related"]
        self.assertEqual(type(related["regions"]), list)
        self.assertEqual(type(related["vineyards"]), list)


if __name__ == "__main__":
    unittest.main()
