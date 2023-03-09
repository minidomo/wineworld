import unittest

from driver import create_driver

URL = "https://www.wineworld.me/"


class TestInstances(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.driver = create_driver()
        self.driver.get(URL)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    def test_wines(self):
        self.driver.get(URL + "Wines")
        self.assertEqual(self.driver.current_url, URL + "Wines")

    def test_vineyards(self):
        self.driver.get(URL + "Vineyards")
        self.assertEqual(self.driver.current_url, URL + "Vineyards")

    def test_regions(self):
        self.driver.get(URL + "Regions")
        self.assertEqual(self.driver.current_url, URL + "Regions")


if __name__ == "__main__":
    unittest.main()
