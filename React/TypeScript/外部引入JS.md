# 定义外部引入JS的全局变量

一般是在html中直接引入Script的情况

```js
<script src="http://a.great.cdn.for/someLib.js"></script>
```

## 在`moduleX.d.ts`中声明
例子
```ts
declare namespace myGlobalFunction {
    function init(): void;
    const state: {};
    function report(options: OptionsTypes): boolean
}
```
具体格式见[Declaration Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html)

## 动态加载JS
多数情况下，存在多种环境配置，不同环境加载不同的脚本，故而需要动态加载脚本

```js

```


## 最后直接使用即可


<!-- ## 识别JS的类型

首先阅读参考文档[识别引入库的类型和结构](https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html)


通常有这几种类型
1. UMD
2. window.function
3. ....


### 1. UMD模块

UMD既能通过模块的方式引入，也能作为全局变量。通常最外层代码格式很明显：
```js
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["libName"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("libName"));
    } else {
        root.returnExports = factory(root.libName);
    }
}(this, function (b) {
    // ...
}));
``` -->

