import sys

from dotenv import load_dotenv

from .abstract_scrape_script import AbstractScrapeScript, JsonObject, ScriptMode

load_dotenv()


class RegionScript(AbstractScrapeScript):
    def __init__(self, filename: str, script_type: ScriptMode) -> None:
        super().__init__(filename, script_type)

    def scrape_api(self) -> JsonObject:
        return {}

    def apply_changes(self) -> JsonObject:
        return {}

    def final_changes(self) -> JsonObject:
        data = self.read_json_file(self.root_dir / "data/modify/region_location_details.json")
        regions: list[JsonObject] = data["data"]

        for region in regions:
            region.pop("raw", None)

        return {"data": regions}


if __name__ == "__main__":
    enum_key = sys.argv[1].upper()
    script = RegionScript(AbstractScrapeScript.determine_output_filename(__file__), ScriptMode[enum_key])
    script.run()
