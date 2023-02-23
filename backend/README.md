# WineWorld Backend
### Launching a backend development server
Run:<br />
`cd backend`<br />
`docker build . -t wineworld-backend-dev`<br />
`docker run --rm -it -p 4000:4000 wineworld-backend-dev`<br /><br />

Navigate to [localhost:4000/api](localhost:4000/api)<br />

### Deploy to backend production server
`cd backend`<br />
`scp -r . root@192.241.139.111:/usr/src/backend`<br />
`ssh root@192.241.139.111`<br />
`cd /usr/src/backend`<br />
`docker build . -t wineworld-backend-dev`<br />
`docker run --rm -it -p 4000:4000 wineworld-backend-dev`<br /><br />