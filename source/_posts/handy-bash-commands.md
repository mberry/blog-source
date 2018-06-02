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
<a name="deny ipv6">
### Drop all ipv6 connections
```bash
ip6tables -P INPUT DROP &&
ip6tables -P FORWARD DROP &&
ip6tables -P OUTPUT DROP 
```


<br> 
<a name="download-unzip">
##### Download and unzip file one liner
```bash
echo "Please enter url";
url = input()
```
