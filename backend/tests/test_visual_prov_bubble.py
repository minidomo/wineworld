import unittest

from jsonschema import validate

from tests.common.flask_testcase import FlaskTestCase
from tests.schemas.responses.visualizations import provider_bubble_response_schema


class TestVisualizationProviderBubble(FlaskTestCase):
    endpoint = "/visualizations/provider/bubble"

    def test_format(self):
        """Written by Ryan"""
        res = self.client.get(TestVisualizationProviderBubble.endpoint)

        self.assertEqual(res.status_code, 200)
        validate(res.get_json(), provider_bubble_response_schema)


if __name__ == "__main__":
    unittest.main()
