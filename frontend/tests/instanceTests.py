import unittest
from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.service import Service as ChromeService
from selenium import webdriver
# from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By


URL = "https://www.wineworld.me/"

class TestInstances(unittest.TestCase):

    @classmethod
    def setUpClass(self):
        # service = ChromeService(executable_path=ChromeDriverManager().install())
        service = Service(executable_path="../chromedriver/win32/chromedriver")

        options = webdriver.ChromeOptions()
        # options.binary_location = "C:\Program Files\Google"
        # options.binary_location = os.getcwd()

        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        chrome_prefs = {}
        options.experimental_options["prefs"] = chrome_prefs
        chrome_prefs["profile.default_content_settings"] = {"images": 2}
        self.driver = webdriver.Chrome(options=options, service=service)
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

if __name__ == '__main__':
    unittest.main()