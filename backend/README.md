# WineWorld Backend

## Developing on VS Code

To develop on on VS Code, install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension. Afterwards, you can open this `backend/` directory in the development container. Press `F1` to bring up the Command Palette and type in `Dev Containers` for a full list of commands.

To start the development server while on this container, run the following:

```console
python3 app.py
```

## Server

The commands in this section are only relevant for production servers. For servers on the dev environment, a separate image does not need to be built. To run a server on the dev environment, see [here](#developing-on-vs-code).

### Building the server image

```console
make build-server
```

### Launching a local server

Running the following commands will have the server run on [localhost:4000](localhost:4000).

```bash
# two ways to run a server
make server # runs the server and can see console output
make server-background # runs the server in the background
```

## Production

### Updating files via git

1. Push changes to the repository.
   
   ```console
   git push
   ```

2. SSH into virtual machine.
   
   ```console
   ssh root@192.241.139.111
   ```

3. Pull changes in the repository.
   
   ```console
   cd main/cs373-idb-12
   git pull
   ```

4. Starting the server with the new changes.
   
   **If the server is currently running**

   ```console
   make stop-server
   ```

   **If the server is not running**

   ```console
   systemctl restart wineworld
   ```

### Updating via SSH

1. Copy files/directories to the repository.

   ```console
   scp -r <sources> ... root@192.241.139.111:~/main/cs373-idb-12
   ```

2. SSH into the machine.
   
   ```console
   ssh root@192.241.139.111
   ```

3. Starting the server with the new changes.
   
   **If the server is currently running**

   ```console
   make stop-server
   ```

   **If the server is not running**

   ```console
   systemctl restart wineworld
   ```

### `wineworld` service

This service will execute `make wineworld-service`. In addition, the service will run automatically if the VM shuts down and powers on or if the current running server stops. If the execution script for the service needs to be updated, consider editing `make wineworld-service`. 

If the service file needs to be updated, the file is located at `/etc/systemd/system/wineworld.service`. After editing the file, run the following to update the service:

```console
systemctl daemon-reload
```

Start the server with the new changes.

**If the server is currently running**

```console
make stop-server
```

**If the server is not running**

```console
systemctl restart wineworld
```

## Scraping

Scraping is done sequentially with the goal of using region names as the common relation between all models. The process can be described generally as such:

1. Scrape the [Wines API](https://sampleapis.com/api-list/wines). 

   The Wines API contains thousands of wines, and we can obtain all of them without having to specify params.

2. Scrape the [Yelp API](https://docs.developer.yelp.com/).

   To use the Yelp API, we use the country and region information of wines we retrieved from the Wines API to use as location and limit results to places related to wine. 

3. Scrape the [Tripadvisor API](https://tripadvisor-content-api.readme.io/reference/overview).

   To use the Tripadvisor API, we use longitude and latitude coordinates of regions obtained from the Yelp API and obtain information on nearby locations. We use this information and create a generalization for each region.

4. Finalizing Wines and Vineyards

   At this point we have all the regions we need and need to limit our wines and vineyards to those that contain are located/from these regions.

Running an individual script found in `./scripts/scrape/`:

```console
make scrape name=<name_of_script> mode=<raw|modify|final>
```

Running all scripts necessary to produce final json files for all models:

> Requires having Yelp and Tripadvisor API keys and setting them in a `.env` file. Refer to `.env.example`. 

```console
make scrape-all
```

## Resources

- [Setting up a Flask web server](https://www.youtube.com/watch?v=z5XiVh6v4uI)
- [Getting a free SSL certificate from Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-18-04#step-6-securing-the-application)
- [Running gunicorn on Docker](https://stackoverflow.com/a/49287903)

