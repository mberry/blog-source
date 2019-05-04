---
title: Debugging Rust with VSCode
date: 2018-12-20 08:37:49
tags: 
    - Rust
    - Debugging
    - VSCode
category: Programming
---

VSCode should detect rust and offer to create a launch.json template. From there it just needs a few tweaks. 

For a binary the launch.json configuration file simply needs to be pointed towards the build folder which should be target/debug/<your binary>. Example
```
    "program": "${workspaceFolder}/target/debug/my_binary"
```
For debugging libraries or binary tests/benchmarks it's a bit more complicated, first requiring a temporary test build, either run ```cargo test``` or click the handy inline "run test" button in VSCode. This will build into the same debug folder but the filename will have a hash appended. You'll need to copy that filename into launch.json. Example: 
```
    "program": "${workspaceFolder}/target/debug/my_binary-9734ad86acd71825"
```
And finally it needs a new parameter - cargo. I''ve included extra arguments, ```-- --nocapture``` prints stdout to the console. Running the tests internally in vscode by clicking run tests has this option selected by default
```    
    "cargo": {
        "args": ["test", "--" , "--nocapture"]
        }
```
To debug benchmarks the arguments simply need to be changed:
```
        "cargo": {
            "args": ["bench"]
        }
```
Multiple configurations can be listed and then selected as needed. 

A full example of a typical launch.json setup: 
```
        "version": "0.2.0",
    "configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Debug Tests",
            "program": "${workspaceFolder}/target/debug/my_binary-9734ad86acd71825",
            "cargo": {"args": ["test", "--" , "--nocapture"]},
            "cwd": "${workspaceFolder}"
        },
        {
            "type": "lldb",
            "request": "launch",
            "name": "Debug Benches",
            "program": "${workspaceFolder}/target/debug/my_binary-9734ad86acd71825",
            "cargo": {"args": ["bench"]},
            "cwd": "${workspaceFolder}"
        }
    ]
```