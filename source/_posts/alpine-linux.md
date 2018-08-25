---
title: Alpine Linux
date: 2018-08-25 12:26:07
tags: Alpine, Linux, Containers
category: Alpine
---

# Alpine linux

### Setup fresh install
```bash
setup-alpine
```
### As a linux container
```bash
lxc-create -t alpine -n foo -- -r edge
```

### Package Management
General commands
```bash
apk update

apk add murmur

apk del murmur
```

### Init system
Start service on boot
```bash
rc-update add nginx default
```


### Adding community repository
```bash
echo 'http://dl-cdn.alpinelinux.org/alpine/edge/community' >> /etc/apk/repositories
```


### Tutorials

https://wiki.alpinelinux.org/wiki/Tutorials_and_Howtos



### Packages

https://pkgs.alpinelinux.org/packages
