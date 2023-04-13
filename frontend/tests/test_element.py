import unittest

from selenium.webdriver.common.by import By

from tests.common.gui_testcase import GuiTestcase


class TestElement(GuiTestcase):
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
