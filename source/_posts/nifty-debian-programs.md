---
title: Nifty Debian Programs
date: 2018-04-02 12:02:27
tags: 
---

# Nifty Debian Programs

##### Contents

* [Midnight Commander](#midnight-commander)


### Midnight commander
```bash
    apt-key adv --keyserver pool.sks-keyservers.net --recv-keys 0x836CC41976FB442E &&
    echo "deb https://www.tataranovich.com/debian stretch main" >> /etc/apt/source.list;
    echo "deb-src https://www.tataranovich.com/debian stretch main" >> /etc/apt/source.list;
    apt install mc
```