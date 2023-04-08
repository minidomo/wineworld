import unittest

from jsonschema import validate

import __init__  # type: ignore
from tests.common.flask_testcase import FlaskTestCase
from tests.common.schemas.responses.wine import id_response_schema


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
        validate(res, id_response_schema)


if __name__ == "__main__":
    unittest.main()
