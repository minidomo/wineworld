import unittest
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
import sys

URL = "https://www.wineworld.me/"

class TestInstances(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        service = Service(executable_path="../chromedriver/win32/chromedriver")
        # driver = webdriver.Chrome(service=service)

        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        chrome_prefs = {}
        options.experimental_options["prefs"] = chrome_prefs
        chrome_prefs["profile.default_content_settings"] = {"images": 2}

        self.driver = webdriver.Chrome(options=options, service=service)
        self.driver.maximize_window()
        self.driver.get(URL)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    def test_WinesCardElement(self):
        cardText = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/div[1]/div/div/h5').text
        self.assertEqual(cardText, "Wines")

    def test_VineyardsCardElement(self):
        cardText = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/div[2]/div/div/h5').text
        self.assertEqual(cardText, "Vineyards")

    def test_RegionsCardElement(self):
        cardText = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/div[3]/div/div/h5').text
        self.assertEqual(cardText, "Regions")



if __name__ == '__main__':
    unittest.main()