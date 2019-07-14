---
title: NTRUPRime Wasm Demo
tags: wasm
---
A basic demo of a rust crate that has been converted into a wasm module.

Due to the mime type errors I can only get this working on a local dev server. Guess it's a github pages issue. Leaving it up for now, the source code is [here](https://github.com/MitchellBerry/blog-source/tree/master/source/scripts)

```text
streamlined_ntru_prime_bg.wasm:1 Failed to load module script: The server responded with a non-JavaScript MIME type of "application/wasm". Strict MIME type checking is enforced for module scripts per HTML spec.
```

<!--more-->

<script src="/scripts/bootstrap.js"></script>
{% raw %}
    <p><button id="generatekey">Generate Keys</button> 
        <button id="movebelow">Move Below</button>
        <button id="clear">Clear All</button>
        <br><br>
        Public  Key (Output): <input style="width: 300px;" type="text" id="pubkeybox" > 
        <br><br>
        Private Key (Output): <input style="width: 300px;" type="text" id="privkeybox"></p>
    <p><button id="encapsulate">Encapsulate with Public Key</button> 
        <button id="movebelow2">Move Below</button>
        <br><br>
        Public  Key (Input): <input style="width: 300px;" type="text" id="pubkeybox2" >
        <br><br>
        Cipher Text (Output): <input style="width: 300px;" type="text" id="ciphertext" >
        <br><br>
        Shared Key (Output): <input style="width: 300px;" type="text" id="sharedkey"></p>
    <p><button id="decapsulate">Decapsulate with Ciphertext and Private Key</button>
        <button id="check">Check Shared Keys</button>
        <br><br>
        Private Key (Input): <input style="width: 300px;" type="text" id="privkeybox2">
        <br><br> 
        Cipher Text (Input): <input style="width: 300px;" type="text" id="ciphertext2" >
        <br><br>
        Shared Key (Output): <input style="width: 300px;" type="text" id="sharedkey2"></p>
    

{% endraw %}