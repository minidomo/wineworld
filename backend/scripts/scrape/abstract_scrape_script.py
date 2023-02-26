from abc import ABC, abstractmethod
from typing import Any
import json
from pathlib import Path
from enum import Enum

JsonObject = dict[str, Any]


class ScriptType(Enum):
    RAW: str = "raw"  # use api to get data, output to a file
    MODIFY: str = "modify"  # reads a data file, make changes, output to a file


class AbstractScrapeScript(ABC):
    def __init__(self, file_name: str, script_type: ScriptType) -> None:
        super().__init__()

        self.script_type = script_type
        self.file_name = file_name
        self.root_dir = (Path(__file__).resolve().parent / "../..").resolve()  # go to backend dir
        self.target_dir = self.root_dir / "data" / self.script_type.value
        self.target_file = self.target_dir / self.file_name

    def create_dir(self):
        print(f"creating directory (if needed): {self.target_dir}")
        self.target_dir.mkdir(parents=True, exist_ok=True)

    def write_data(self, data: JsonObject):
        with self.target_file.open(mode="w") as file:
            content = json.dumps(data, ensure_ascii=False, indent=4)
            print(f"writing to: {self.target_file}")
            file.write(content)

    def run(self):
        if self.script_type == ScriptType.RAW:
            self.run_raw()
        elif self.script_type == ScriptType.MODIFY:
            self.run_modify()

    def run_raw(self):
        self.create_dir()
        data = self.scrape_api()
        self.write_data(data)

    def run_modify(self):
        self.create_dir()
        original_data = self.load_original_data()
        modified_data = self.apply_changes(original_data)
        self.write_data(modified_data)

    def load_original_data(self) -> JsonObject:
        file_path = (self.root_dir / "data/raw" / self.file_name).resolve()

        print(f"retrieving data from: {file_path}")
        json_data = file_path.read_text(encoding="utf-8")
        data: JsonObject = json.loads(json_data)

        return data

    @abstractmethod
    def scrape_api(self) -> JsonObject:
        pass

    @abstractmethod
    def apply_changes(self, data: JsonObject) -> JsonObject:
        pass
