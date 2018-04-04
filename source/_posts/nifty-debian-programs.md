---
title: Nifty Debian Programs
date: 2018-04-02 12:02:27
tags: 
---

# Nifty Debian Programs

##### Contents

* [Docker](docker) / [Uninstall](uninstall-docker)
* [Midnight Commander - terminal file manager](#midnight-commander)


### Docker
```bash
    # Dependencies
    apt install apt-transport-https ca-certificates curl gnupg-agentsoftware-properties-common;

    # GPG Key
    echo "Docker GPG Key: 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88";
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - &&
    apt-key fingerprint 0EBFCD88;

    # Add repository
    echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list;

    # Install
    apt update;
    apt install docker-ce docker-ce-cli;

    # Verify
    docker run --name hello-world-container hello-world;
    docker rm hello-world-container
```

#### Uninstall Docker
```bash
    apt purge docker-ce docker-ce-cli containerd.io &&
    apt autoremove &&
    rm -rf /var/lib/docker;
    rm -rf /etc/docker
```


### Midnight commander
```bash
    apt-key adv --keyserver pool.sks-keyservers.net --recv-keys 0x836CC41976FB442E &&
    echo "deb https://www.tataranovich.com/debian stretch main" >> /etc/apt/source.list;
    echo "deb-src https://www.tataranovich.com/debian stretch main" >> /etc/apt/source.list;
    apt install mc
```
