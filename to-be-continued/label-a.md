## a标签点击跳转到顶部的bug
a标签作为按钮时，加上`href="#"`,点击会跳转到顶部

1. 去掉href。在BS4中定义a:not(href)的样式，所以这种方式会改变a链接的样式
2. `href="javascript:void(0);"`

## error: because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.


### 2018.4.19
document原生api

属于web api，其中操作文档的有htmlElement, node ,等api


###  web api

- offsetLeft
- offsetTop
- offsetWidth
- offsetHeight
- offsetParent

- childNodes
- children

- classList

- scrollTop
- scrollHeight

- append



<p data-height="265" data-theme-id="0" data-slug-hash="ZWGJeR" data-default-tab="css,result" data-user="supah" data-embed-version="2" data-pen-title="DailyUI #016 - Popup / Overlay" class="codepen">See the Pen <a href="https://codepen.io/supah/pen/ZWGJeR/">DailyUI #016 - Popup / Overlay</a> by Fabio Ottaviani (<a href="https://codepen.io/supah">@supah</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

https://static.codepen.io/assets/embed/ei.js


## 20180509

``` javascript
var el = document.querySelector('#test');
el.style.visibility = 'hidden';
```

childNode?

节流&防抖&标识开关
https://juejin.im/post/5a35ed25f265da431d3cc1b1