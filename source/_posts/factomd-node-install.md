---
title: Factomd node install
date: 2018-06-05 07:52:40
tags: Factom, Ubuntu
---

Factomd installation script, requires Go, git and Glide. Golang installation instructions [here](golang-debian-ubuntu-installation\index.html)

```bash
#!/bin/bash
sudo apt install git golang-glide -y
git clone https://github.com/FactomProject/factomd $GOPATH/src/github.com/FactomProject/factomd
cd $GOPATH/src/github.com/FactomProject/factomd
glide cc
glide install
go install -ldflags "-X github.com/FactomProject/factomd/engine.Build=`git rev-parse HEAD` -X github.com/FactomProject/factomd/engine.FactomdVersion=`cat VERSION`" -v
whereis factomd
```


