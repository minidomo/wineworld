import os
import sys
from typing import Iterator

import praw
from dotenv import load_dotenv

from .abstract_scrape_script import AbstractScrapeScript, JsonObject, ScriptMode

load_dotenv()

# https://github.com/reddit-archive/reddit/wiki/OAuth2
# https://praw.readthedocs.io/en/stable/getting_started/authentication.html
reddit = praw.Reddit(
    client_id=os.environ["REDDIT_CLIENT_ID"],
    client_secret=os.environ["REDDIT_CLIENT_SECRET"],
    user_agent="ubuntu:wineworld.scrape:v1.0.0 by /u/" + os.environ["REDDIT_USERNAME"],
    refresh_token=os.environ["REDDIT_REFRESH_TOKEN"],
)


class WineRedditScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptMode) -> None:
        super().__init__(filename, script_type)

    def get_wine_types(self) -> set[str]:
        data = self.read_json_file(self.root_dir / "data/modify/wines.json")
        wines: list[JsonObject] = data["data"]

        ret: set[str] = set()

        for wine in wines:
            ret.add(wine["type"])

        return ret

    def scrape_api(self) -> JsonObject:
        wine_types = self.get_wine_types()
        subreddit: praw.reddit.Subreddit = reddit.subreddit("wine")

        wine_type_dict: JsonObject = {}

        for wine_type in wine_types:
            print(f"getting posts mentioning: {wine_type}")
            it_submissions: Iterator[praw.reddit.models.Submission] = subreddit.search(
                f'selftext:"{wine_type}"', sort="new"
            )

            wine_type_dict[wine_type] = [
                f"https://www.reddit.com/{submission.permalink}" for submission in it_submissions
            ]

        for wine_type in wine_types:
            print(f"{wine_type} post count: {len(wine_type_dict[wine_type])}")

        return {"data": wine_type_dict}

    def apply_changes(self) -> JsonObject:
        return {}

    def final_changes(self) -> JsonObject:
        return {}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = WineRedditScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptMode[enum_key])
    script.run()
