---
title: Hash Sum Mismatch
date: 2019-06-10 12:37:49
tags: Linux
category: Linux
---


### The Problem

Trying to download through apt can sometimes raise a fatal error due to mismatched file hashes

```bash
Hash Sum mismatch
   Hashes of expected file:
    - SHA256:f1b9878cad0300cd70aa43ed288329d6e8dfb01b7b0041dc39dfcc9ab77a9f1f
    - SHA1:da28f681d339856f2fb6a212069cb30f5e5286ed [weak]
    - MD5Sum:5e3b912e1c1120daf9525ced59aef373 [weak]
    - Filesize:13019402 [weak]
   Hashes of received file:
    - SHA256:bae5b920f710282bba743198a02b22518b7119bcd0f079c1a89ce4e761b87cdd
    - SHA1:c03e154de4b17388f5a02ab6e9f8c8ffc89d16af [weak]
    - MD5Sum:ab963ae52190b0316b83bbdb5454d542 [weak]
    - Filesize:13019402 [weak]
```

### The Reason

Often he race condition that arises with fetching apt packages. [Further details](https://blog.packagecloud.io/eng/2016/09/27/fixing-apt-hash-sum-mismatch-consistent-apt-repositories/)

Also some apt repositories use LZMA (.xz) compressed metadata. apt before version 1.0 fails to decompressed LZMA archives correctly (sometimes) giving the hash sum mismatch error.


### The solution 

```
printf "Acquire::http::Pipeline-Depth 0;
Acquire::http::No-Cache true;
Acquire::BrokenProxy    true;" >> /etc/apt/apt.conf.d/99fixbadproxy;

apt-get clean &&
rm -rf /var/lib/apt/lists/* &&
apt-get clean;
apt-get update;
apt-get upgrade;

```