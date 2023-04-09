import unittest

from jsonschema import validate

from tests.common.flask_testcase import FlaskTestCase
from tests.schemas.responses.visualizations import provider_line_response_schema


class TestVisualizationProviderLine(FlaskTestCase):
    endpoint = "/visualizations/provider/line"

    def test_format(self):
        """Written by JB"""
        res = self.client.get(TestVisualizationProviderLine.endpoint)

        self.assertEqual(res.status_code, 200)
        validate(res.get_json(), provider_line_response_schema)


if __name__ == "__main__":
    unittest.main()
