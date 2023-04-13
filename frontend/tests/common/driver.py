import sys

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

from .environment import is_ci

driver_paths = {
    "linux": "./chromedriver/linux64/chromedriver",
}


def get_url():
    if is_ci():
        return "https://www.wineworld.me"

    # host.docker.internal is the localhost equivalent when trying to
    # use localhost in a docker image
    return "http://host.docker.internal:3000"


URL = get_url()


def create_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("window-size=2560x1440")

    if is_ci():
        return webdriver.Remote(
            command_executor="http://selenium__standalone-chrome:4444/wd/hub",
            options=chrome_options,
        )

    service = Service(executable_path=driver_paths[sys.platform])
    return webdriver.Chrome(service=service, options=chrome_options)
