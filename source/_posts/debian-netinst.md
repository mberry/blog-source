---
title: Debian Netinst
tags: 'Debian, Linux'
category: Debian
date: 2018-07-12 09:08:35
---


Netinst for Debian Stretch needs a little massaging sometimes. This a franken-collection of configurations not intended to be all used at once.

<!--more-->
### Basics
```bash
apt install tmux curl git
```

### Add user
```bash
# Setup non-root user
apt install sudo && 
adduser cleaner &&
usermod -aG sudo cleaner &&
echo 'cleaner ALL=(ALL) ALL' >> /etc/sudoers
```

### Server Security
```bash
apt install fail2ban unattended-upgrades &&
echo -e "APT::Periodic::Update-Package-Lists \"1\";\nAPT::Periodic::Unattended-Upgrade \"1\";\n" > /etc/apt/apt.conf.d/20auto-upgrades
# Alternatively 'dpkg-configure unattended-upgrades' and go through the graphical menu
```

#### SSH Hardening
Add key:
```bash
read -p 'Paste in public ssh key (no newlines!): ' ssh_key
```

```bash
mkdir /home/cleaner/.ssh &&
chmod 700 /home/cleaner/.ssh &&
echo  $ssh_key > /home/cleaner/.ssh/authorized_keys &&
chmod 600 /home/cleaner/.ssh/authorized_keys &&
chown cleaner:cleaner -R /home/cleaner/.ssh/ &&
unset ssh_key
```
Modify sshd_config:
```bash
sed -i 's/#Port 22/Port 12222' /etc/ssh/sshd_config;
sed -i '/PubkeyAuthentication/c\PubkeyAuthentication yes' /etc/ssh/sshd_config;
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config;
sed -i '/AuthorizedKeysFile/c\AuthorizedKeysFile %h/.ssh/authorized_keys' /etc/ssh/sshd_config;
```
Restart sshd:
```bash
service ssh restart
```

#### Iptables
```bash
# Allow ssh port
iptables -I INPUT -p tcp -s 0.0.0.0/0 --dport 12222 -j ACCEPT;
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT;
ip6tables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -P INPUT DROP;
iptables -P FORWARD DROP;
ip6tables -P INPUT DROP;
ip6tables -P FORWARD DROP;
```


```
### Use contrib and non-free repositories
```bash
sudo sed -i 's/main/main contrib non-free/g' /etc/apt/sources.list
```

### Install Nvidia GPU driver
```bash
# Use contrib and non-free sources as above
apt update
apt install -y linux-headers-$(uname -r|sed 's/[^-]*-[^-]*-//') nvidia-driver
# Restart required
# Verify
lspci | grep -i nvidia
```

### Apt over https or tor
Simply modifying sources.list to https may work depending on your mirrors, though cert failures are likely.
Use the default below as a remedy.

##### Https
```bash
apt install apt-transport-https;
apt update; # get certs before modifying sources.list
```
```bash
# String replace (only works for certain mirrors)
sed -i 's/http/https/g' /etc/apt/sources.list
```

If security.debian.org is failing:

```bash
sed -i 's/security/deb/g' /etc/apt/sources.list
```

##### Tor

```bash
apt install apt-transport-tor
```

##### Default https sources.list
```text
deb https://deb.debian.org/debian stretch main
deb-src https://deb.debian.org/debian stretch main

deb https://deb.debian.org/debian-security/ stretch/updates main
deb-src https://deb.debian.org/debian-security/ stretch/updates main

deb https://deb.debian.org/debian stretch-updates main
deb-src https://deb.debian.org/debian stretch-updates main
```

##### Default tor sources.list
```text
deb tor+http://vwakviie2ienjx6t.onion/debian stretch main
deb-src tor+http://vwakviie2ienjx6t.onion/debian stretch main

deb tor+http://sgvtcaew4bxjd7ln.onion/debian-security stretch/updates main
deb-src tor+http://sgvtcaew4bxjd7ln.onion/debian-security stretch/updates main

deb tor+http://vwakviie2ienjx6t.onion/debian stretch-updates main
deb-src tor+http://vwakviie2ienjx6t.onion/debian stretch-updates main
```


### Python things
```bash
# the pips
apt install python-pip python3-pip

# tensorflow v2 alpha (likely to change soon)
pip3 install tensorflow==2.0.0-alpha0 


# pillow
pip3 install Pillow

# Numpy / Scipy 
pip3 install numpy scipy 

# Sympy (large!)
pip3 install sympy

```

##### Install Python 3.6 and up
```bash
apt install libffi libssl-dev &&
wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tar.xz &&
tar xf Python-3.7.3.tar.xz &&
cd Python-3.7.3.tar.xz &&
./configure --enable-optimizations && 
make &&
make test &&
sudo make install &&
python3 -V
```

##### Removing python2
```bash
# shows what uses python2 as a dependency
apt -s remove python-minimal
# other potential breakages
grep bin/python$ /usr/bin/*
```

### Tiling Window Managers

##### dwm
```bash
install dwm suckless-tools lightdm xorg
```

##### i3
```bash
apt install xorg lightdm i3status suckless-tools i3-wm
# alternatively: i3-gaps
```

##### Changing resolution
```bash
# check available resolutions
xrandr -q

# modify resolution
xrandr -s 1280x800
```
### Set default Terminal
```bash
update-alternatives --config x-terminal-emulator
```

### Cmake installation
Latest source code here: 
```bash
wget https://github.com/Kitware/CMake/releases/download/v3.14.3/cmake-3.14.3.tar.gz;
tar xvfz cmake-3.14.3.tar.gz;
rm cmake-3.14.3.tar.gz;
cd cmake-3.14.3;
./configure;
make;
sudo make install;
```
