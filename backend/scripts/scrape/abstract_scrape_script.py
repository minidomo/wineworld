import json
from abc import ABC, abstractmethod
from enum import Enum
from pathlib import Path
from typing import Any

JsonObject = dict[str, Any]


class ScriptType(Enum):
    RAW: str = "raw"  # use api to get data, output to a file
    MODIFY: str = "modify"  # reads a data file, make changes, output to a file


class AbstractScrapeScript(ABC):
    def __init__(self, filename: str, script_type: ScriptType) -> None:
        super().__init__()

        self.script_type = script_type
        self.filename = filename
        self.root_dir = (Path(__file__).resolve().parent / "../..").resolve()  # go to backend dir
        self.target_dir = self.root_dir / "data" / self.script_type.value
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

    def run(self):
        if self.script_type == ScriptType.RAW:
            self._run_raw()
        elif self.script_type == ScriptType.MODIFY:
            self._run_modify()

    def _run_raw(self):
        self.create_dir()
        data = self.scrape_api()
        self.write_data(data)

    def _run_modify(self):
        self.create_dir()
        original_data = self.load_original_data()
        modified_data = self.apply_changes(original_data)
        self.write_data(modified_data)

    @staticmethod
    def determine_output_filename(filename: str) -> str:
        name = Path(filename).name
        name = name.rstrip(".py") + ".json"
        return name

    def load_original_data(self) -> JsonObject:
        return self.read_json_file(self.root_dir / "data/raw" / self.filename)

    @abstractmethod
    def scrape_api(self) -> JsonObject:
        pass

    @abstractmethod
    def apply_changes(self, data: JsonObject) -> JsonObject:
        pass
