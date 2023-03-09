import os
import sys

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

driver_paths = {
    "linux": "./chromedriver/linux64/chromedriver",
    "win32": "./chromedriver/win32/chromedriver",
}


def create_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("window-size=2560x1440")

    if os.environ.get("CI_JOB_STAGE") == "selenium_tests":
        return webdriver.Remote(
            command_executor="http://selenium__standalone-chrome:4444/wd/hub",
            options=chrome_options,
        )

    service = Service(executable_path=driver_paths[sys.platform])
    return webdriver.Chrome(service=service, options=chrome_options)
