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
        self.driver.get(URL + "wines")
        self.assertEqual(self.driver.current_url, URL + "wines")

    def test_vineyards(self):
        self.driver.get(URL + "vineyards")
        self.assertEqual(self.driver.current_url, URL + "vineyards")

    def test_regions(self):
        self.driver.get(URL + "regions")
        self.assertEqual(self.driver.current_url, URL + "regions")

    def test_search(self):
        self.driver.get(URL + "search")
        self.assertEqual(self.driver.current_url, URL + "search")


if __name__ == "__main__":
    unittest.main()
