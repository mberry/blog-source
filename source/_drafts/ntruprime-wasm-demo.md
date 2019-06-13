---
title: NTRUPRime Wasm Demo
tags:
---
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
    <script src="/scripts/index.js"></script>

{% endraw %}