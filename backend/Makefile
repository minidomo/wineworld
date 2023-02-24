all: lint format type-check

type-check:
	mypy .

lint:
	ruff check . --fix

format:
	black --line-length 120 .

build-server:
	docker build -t wineworld-backend-dev -f docker/server/Dockerfile .

server:
	docker run --rm -p 4000:4000 wineworld-backend-dev

server-background:
	docker run --rm -d -p 4000:4000 wineworld-backend-dev

wineworld-service:
	make server
