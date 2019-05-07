---
title: Deep Speech Install
date: 2018-09-22 10:18:59
tags: 
    - Deep Speech
    - Tensorflow
    - Machine Learning
category: Machine Learning
---

DeepSpeech is text-to-speech engine made by Mozilla based on [Baidu's research](https://arxiv.org/abs/1412.5567). It uses Tensorflow. This is a guide to installing it on Debian.

<!--more-->

### Deep Speech install

Ubuntu Server 18.10

##### Install Git Large File Storage
```bash
sudo apt update && sudo apt -y upgrade && 
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash &&
sudo apt-get install git-lfs &&
git lfs install
```

##### Grab pre-trained model
```bash
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.4.1/deepspeech-0.4.1-models.tar.gz &&
tar xvfz deepspeech-0.4.1-models.tar.gz
```

##### CUDA dependencies
```bash
sudo apt update && 
sudo apt install -y gcc build-essential freeglut3 freeglut3-dev libxi-dev libxmu-dev dkms
```

##### CUDA
Navigate to CUDA Zone for relevant package: https://developer.nvidia.com/cuda-zone
Note: First attempt produced many drivers failing on a *Hash Mismatch Error*, strangely on the second attempt this didn't happen. Apparently is caused sometimes by cdn's.
```bash
sudo apt update && sudo apt -y upgrade &&
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1810/x86_64/cuda-repo-ubuntu1810_10.1.105-1_amd64.deb &&
sudo dpkg -i cuda-repo-ubuntu1810_10.1.105-1_amd64.deb &&
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1810/x86_64/7fa2af80.pub &&
sudo apt update && sudo apt -y install cuda
```

##### Check installation

```bash
# Reboot then:
nvidia-smi
```
In /usr/local there should be symlinks for cuda 10.0 