all: format lint type-check

type-check:
	mypy app.py wsgi.py

lint:
	ruff app.py wsgi.py

format:
	black --line-length 120 app.py wsgi.py

build-server:
	docker build -t wineworld-backend-dev -f docker/server/Dockerfile .

server-interactive: build-server
	docker run --rm -it -p 4000:4000 wineworld-backend-dev

server-background: build-server
	docker run --rm -d -p 4000:4000 wineworld-backend-dev
