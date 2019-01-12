---
title: Port Forwarding to LXC
date: 2019-01-12 14:10:37
tags: LXC, Containers, Netowrking
category: Networking
---


### Port Forwarding to LXC Container

```bash
root@guardwire:~# ip addr show lxcbr0      
3: lxcbr0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 00:16:3e:00:00:00 brd ff:ff:ff:ff:ff:ff
    inet 10.0.3.1/24 scope global lxcbr0
       valid_lft forever preferred_lft forever
    inet6 fe80::216:3eff:fe00:0/64 scope link 
       valid_lft forever preferred_lft forever

root@guardwire:~# nmap -sn 10.0.3.1/24 

Starting Nmap 7.40 ( https://nmap.org ) at 2019-04-09 02:54 UTC
Nmap scan report for 10.0.3.144
Host is up (0.000012s latency).
MAC Address: 00:16:3E:F8:C4:92 (Xensource)
Nmap scan report for 10.0.3.1
Host is up.
Nmap done: 256 IP addresses (2 hosts up) scanned in 3.90 seconds

```

Check port 1812 is accepting udp pings:

```bash
nmap -sU 10.0.3.144 -p 1812
```

```bash
tarting Nmap 7.40 ( https://nmap.org ) at 2019-04-09 03:08 UTC
Nmap scan report for 10.0.3.144
Host is up (-0.20s latency).
PORT     STATE         SERVICE
1812/udp open|filtered radius
MAC Address: 00:16:3E:F8:C4:92 (Xensource)
```

Radius is responding on port 1812

Inject rule at top of iptables and forward udp from host:

```bash
iptables -I FORWARD -p udp -d 10.0.3.144 --dport 1812 -j ACCEPT
```
