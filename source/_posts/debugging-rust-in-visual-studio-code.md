---
title: Debugging Rust in Visual Studio Code
date: 2018-04-12 11:03:37
tags:  rust, vscode, debugging
---

VSCode should detect rust and offer to create a launch.json template. From there it needs a few tweaks. 

For a binary the launch.json configuration file simply needs to be pointed towards the build folder which should be target/debug/<your binary>. Example:
```json
    "program": "${workspaceFolder}/target/debug/my_binary"
```
<!--more-->

For debugging libraries or binary tests/benchmarks it's a bit more complicated, first requiring a temporary test build, so run `cargo test` initially. This will build into the same debug folder but the filename will have a hash appended indicating it's a for running tests. You'll need to copy that filename into launch.json.  Example: 
```json
    "program": "${workspaceFolder}/target/debug/my_binary-9734ad86acd71825"
```
Upon cleaning and recompiling this hash can change requiring the path to be updated periodically. 

Finally it needs a new parameter - cargo. Also included are extra arguments, `-- --nocapture` which prints stdout to the console, sometimes useful. You'll notice running the tests internally in vscode by clicking run tests has this option selected by default
```json 
    "cargo": {
        "args": ["test", "--" , "--nocapture"]
        }
```
To debug benchmarks the arguments simply need to be changed:
```json
        "cargo": {
            "args": ["bench"]
        }
```

Multiple test configurations can be listed and then selected via VSCode's command menu. 

A full example of a typical launch.json setup: 
```json
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
