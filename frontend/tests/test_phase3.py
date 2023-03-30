import unittest

from driver import create_driver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys

URL = "https://www.wineworld.me/"


class TestPhase3(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.driver = create_driver()
        self.driver.get(URL)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    # search tests
    def test_SitewideSearch(self):
        WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
        )
        element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
        element.click()

        searchInput = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/nav/nav/div/form/input')
        searchInput.send_keys("red" + Keys.ENTER)

        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '/html/body/div/div/div/div/div/div[1]/div/div[1]/div/div/div[2]/a'))
        )
        element = self.driver.find_element(By.XPATH, '/html/body/div/div/div/div/div/div[1]/div/div[1]/div/div/div[2]/a')
        element.click()

        self.assertEqual(self.driver.current_url, URL + "wines/266")
    
    def test_WineModelSearch(self):
        self.driver.get(URL + "wines")

        searchInput = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[3]/form/input')
        searchInput.send_keys("red" + Keys.ENTER)

        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div/div[1]/div/div/div[2]/a'))
        )
        element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div[1]/div/div/div[2]/a')
        element.click()
        
        self.assertEqual(self.driver.current_url, URL + "wines/266")

    def test_VineyardModelSearch(self):
        self.driver.get(URL + "vineyards")

        searchInput = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[3]/form/input')
        searchInput.send_keys("port" + Keys.ENTER)

        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div/div/div/div/div[2]/a'))
        )
        element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div/div/div/div[2]/a')
        element.click()
        
        self.assertEqual(self.driver.current_url, URL + "vineyards/2")

    def test_RegionModelSearch(self):
        self.driver.get(URL + "regions")

        searchInput = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[3]/form/input')
        searchInput.send_keys("mon" + Keys.ENTER)

        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div/div[1]/div/div/div[2]/a'))
        )
        element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/div[1]/div/div/div[2]/a')
        element.click()
        
        self.assertEqual(self.driver.current_url, URL + "regions/4")

    # filtering tests
    def test_WineFilter(self):
        self.driver.get(URL + "wines")

        filterText = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/div/button').text
        self.assertEqual(filterText, "Filter")

    def test_VineyardFilter(self):
        self.driver.get(URL + "vineyards")

        filterText = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/div/button').text
        self.assertEqual(filterText, "Filter")

    def test_RegionFilter(self):
        self.driver.get(URL + "regions")

        filterText = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/div/button').text
        self.assertEqual(filterText, "Filter")

    # sorting tests
    def test_WineSort(self):
        self.driver.get(URL + "wines")

        sortText = self.driver.find_element(By.XPATH, '//*[@id="dropdown-basic-button"]').text
        self.assertEqual(sortText, "Sort By")

    def test_VineyardSort(self):
        self.driver.get(URL + "vineyards")

        sortText = self.driver.find_element(By.XPATH, '//*[@id="dropdown-basic-button"]').text
        self.assertEqual(sortText, "Sort By")

    def test_regionSort(self):
        self.driver.get(URL + "regions")

        sortText = self.driver.find_element(By.XPATH, '//*[@id="dropdown-basic-button"]').text
        self.assertEqual(sortText, "Sort By")
    
if __name__ == "__main__":
    unittest.main()