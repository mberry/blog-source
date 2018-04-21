---
title: Copy button for code blocks
date: 2018-04-20 11:23:45
tags: webdev
---

There's a few frameworks out there like clipboard.js and code-box-copy but after some messing around a simpler solution seems to be a little bit of jQuery.

To use a clipboard image or for different text modify the clippy element. Note that jQuery doesn't *officially* support SVG images but had no problem embedding one here. The copied text box reverts after 5 seconds using a promise to sleep.

As an after-footer script or at least after loading jQuery:

```html
<script>
    var clippy = "Copy";
    $('.highlight').prepend($('<button>').addClass('copy-btn')
        .append(clippy).on('click', function(e) {
        console.log(e);
        var code = $(e.target).parent().find('.code').find('.line').map(function(i, e){
        return $(e).text()
      }).toArray().join('\n')
      e.currentTarget.textContent = 'Copied!';
      revertButton(e, 5000);
      var ta = document.createElement('textarea')
      document.body.appendChild(ta)
      ta.style.position = 'fixed'
      ta.style.top = 0
      ta.style.left = 0
      ta.value = code
      ta.select()
      ta.focus()
      document.execCommand('copy')
      document.body.removeChild(ta)

    }))
    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function revertButton(e, time){
        await sleep(time);
        e.currentTarget.textContent = 'Copy';
    }
</script>
```

Style it:

```css
    .copy-btn {
        position: relative;
        display: inline-block;
        padding: 6px 12px;
        font-size: 13px;
        font-weight: 700;
        line-height: 20px;
        color: #333;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        background-color: #eee;
        background-image: linear-gradient(#fcfcfc, #eee);
        border: 1px solid #d5d5d5;
        border-radius: 3px;
        user-select: none;
    }

    .highlight {
        position: relative;
    }

    .highlight .copy-btn {
        transition: opacity .3s ease-in-out;
        opacity: 0;
        padding: 2px 6px;
        position: absolute;
        right: 4px;
        top: 6px;   
    }

    .highlight:hover .copy-btn,
    .highlight .copy-btn:focus {
        opacity: 1
    }
```

Clipboard image example:

```js
var clippy = '<img src="../img/clippy.svg" width=13></img>';
```

