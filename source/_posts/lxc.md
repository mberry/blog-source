---
title: LXC
date: 2018-10-14 08:37:03
tags: 
    - LXC
    - Containers
category: Containers
---

LXC is the ever-ignored alternative in a docker dominated world. An outline of usage.

<!--more-->

# LXC

### Installation
```bash
apt install lxc
# LXD is on Ubuntu
# apt install lxd lxd-client
# Sanp for Debian
# apt install snapd lxd
```

### Usage
##### Without lxd
```bash
# Create a debian container
lxc-create -t debian -n my-new-container <root password>

# Create an Alpine container using the edge release
lxc-create -t alpine -n foo -- -r edge

# Verify created
lxc-ls

# Start detached
lxc-start -n my-new-container -d

# Attach
lxc-attach -n my-new-container

# Attach Error
# Failed to get PID -> Container isn't running: lxc-start
```

##### With lxd
```bash
# Initialise lxd settings
lxd init

# Create and start
lxc launch ubuntu:bionic my-container

# List
lxc ls

# "Attach"
lxc exec my-container /bin/bash

```

### Networking
Disabled by default, in many applications you'll probably want some networking.

Missing configuration is sourced from */usr/lib/x86_64-linux-gnu/lxc/lxc-net* which contains the default values which means your bridge will be given a subnet of `10.0.3.0`. You can change these values if you want in the */etc/default/lxc-net* file. See defaults below.

```bash
echo USE_LXC_BRIDGE="true" > /etc/default/lxc-net;

printf "lxc.network.type = veth
lxc.network.link = lxcbr0
lxc.network.flags = up
lxc.network.hwaddr = 00:16:3e:xx:xx:xx" > /etc/lxc/default.conf;

service lxc-net restart
```

Newly created containers now have the above configuration. This means they will be using the `lxcbr0` bridge created by the lxc-net service
 
```
ip link show
21: lxcbr0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 00:16:3e:00:00:00 brd ff:ff:ff:ff:ff:ff
    inet 10.0.3.1/24 scope global lxcbr0
```

##### Default values for lxc-net

```bash
USE_LXC_BRIDGE="true"
LXC_BRIDGE="lxcbr0"
LXC_ADDR="10.0.3.1"
LXC_NETMASK="255.255.255.0"
LXC_NETWORK="10.0.3.0/24"
LXC_DHCP_RANGE="10.0.3.2,10.0.3.254"
LXC_DHCP_MAX="253"
LXC_DHCP_CONFILE=""
LXC_DOMAIN=""
```

### Port Forwarding to Containers
Wireguard Example. Forwarding udp packets on port 51820
```bash
iptables -I FORWARD -i enp0s3 -d 10.0.3.68 -p udp  --dport 51820 -j ACCEPT -m comment --comment "Wireguard portforwarding"
iptables -t nat -A PREROUTING -p udp --dport 51820 -j DNAT --to 10.0.3.68:51820 -m comment --comment "Wireguard"
```



### Filesystem actions
```bash
# old way
cp /var/lib/lxc/my-container/rootfs/etc/hosts ~/hosts

# lxd way
lxc file pull my-container/etc/hosts
```
