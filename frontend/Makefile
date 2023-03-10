build-guitest:
	docker build -t wineworld-guitest -f docker/guitest/Dockerfile .

guitest:
	docker run --rm wineworld-guitest

style-py:
	ruff . --fix
	isort --profile black .
	black .
