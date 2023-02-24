# WineWorld Backend

## Developing on VS Code

To develop on on VS Code, install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension. Afterwards, you can open this `backend/` directory in the development container. Press `F1` to bring up the Command Palette and type in `Dev Containers` for a full list of commands.

To start the development server while on this container, run the following:

```console
python3 app.py
```

## Server

The commands in this section are only relevant for production servers. For servers on the dev environment, a separate image does not need to be built. To run a server on the dev environment, see [here](README.md#developing-on-vs-code).

### Building the server image

```console
make build-server
```

### Launching a local server

Running the following commands will have the server run on [localhost:4000](localhost:4000).

```console
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
   python3 scripts/stop_server.py
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
   python3 scripts/stop_server.py
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
python3 scripts/stop_server.py
```

**If the server is not running**

```console
systemctl restart wineworld
```
