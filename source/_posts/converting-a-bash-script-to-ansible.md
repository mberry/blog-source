---
title: Converting a bash script to Ansible
date: 2019-05-24 14:15:00
tags: Linux, CD, Ansible
---

### Installing Ansible
Below is for Debian, see the [docs](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) for other distributions.

```bash
echo "deb http://ppa.launchpad.net/ansible/ansible/ubuntu trusty main" >> /etc/apt/sources.list &&
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367 &&
apt update &&
apt install ansible
```

### Setting up
Create and push ssh keys to servers.
```
ssh-keygen -t ed25519
ssh-copy-id -i ~/.ssh/id_ed25519 <user@host>
ssh-agent bash
ssh-add ~/.ssh/id_ed25519
```

Edit `/etc/ansible/hosts`:
```
