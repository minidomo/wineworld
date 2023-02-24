# WineWorld Backend

## Launching a backend development server

```console
docker build -t wineworld-backend-dev -f Dockerfile.server .
docker run --rm -it -p 4000:4000 wineworld-backend-dev
```

Available at [localhost:4000](localhost:4000).

## Deploy to backend production server

```console
scp -r . root@192.241.139.111:/usr/src/backend
ssh root@192.241.139.111
cd /usr/src/backend
docker build -t wineworld-backend-dev -f Dockerfile.server .
docker run --rm -it -p 4000:4000 wineworld-backend-dev
```
