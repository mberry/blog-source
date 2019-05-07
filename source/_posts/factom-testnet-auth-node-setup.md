---
title: Factom Testnet Auth Node Setup
date: 2019-05-05 05:33:04
tags: 
    - Factom
    - SysAdmin
category: Guides
---

Full guide starting from scratch on a fresh OS to join the Factom Testnet Authority Set.

<!--more-->

### Basic Server Hardening

```bash
#!/usr/bin/bash

# Install basic kit / configure unattended-upgrades
apt install -y fail2ban git-all unattended-upgrades
apt update
apt -y upgrade
echo -e "APT::Periodic::Update-Package-Lists \"1\";\nAPT::Periodic::Unattended-Upgrade \"1\";\n" > /etc/apt/apt.conf.d/20auto-upgrades
# Alternatively 'dpkg-configure unattended-upgrades' and go through the graphical menu

# Setup non-root user
adduser janitor
usermod -aG sudo janitor
echo 'janitor ALL=(ALL) ALL' >> /etc/sudoers

# Add sshkey
mkdir /home/janitor/.ssh
chmod 700 /home/janitor/.ssh
read -p "Please enter ssh key (no newlines!): " ssh_key
echo  $ssh_key > /home/janitor/.ssh/authorized_keys
chmod 600 /home/janitor/.ssh/authorized_keys
chown janitor:janitor -R /home/janitor/.ssh/

#Modify sshd params
sed -i 's/#Port 22/Port 22202/' /etc/ssh/sshd_config
sed -i '/PubkeyAuthentication/c\PubkeyAuthentication yes' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i '/AuthorizedKeysFile/c\AuthorizedKeysFile %h/.ssh/authorized_keys' /etc/ssh/sshd_config
sed -i 's/#PermitRootLogin prohibit-password' /etc/ssh/sshd_config

service ssh restart
```

Script download:

```bash 
wget https://gist.githubusercontent.com/MitchellBerry/2cb702946122304ddb674d996a81006f/raw/4166fc308539b76fcfa0ef94570485c679becd28/basic-server-setup.sh
```

### Docker

```bash
sudo apt update &&
sudo apt -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common &&
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - &&
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable" &&
sudo apt update &&
sudo apt install -y docker-ce docker-ce-cli containerd.io &&
sudo usermod -aG docker $USER
```

Log out for changes to take effect. A system reboot now is a good idea too.


### Firewall Rules
```bash
sudo iptables -A INPUT ! -s 54.171.68.124/32 -p tcp -m tcp --dport 2376 -m conntrack --ctstate NEW,ESTABLISHED -j REJECT --reject-with icmp-port-unreachable;
sudo iptables -A DOCKER-USER ! -s 54.171.68.124/32  -i eth0 -p tcp -m tcp --dport 8090 -j REJECT --reject-with icmp-port-unreachable;
sudo iptables -A DOCKER-USER ! -s 54.171.68.124/32  -i eth0 -p tcp -m tcp --dport 2222 -j REJECT --reject-with icmp-port-unreachable;
sudo iptables -A DOCKER-USER ! -s 54.171.68.124/32  -i eth0 -p tcp -m tcp --dport 8088 -j REJECT --reject-with icmp-port-unreachable;
sudo iptables -A DOCKER-USER ! -s 178.62.125.252/32  -i eth0 -p tcp -m tcp --dport 8088 -j REJECT --reject-with icmp-port-unreachable;
sudo iptables -A DOCKER-USER -p tcp -m tcp --dport 8110 -j ACCEPT;
```

Firewall Persistence:

```bash
sudo apt install -y iptables-persistent
# To save at a later time
#sudo netfilter-persistent save
```

### Swarm Keys
```bash
sudo mkdir -p /etc/docker &&
sudo wget https://raw.githubusercontent.com/FactomProject/factomd-testnet-toolkit/master/tls/cert.pem -O /etc/docker/factom-testnet-cert.pem &&
sudo wget https://raw.githubusercontent.com/FactomProject/factomd-testnet-toolkit/master/tls/key.pem -O /etc/docker/factom-testnet-key.pem &&
sudo chmod 644 /etc/docker/factom-testnet-cert.pem;
sudo chmod 440 /etc/docker/factom-testnet-key.pem;
sudo chgrp docker /etc/docker/*.pem;

```

### Configure docker
```bash
printf '{
  "tls": true,
  "tlscert": "/etc/docker/factom-testnet-cert.pem",

  "tlskey": "/etc/docker/factom-testnet-key.pem",
  "hosts": ["tcp://0.0.0.0:2376", "unix:///var/run/docker.sock"]
}' | sudo tee /etc/docker/daemon.json 
```


```bash
printf "[Service]
ExecStart=
ExecStart=/usr/bin/dockerd" | sudo tee /etc/systemd/system/docker.service.d/override.conf
```

```bash
sudo systemctl daemon-reload
```

### Check status
```bash
sudo systemctl restart docker &&
sudo systemctl status docker
```

### Factomd
##### Setup volumes
```bash
docker volume create factom_database;
docker volume create factom_keys;
```

##### Get container (can also be used for updating)
```bash
docker stop factomd
docker rm factomd
read -p "Factom docker version (eg v6.2.2-alpine): " version &&
docker run -d --name "factomd" -v "factom_database:/root/.factom/m2" -v "factom_keys:/root/.factom/private" --restart unless-stopped -p "8088:8088" -p "8090:8090" -p "8110:8110" -l "name=factomd" factominc/factomd:$version -broadcastnum=16 -network=CUSTOM -customnet=fct_community_test -startdelay=600 -faulttimeout=120 -config=/root/.factom/private/factomd.conf
```

```bash
docker stop factomd; 
wget -O factomd.conf https://raw.githubusercontent.com/FactomProject/factomd-testnet-toolkit/master/factomd.conf.EXAMPLE &&
sudo mv factomd.conf /var/lib/docker/volumes/factom_keys/_data/factomd.conf
```

### ServerIdentity
```bash
docker start factomd &&
wget https://github.com/FactomProject/distribution/releases/download/v6.1.0/factom-amd64.deb &&
sudo dpkg -i factom-amd64.deb
```

Open new terminal with tmux:
```bash
factom-walletd
```

Disconnect terminal `ctrl+b d`

```bash
factom-cli -s=localhost:port newecaddress
```

Visit faucet and fund address https://faucet.factoid.org/

Save private key:
```
factom-cli -s=localhost:port exportaddresses
```

Install dependencies:
```bash
sudo apt-get install -y git golang-go golang-glide
```

```bash
printf "export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin" >> ~/.profile
```

```bash
mkdir -p $GOPATH/src/github.com/FactomProject/ &&
cd $GOPATH/src/github.com/FactomProject/ &&
git clone https://github.com/FactomProject/serveridentity.git &&
cd serveridentity &&
glide install &&
go install &&
cd signwithed25519 &&
go install
``` 

```bash
cd $GOPATH/bin &&
read -p "Entry Credit Secret Key: " ECsecret &&
./serveridentity full elements $ECsecret -f &&
unset ECsecret 
```

```bash
chmod +x fullidentity.sh &&
./fullidentity.sh
```

Append fullidentity.conf details to factomd.conf

