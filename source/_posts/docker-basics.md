---
title: Docker Basics
date: 2018-05-12 19:14:30
tags: 
  - docker
  - containers
category: Containers
---

A rough outline of using Docker.

<!--more-->

### Pulling in Images

```bash
docker pull rust
```

### Create a new volume (persistent data store)

```bash
docker volume create my-volume;

# Add a volume driver
docker plugin install --grant-all-permissions vieux/sshfs;
docker volume create --driver vieux/sshfs \
  -o sshcmd=test@node2:/home/test \
  -o password=testpassword \
  my-volume-with-driver
```

### Run a command interactively in a new container, mount volume and publish ports

```bash
docker run -it -p 80:80 --name test --mount source=hyper-server,target=/home server

# With driver
docker run -d \
  --name sshfs-container \
  --volume-driver vieux/sshfs \
  --mount src=my-volume-with-driver,target=/app,volume-opt=sshcmd=test@node2:/home/test,volume-opt=password=testpassword \
  nginx:latest
```

### Copy from running container

```bash
docker cp <container-name>:/home/server ~/backup
```

