import unittest

from driver import create_driver
from selenium.webdriver.common.by import By

URL = "https://www.wineworld.me/"


class TestInstances(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.driver = create_driver()
        self.driver.get(URL)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    def test_WinesCardElement(self):
        cardText = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/div/div/div/div/div[1]/div/div/h5'
        ).text
        self.assertEqual(cardText, "Wines")

    def test_VineyardsCardElement(self):
        cardText = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/div/div/div/div/div[2]/div/div/h5'
        ).text
        self.assertEqual(cardText, "Vineyards")

    def test_RegionsCardElement(self):
        cardText = self.driver.find_element(
            By.XPATH, '//*[@id="root"]/div/div/div/div/div/div[3]/div/div/h5'
        ).text
        self.assertEqual(cardText, "Regions")


if __name__ == "__main__":
    unittest.main()
