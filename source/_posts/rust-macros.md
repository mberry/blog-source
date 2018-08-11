---
title: Rust Macros
date: 2018-07-08 13:01:11
tags: rust, development
---

Rust macros are powerful tools able to go beyond the capabilites of normal functions, this comes at the expense of debugging ease and readability.

<!--more-->

##### General rules of thumb

(note: in these examples, $pat means you should match that sort of thing with $something:pat, and the same goes for $path, $ident, $expr, etc.)

```rust
let $pat = $expr;

for $pat in $expr $block

match $expr {
    $pat => $expr,
    $pat if $expr => $expr,
}

fn $ident($pat: $ty) $block   // <-- best choice where possible
fn $ident($ident: $ty) $block // <-- sometimes you're forced to do this

let $ident = |$pat| $expr;

// function call
$expr($expr)  // <-- best choice where possible, works even for closures
$path($expr)  // <-- second best, still supports e.g. `Option::Some::<u64>`
$ident($expr) // <-- please don't do this

// struct member access
$expr.$ident

// struct method (this won't support the turbofish syntax, but I don't
//                think anything will)
$expr.$ident($expr)

// struct declaration
struct $ident { $ident: $ty }

// struct destructuring
let $path { $ident: $pat } = $expr;

mod $ident {
    $($item)*
}
```

##### Links

Official: https://doc.rust-lang.org/book/ch19-06-macros.html

https://danielkeep.github.io/quick-intro-to-macros.html

https://danielkeep.github.io/tlborm/book/README.html

