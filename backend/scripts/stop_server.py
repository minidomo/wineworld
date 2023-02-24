import subprocess
import re

regex = r"[^\s]+(?=\s+wineworld-backend-dev)"


def find_container_id(text: str) -> str | None:
    m = re.search(regex, text)
    if m is not None:
        return m.group(0)
    return None


def main():
    ps_process = subprocess.run(["docker", "ps"], capture_output=True)
    id = find_container_id(ps_process.stdout.decode())

    if id is None:
        print("did not find a running server")
    else:
        print(f"found server: {id}")
        stop_process = subprocess.run(["docker", "stop", id])
        print(f"stop status code: {stop_process.returncode}")


if __name__ == "__main__":
    main()
