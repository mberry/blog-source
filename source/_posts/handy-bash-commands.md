---
title: Handy Bash Commands
date: 2018-06-02 14:08:40
tags: shell, linux
---

A random collection of (possibly) useful shell commands.

##### Contents

* [Copy only certain filetypes](#copy-filetype)
* [List all open ports](#list-ports)

<br>
<a name="copy-filetype">
##### Find and copy only certain file type
```bash
    find -iname '*.mp3' -exec cp {} /home/mb/music \;
```
* -iname ‘*.mp3’ – Search for files matching with extension .mp3

* -exec cp – Tells you to execute the ‘cp’ command to copy files from source to destination directory.

* {} – is automatically replaced with the file name of the files found by ‘find’ command.

* /home/sk/test2/ – Target directory to save the matching files.

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



