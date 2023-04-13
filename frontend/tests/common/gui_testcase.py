import unittest

from .driver import URL, create_driver


class GuiTestcase(unittest.TestCase):
    def setUp(self) -> None:
        self.driver = create_driver()
        self.driver.get(URL)

    def tearDown(self) -> None:
        self.driver.quit()
