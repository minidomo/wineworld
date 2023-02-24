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
