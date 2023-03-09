import unittest
from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep

URL = "https://www.wineworld.me/"

class TestInstances(unittest.TestCase):

    @classmethod
    def setUpClass(self):
        service = Service(executable_path="../chromedriver/linux64/chromedriver")
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

    def test_HomeWinesLink(self):
        
