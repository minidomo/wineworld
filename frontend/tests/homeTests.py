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

    def test_HomeAboutLink(self):
        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'navbar-brand')))
        element = self.driver.find_element(By.CLASS_NAME, 'navbar-brand')
        element.click()

        # WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="navbarText"]/ul/li[1]/a')))
        element = self.driver.find_element(By.XPATH, '//*[@id="navbarText"]/ul/li[1]/a')
        self.driver.execute_script("arguments[0].click();", element)

        self.assertEqual(self.driver.current_url, URL + "About")

    def test_HomeWinesLink(self):
        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'navbar-brand')))
        element = self.driver.find_element(By.CLASS_NAME, 'navbar-brand')
        element.click()

        # WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="navbarText"]/ul/li[2]/a')))
        element = self.driver.find_element(By.XPATH, '//*[@id="navbarText"]/ul/li[2]/a')
        self.driver.execute_script("arguments[0].click();", element)

        self.assertEqual(self.driver.current_url, URL + "Wines")

    def test_HomeVineyardsLink(self):
        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'navbar-brand')))
        element = self.driver.find_element(By.CLASS_NAME, 'navbar-brand')
        element.click()

        # WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="navbarText"]/ul/li[3]/a')))
        element = self.driver.find_element(By.XPATH, '//*[@id="navbarText"]/ul/li[3]/a')
        self.driver.execute_script("arguments[0].click();", element)

        self.assertEqual(self.driver.current_url, URL + "Vineyards")

    def test_HomeRegionsLink(self):
        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'navbar-brand')))
        element = self.driver.find_element(By.CLASS_NAME, 'navbar-brand')
        element.click()

        # WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="navbarText"]/ul/li[4]/a')))
        element = self.driver.find_element(By.XPATH, '//*[@id="navbarText"]/ul/li[4]/a')
        self.driver.execute_script("arguments[0].click();", element)

        self.assertEqual(self.driver.current_url, URL + "Regions")
    

if __name__ == '__main__':
    unittest.main()
