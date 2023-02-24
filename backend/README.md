# WineWorld Backend

## Developing on VS Code

To develop on on VS Code, install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension. Afterwards, you can open this `backend/` directory in the development container. Press `F1` to bring up the Command Palette and type in `Dev Containers` for a full list of commands.

To start the server while on this container, run the following:

```bash
python3 app.py
```

## Launching a local server

```bash
# two ways to run a server
make server-interactive # runs the server and can see console output
make server-background # runs the server in the background
```

Available at [localhost:4000](localhost:4000).

## Deploying to production

Update files on the virtual machine where our server is hosted on:

```bash
scp -r . root@192.241.139.111:/usr/src/backend
```

ssh into the machine and go to the directory:

```bash
ssh root@192.241.139.111
cd /usr/src/backend
```

Identify and stop the ongoing docker container:

```bash
docker ps # show current running containers and their IDs
docker stop <container_id>
```

Launch a local server:

```bash
make server-background
```
