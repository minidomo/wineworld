import os


def is_ci() -> bool:
    return os.environ.get("CI_JOB_NAME") == "selenium_tests"
