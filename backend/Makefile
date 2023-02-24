all: format lint type-check

type-check:
	mypy app.py

lint:
	ruff app.py

format:
	black --line-length 120 app.py

# generate a Self-Signed SSL Certificate for https
sslgen:
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.cert

server-interactive:
	docker build -t wineworld-backend-dev -f docker/server/Dockerfile .
	docker run --rm -it -p 4000:4000 wineworld-backend-dev

server-background:
	docker build -t wineworld-backend-dev -f docker/server/Dockerfile .
	docker run --rm -d -p 4000:4000 wineworld-backend-dev
