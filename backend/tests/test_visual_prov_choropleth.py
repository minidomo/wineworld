import unittest

from jsonschema import validate

from tests.common.flask_testcase import FlaskTestCase
from tests.schemas.responses.visualizations import provider_choropleth_response_schema


class TestVisualizationProviderChoropleth(FlaskTestCase):
    endpoint = "/visualizations/provider/choropleth"

    def test_format(self):
        """Written by Ryan"""
        res = self.client.get(TestVisualizationProviderChoropleth.endpoint)

        self.assertEqual(res.status_code, 200)
        validate(res.get_json(), provider_choropleth_response_schema)


if __name__ == "__main__":
    unittest.main()
