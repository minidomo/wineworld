import unittest

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from tests.common.driver import URL
from tests.common.gui_testcase import GuiTestcase


class TestHome(GuiTestcase):
    def test_HomeAboutLink(self):
        WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
        )
        element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
        element.click()


        # WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH,
        # '//*[@id="navbarText"]/ul/li[1]/a')))
        # element = self.driver.find_element(By.XPATH, '//*[@id="navbarText"]/ul/li[1]/a')
        element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/nav/nav/div/div/div/div[1]/a')
        
        self.driver.execute_script("arguments[0].click();", element)

        self.assertEqual(self.driver.current_url, f"{URL}/about")

    def test_HomeWinesLink(self):
        WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
        )
        element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
        element.click()

        # WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH,
        # '//*[@id="navbarText"]/ul/li[2]/a')))
        # element = self.driver.find_element(By.XPATH, '//*[@id="navbarText"]/ul/li[2]/a')
        element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/nav/nav/div/div/div/div[2]/a')
        self.driver.execute_script("arguments[0].click();", element)

        self.assertEqual(self.driver.current_url, f"{URL}/wines")

    def test_HomeVineyardsLink(self):
        WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
        )
        element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
        element.click()

        # WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH,
        # '//*[@id="navbarText"]/ul/li[3]/a')))
        # element = self.driver.find_element(By.XPATH, '//*[@id="navbarText"]/ul/li[3]/a')
        element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/nav/nav/div/div/div/div[3]/a')
        self.driver.execute_script("arguments[0].click();", element)

        self.assertEqual(self.driver.current_url, f"{URL}/vineyards")

    def test_HomeRegionsLink(self):
        WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
        )
        element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
        element.click()

        # WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH,
        # '//*[@id="navbarText"]/ul/li[4]/a')))
        # element = self.driver.find_element(By.XPATH, '//*[@id="navbarText"]/ul/li[4]/a')
        element = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/nav/nav/div/div/div/div[4]/a')
        self.driver.execute_script("arguments[0].click();", element)

        self.assertEqual(self.driver.current_url, f"{URL}/regions")


if __name__ == "__main__":
    unittest.main()
