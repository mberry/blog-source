---
title: RaspberryPi Wireless Access Point
date: 2019-01-31 11:07:00
tags: Raspberry Pi, Networking
category: Networking
---

### Locate rpi on home network
```bash
sudo nmap -sn 192.168.0.0/16 | awk '/^Nmap/{ip=$NF}/B8:27:EB/{print ip}'
```

### SSH into rpi
create a empty file named ssh in the boot partition, on startup it will start sshd and then delete the file. To permanently start ssh daemon on boot change the setting in raspi-config's Interfacing options.

```bash
ssh pi@192.168.42.42
# password: raspberry
```
### Configure raspian
```bash
sudo raspi-config
```

### How to disable hdmi circuitry on raspian
```bash
/usr/bin/tvservice -o
# re-enable /use/bin/tvservice -p
```

### How to disable Bluetooth and wifi
Add following to /boot/config.txt: 
```
dtoverlay=pi3-disable-bt
dtoverlay=pi3-disable-wifi
```

# Creating an Access Point
### Install
```bash
apt update
apt upgrade
# ensure kernel up to date
# fixes nl80211 problems
# https://raspberrypi.stackexchange.com/questions/92165/raspberry-pi-3b-as-a-wireless-access-point-nl80211-driver-initialization-faile
rpi-update

apt install dnsmasq hostapd

# Not configured yet so turn off
systemctl stop dnsmasq
systemctl stop hostapd

reboot
```

### Configure DHCPCD
```bash
printf "interface wlan1
static ip_address=192.168.220.1/24
static routers=192.168.220.0" >> /etc/dhcpcd.conf
service dhcpcd restart
```
### Configure Hostapd
Only modifications needed are ssid, wpa_passphrase and perhaps driver
```bash
printf "interface=wlan1
driver=nl80211

hw_mode=g
channel=6
ieee80211n=1
wmm_enabled=1
ht_capab=[HT40][SHORT-GI-20][DSSS_CCK-40]
macaddr_acl=0
ignore_broadcast_ssid=0

auth_algs=1
wpa=2
wpa_key_mgmt=WPA-PSK
rsn_pairwise=CCMP

ssid=extender
wpa_passphrase=raspberry" >> /etc/hostapd/hostapd.conf
```

Update config default paths
```bash
sed -i 's/#DAEMON_CONF=""/DAEMON_CONF="/etc/hostapd/hostapd.conf/"' /etc/default/hostapd
```

```bash
sed -i 's/#DAEMON_CONF=/DAEMON_CONF=/etc/hostapd/hostapd.conf/' /etc/init.d/hostapd
```

### Configure Dnsmasq
```bash
mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig &&

printf "interface=wlan1       # Use interface wlan1  
listen-address=192.168.220.1   # Specify the address to listen on  
bind-interfaces      # Bind to the interface
server=8.8.8.8       # Use Google DNS  
domain-needed        # Don't forward short names  
bogus-priv           # Drop the non-routed address spaces.  
dhcp-range=192.168.220.50,192.168.220.150,12h # IP range and lease time" > /etc/dnsmasq.conf
```
### Wlan forwarding
```bash
sed -i 's/#net.ipv4.ip_forward=1/net.ipv4.ip_forward=1/' /etc/sysctl.conf
```
Reboot or:
```bash
sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
```

### Iptables
```bash
iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE  &&
iptables -A FORWARD -i wlan0 -o wlan1 -m state --state RELATED,ESTABLISHED -j ACCEPT &&
iptables -A FORWARD -i wlan1 -o wlan0 -j ACCEPT
```
Load rules on boot
```bash
sh -c "iptables-save > /etc/iptables.ipv4.nat" &&
sed -i 's/exit 0/iptables-restore < /etc/iptables.ipv4.nat\nexit 0' iptables-restore < /etc/iptables.ipv4.nat
```

### Start services
```bash
service hostapd start &&
service dnsmasq start
```