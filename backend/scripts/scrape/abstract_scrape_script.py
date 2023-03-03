import json
from abc import ABC, abstractmethod
from enum import Enum
from pathlib import Path
from typing import Any

JsonObject = dict[str, Any]


class ScriptMode(Enum):
    RAW: str = "raw"  # use api to get data, output to a file
    MODIFY: str = "modify"  # reads the raw data file, make changes, output to a file
    FINAL: str = "final"  # reads the modify data file, make changes, output to a file


class SimpleRegion:
    def __init__(self, name: str, country: str, latitude: int | None = None, longitude: int | None = None) -> None:
        self.name = name
        self.country = country
        self.latitude = latitude
        self.longitude = longitude

    def __eq__(self, __o: object) -> bool:
        if isinstance(__o, SimpleRegion):
            other: SimpleRegion = __o
            return self.name == other.name and self.country == other.country
        return False

    def __hash__(self) -> int:
        return hash((self.name, self.country))

    def __str__(self) -> str:
        return f"({self.name}, {self.country})"


class AbstractScrapeScript(ABC):
    def __init__(self, filename: str, script_mode: ScriptMode) -> None:
        super().__init__()

        self.script_mode = script_mode
        self.filename = filename
        self.root_dir = (Path(__file__).resolve().parent / "../..").resolve()  # go to backend dir
        self.target_dir = self.root_dir / "data" / self.script_mode.value
        self.target_file = self.target_dir / self.filename

    def create_dir(self):
        print(f"creating directory (if needed): {self.target_dir}")
        self.target_dir.mkdir(parents=True, exist_ok=True)

    def write_data(self, data: JsonObject):
        with self.target_file.open(mode="w") as file:
            content = json.dumps(data, ensure_ascii=False, indent=4)
            print(f"writing to: {self.target_file}")
            file.write(content)

    def read_json_file(self, path: Path) -> JsonObject:
        file_path = path.resolve()

        print(f"reading data from: {file_path}")
        json_data = file_path.read_text(encoding="utf-8")
        data: JsonObject = json.loads(json_data)

        return data

    def get_final_regions(self) -> set[SimpleRegion]:
        ret: set[SimpleRegion] = set()

        data = self.read_json_file(self.root_dir / "data/final/regions.json")
        regions: list[JsonObject] = data["data"]

        for region in regions:
            ret.add(SimpleRegion(region["name"], region["country"]))

        return ret

    def run(self):
        if self.script_mode == ScriptMode.RAW:
            self._run_raw()
        elif self.script_mode == ScriptMode.MODIFY:
            self._run_modify()
        elif self.script_mode == ScriptMode.FINAL:
            self._run_final()

    def _run_raw(self):
        self.create_dir()
        data = self.scrape_api()
        self.write_data(data)

    def _run_modify(self):
        self.create_dir()
        data = self.apply_changes()
        self.write_data(data)

    def _run_final(self):
        self.create_dir()
        data = self.final_changes()
        self.write_data(data)

    @staticmethod
    def determine_output_filename(filename: str) -> str:
        name = Path(filename).name
        name = name.rstrip(".py") + ".json"
        return name

    @abstractmethod
    def scrape_api(self) -> JsonObject:
        pass

    @abstractmethod
    def apply_changes(self) -> JsonObject:
        pass

    @abstractmethod
    def final_changes(self) -> JsonObject:
        pass
