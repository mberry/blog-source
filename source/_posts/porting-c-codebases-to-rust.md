---
title: Porting C codebases to Rust
date: 2018-06-10 09:22:46
tags: 
    - C
    - Rust
    - Development
category: Programming
---

Transpiling can sometimes yield good results and at least provides a scaffold to build upon. C2Rust was built upon Corrode and is currently the best around.

<!--more-->

### Steps:

##### Install c2rust dependencies
```bash
    apt install build-essential llvm-6.0 clang-6.0 libclang-6.0-dev cmake libssl-dev git
```

##### Install c2rust
```bash
    git clone https://github.com/immunant/c2rust.git
    cd c2rust
    cargo build --release
    echo 'export PATH=$PATH:$(pwd)/target/release' >> ~/.bashrc
    exec bash # restart terminal
```

##### Generating compile_commands.json

For Cmake projects simply use the compile flag:

```bash
    cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1 ...
```
For make projects use intercept-build or bear to generate the json file:

##### Intercept-Build
```bash
    pip install scan-build
    # Add to PATH (Ubuntu flavoured distros ≥ 16.04)
    echo 'export PATH=$PATH:~/.local/bin' >> ~/.bashrc
    exec bash # restart terminal

    # Usage
    intercept-build <build command> # intercept-build make
```

##### Bear
```bash
    git clone https://github.com/rizsotto/Bear.git
    cd Bear && mkdir build && cd build
    cmake ..
    make all
    echo 'export PATH=$PATH:$(pwd)/bear' >> ~/.bashrc
    exec bash # restart terminal

    # Usage
    bear <build command> # bear make
```
*Note: Bear can have issues with projects using LD_PRELOAD or DYLD_INSERT_LIBRARIES env variables.*

##### Transpiling
```bash
    c2rust transpile /path/to/compile_commands.json
```
