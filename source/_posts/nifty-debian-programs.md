---
title: Nifty Debian Programs
date: 2018-04-02 12:02:27
tags: Debian, Software
---

#### Contents

* [Urxvt](#urxvt)
* [Youtube-dl](#youtube-dl)
* [Docker](#docker) / [Uninstall](#uninstall-docker)
* [Midnight Commander - terminal file manager](#midnight-commander)
* [Remove Apache](#remove-apache)
* [Redshift](#redshift)
* [Cmus](#cmus)
* [Zsh](#zsh)

<!--more-->

<a name="urxvt">
### Urxvt
```bash
apt install rxvt-unicode
```

<a name="youtube-dl">
### Youtube-dl
```bash
    sudo wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl &&
    sudo chmod a+rx /usr/local/bin/youtube-dl
    # To extract audio
    # apt install ffmpeg
    # youtube-dl -x <url for audio extraction>
```

<a name="docker">
### Docker
```bash
    # Dependencies
    apt install apt-transport-https ca-certificates curl gnupg-agentsoftware-properties-common;

    # GPG Key
    echo "Docker GPG Key: 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88";
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - &&
    apt-key fingerprint 0EBFCD88;

    # Add repository
    echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list;

    # Install
    apt update;
    apt install docker-ce docker-ce-cli;

    # Verify
    docker run --name hello-world-container hello-world;
    docker rm hello-world-container
```
<a name="uninstall-docker">
#### Uninstall Docker
```bash
    apt purge docker-ce docker-ce-cli containerd.io &&
    apt autoremove &&
    rm -rf /var/lib/docker;
    rm -rf /etc/docker
```

<a name="midnight-commander">
### Midnight commander
```bash
    apt-key adv --keyserver pool.sks-keyservers.net --recv-keys 0x836CC41976FB442E &&
    echo "deb https://www.tataranovich.com/debian stretch main" >> /etc/apt/source.list;
    echo "deb-src https://www.tataranovich.com/debian stretch main" >> /etc/apt/source.list;
    apt install mc
```
<a name="remove-apache">
### Remove Aapche
```bash
    sudo -i;
    service apache2 stop &&
    apt-get purge apache2 apache2-utils apache2.2-bin apache2-common &&
    whereis apache2
```
<a name="redshift">
### Redshift
```bash
    apt install redshift;
    sudo crontab -e 
    # run on startup
    # @reboot redshift
```
<a name="cmus">
### Cmus
```bash
    sudo apt install cmus
```

Usage:  
H/L = Scan forward backwards
J/K or Up/Down buttons = Up/Down
:add ~/Music = add folder to tree
-/=     Volume up/down 10%
s = toggle shuffle
x = play
v = stop
z = previous track
c  = pause
b = next

<a name="zsh">
### Zsh
##### Installation
```bash
apt install zsh -y &&
chsh -s $(which zsh)
```

##### Oh-my-zsh
Piping directly into shell, pure evil.
```bash
apt install wget git -y;
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh;
cd ~/.oh-my-zsh/themes/;
ls -a
```
Change Theme Function:
```bash
# Change theme, no argument prints all themes
function zshtheme (){
        if [ $# -eq 0 ]
        then
            # column command requires bsdmainutils
            ls /root/.oh-my-zsh/themes/ | sed 's/.zsh-theme/ /' | column
        else
            sed -i "0,/ZSH_THEME=.*/s/ZSH_THEME=.*/ZSH_THEME=$1/" ~/.zshrc
        exec zsh
        fi
}
```


##### Same config root and user
```bash
ln -s $HOME/.oh-my-zsh           /root/.oh-my-zsh;
ln -s $HOME/.zshrc               /root/.zshrc;
```

