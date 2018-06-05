---
title: Handy Bash Commands
date: 2018-06-02 14:08:40
tags: shell, linux, sysadmin
---

A random collection of (possibly) useful shell commands.

##### Contents

* [Copy only certain filetypes](#copy-filetype)
* [List all open ports](#list-ports)
* [Replace words in text files](#word-replace)
* [Get user info](#user-info)
* [Wipe all iptables rules](#flush-iptable)
* [Drop all ipv6 connections](#deny-ipv6)
* [Webserver iptables setup](#webserver-iptables)
* [Disable system logging](#no-logs)

<!--more-->

<br>
<a name="copy-filetype">
##### Find and copy only certain file type
```bash
    find -iname '*.mp3' -exec cp {} /home/mb/music \;
```
* -iname ‘*.mp3’ – Search for files matching with extension .mp3

* -exec cp – Tells you to execute the ‘cp’ command to copy files from source to destination directory.

* {} – is automatically replaced with the file name of the files found by ‘find’ command.

* /home/mb/music/ – Target directory to save the matching files.

* \; – Indicates it that the commands to be executed are now complete, and to carry out the command again on the next match.

<br>
<a name="list-ports">
##### List all open ports
```bash
netstat -lntup
```
* -l only services which are listening on some port
* -n show port number, don't try to resolve the service name
* -t tcp ports
* -u udp ports
* -p name of the program

<br>
<a name="word-replace">
##### Replace words in text files (Sed)
```bash
# Search for all words TEXT in file /tmp/foo and change line in place to NEWTEXT
sed -i '/TEXT/c\NEWTEXT' /tmp/foo
# Change word on particular line
sed -i '27s/TEXT/NEWTEXT/' /tmp/foo
```
<br>
<a name="diff-user">
##### Run command as different user
```bash
# Requires root
runuser -l mitchell -c "whoami"
```

<br>
<a name="user=info">
##### Get user info (groups/uid/gid) 
```bash
id janitor
```
<br>
<a name="flush-iptable">
##### Wipe clean iptables, accept all
```bash
iptables -P INPUT ACCEPT &&
iptables -P FORWARD ACCEPT &&
iptables -P OUTPUT ACCEPT &&
iptables -t nat -F &&
iptables -t mangle -F &&
iptables -F &&
iptables -X &&
ip6tables -P INPUT ACCEPT &&
ip6tables -P FORWARD ACCEPT &&
ip6tables -P OUTPUT ACCEPT &&
ip6tables -t nat -F &&
ip6tables -t mangle -F &&
ip6tables -F &&
ip6tables -X
```

<br>
<a name="deny-ipv6">
##### Drop all ipv6 connections
```bash
ip6tables -P INPUT DROP &&
ip6tables -P FORWARD DROP &&
ip6tables -P OUTPUT DROP 
```

<br>
<a name="webserver-iptables">
##### Webserver iptables setup (Uses a custom ssh port)

```bash
# The loopback interface, also referred to as lo, is what a computer uses to forward network connections to itself.
# also used if you configure your application server to connect to a database server with a "localhost" address
iptables -A INPUT -i lo -j ACCEPT &&
iptables -A OUTPUT -o lo -j ACCEPT &&

# create a firewall rule that allows established and related incoming traffic, so that the server will allow return traffic to outgoing connections initiated by the server itself
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT &&

# allow outgoing traffic of all established connections, which are typically the response to legitimate incoming connections
iptables -A OUTPUT -m conntrack --ctstate ESTABLISHED -j ACCEPT &&

# Some network traffic packets get marked as invalid. Sometimes it can be useful to log this type of packet but often it is fine to drop them. 
iptables -A INPUT -m conntrack --ctstate INVALID -j DROP &&

# SSH Custom port
iptables -A INPUT -p tcp --dport 2444 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT &&
# only necessary if the OUTPUT policy is not set to ACCEPT
iptables -A OUTPUT -p tcp --sport 2444 -m conntrack --ctstate ESTABLISHED -j ACCEPT &&

# allow both HTTP and HTTPS traffic
iptables -A INPUT -p tcp -m multiport --dports 80,443 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT &&
iptables -A OUTPUT -p tcp -m multiport --sports 80,443 -m conntrack --ctstate ESTABLISHED -j ACCEPT &&

# drop the rest, ignoring forwarding
iptables -P INPUT DROP &&

# basic file for backup
iptables-save > ~/ruleset-v4 &&
ip6tables-save > ~/ruleset-v6 &&
echo "### iptables setup complete ###"
```

<br>
<a name="no-logs">
##### Disable system logging
```bash
service rsyslog stop
systemctl disable rsyslog
```

<br> 
<a name="download-unzip">
##### Download and unzip file one liner
```bash
echo "Please enter url";
url = input()
```
