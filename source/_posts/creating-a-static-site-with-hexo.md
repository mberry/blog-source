---
title: Creating a static site with Hexo
date: 2018-06-15 15:51:53
tags: hexo, webdev
---

Hexo is a static site generator built with javascript.

<!--more-->

##### Pre-requisites

* Git 
* NPM

##### Install
```bash
    npm install -g hexo-cli
```

##### Quickstart
```bash
    hexo init "test-blog"
    cd test-blog
    hexo new "test-post"
    echo "#Heading \n Lorem Ipsum" >> source/_posts/test-post.md
    hexo generate
    hexo server
    # localhost:4000
```
##### Adding theme
Clone theme into the themes folder. Modify _config.yml theme parameter to match folder name.
