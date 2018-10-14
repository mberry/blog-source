---
title: Fuzzing with rust
tags: Fuzzing, Factom
category: Fuzzing
---



### Fuzzing Factom

* Boot up Debian Netinst iso in a VM

* Rust
```bash
curl https://sh.rustup.rs -sSf | sh
```

* Factom cli binaries
```bash 
wget https://github.com/FactomProject/distribution/releases/download/v6.1.0/factom-amd64.deb
```

* C compiler
```bash
apt install build-essential
```

* pkg-config
```bash
apt install pkg-config
```

Choice of two fuzzers:

* Cargo-fuzz
```bash
# requires nightly
rustup default nightly
cargo install cargo-fuzz
```

* American Fuzzy Lop
```bash
cargo install afl
```


* Starting custom factomd simnet
```
factomd -network=CUSTOM -customnet="fuzz-test" -exclusive=true
```

* Start walletd
```
factom-walletd
```

To be continued...
