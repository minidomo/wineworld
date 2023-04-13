import unittest

from tests.common.driver import URL
from tests.common.gui_testcase import GuiTestcase


class TestInstances(GuiTestcase):
    def test_wines(self):
        url = f"{URL}/wines"
        self.driver.get(url)
        self.assertEqual(self.driver.current_url, url)

    def test_vineyards(self):
        url = f"{URL}/vineyards"
        self.driver.get(url)
        self.assertEqual(self.driver.current_url, url)

    def test_regions(self):
        url = f"{URL}/regions"
        self.driver.get(url)
        self.assertEqual(self.driver.current_url, url)

    def test_search(self):
        url = f"{URL}/search"
        self.driver.get(url)
        self.assertEqual(self.driver.current_url, url)


if __name__ == "__main__":
    unittest.main()
