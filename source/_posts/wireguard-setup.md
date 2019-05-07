---
title: Wireguard Setup
date: 2018-12-15 11:33:02
tags: 
    - wireguard
    - vpn
    - debian
category: Guides
---

Wireguard is a simple, fast and modern VPN that is being integrated into the Linux kernel. Guide is for setting up on Debian Stretch.

<!--more-->

##### Ensure correct kernel headers (Optional)

 [Skip this step](#install) if using a standard upstream distribution. On a Linode server, due to their custom kernel I ran into problems due to missing kernel headers, many vps providers automatically handle kernel upgrades and management.  To check current kernel: 

  ```bash
  uname -r

  ```
  On Linode you'll likely see:
  ```bash
  4.14.11-x86_64-linode91
  ```
  Distribution supplied kernel:
  ```bash
  4.9.0-8-amd64
  ```

  To install an upstream kernel on a linode:

  ```bash
  apt update
  apt-get install linux-image-amd64 grub2
  ```
  Open /etc/default/grub and modify these variables to match:
  ```
  GRUB_CMDLINE_LINUX="crashkernel=auto rhgb console=ttyS0,19200n8 net.ifnames=0"
  GRUB_TERMINAL=serial
  GRUB_DISABLE_OS_PROBER=true
  GRUB_SERIAL_COMMAND="serial --speed=19200 --unit=0 --word=8 --parity=no --stop=1"
  GRUB_DISABLE_LINUX_UUID=true
  GRUB_GFXPAYLOAD_LINUX=text
  ```

  Then update:
  ```bash
  update-grub
  ```

  Shutdown the linode and set Configuration Profile > Boot Settings > Kernel to GRUB2
  Reboot and check kernel again
  ```bash
  uname -r
  ```

### Install

```bash
    hostnamectl set-hostname WGuard
    sudo -i
    echo "deb http://deb.debian.org/debian/ unstable main" > /etc/apt/sources.list.d/unstable.list
    printf 'Package: *\nPin: release a=unstable\nPin-Priority: 90\n' > /etc/apt/preferences.d/limit-unstable
    apt update
    apt install wireguard -y
```

##### Server Setup
```bash
    umask 077
    wg genkey | tee privatekey | wg pubkey > publickey
    # Replace <Private Key> and <Address>
    printf '[Interface]
    PrivateKey = <Private Key>
    Address = <IPv4 Address>, <IPv6 Address>
    ListenPort = 51820
    PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE; ip6tables -A FORWARD -i wg0 -j ACCEPT; ip6tables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
    PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE; ip6tables -D FORWARD -i wg0 -j ACCEPT; ip6tables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
    SaveConfig = true' > /etc/wireguard/wg0.conf

    # Open firewall
    sudo ufw allow 51820/udp
    sudo ufw enable
```


### Client installation

```bash
sudo -i
echo "deb http://deb.debian.org/debian/ unstable main" > /etc/apt/sources.list.d/unstable.list
printf 'Package: *\nPin: release a=unstable\nPin-Priority: 90\n' > /etc/apt/preferences.d/limit-unstable
apt update
apt install wireguard

echo "alias wgup='wg-quick up wg0'" >> ~/.bashrc
echo "alias wgdown='wg-quick down wg0'" >> ~/.bashrc

```

```bash
mkdir wg && cd wg
umask 077
wg genkey | tee privatekey | wg pubkey > publickey
printf "[Interface]
PrivateKey = <private key>
Address = 192.168.3.2

[Peer]
PublicKey = <Server Public key>
Endpoint = <Server Public IP>:51820
AllowedIPs = 0.0.0.0/0, ::/0
" > /etc/wireguard/wg0.conf

wg-quick up wg0
systemctl enable wg-quick@wg0

# confirm
wg

# interface: wg0
#  public key: <Client Public Key>
#  private key: (hidden)
#  listening port: 46052

# peer: <Server Public Key>
#  endpoint: 234.121.12.42:51820
#  allowed ips: 0.0.0.0/0, ::/0
# latest handshake: 1 minute, 35 seconds ago
# transfer: 15.56 MiB received, 676.48 KiB sent
# persistent keepalive: every 25 seconds

wg-quick save wg0

```