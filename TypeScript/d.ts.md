## d.ts -- 声明文件 Declaration Files

d.ts文件用于为ts提供js代码的API信息。当我们在ts代码中引入一个外部或内部的纯js库时，如果重写该js库，成本很高。此时我们可以为该js库编写d.ts文件，提供API信息（API信息的正确性需要开发自己保证），具体位置就是在js库入口index.js的同级目录编写index.d.ts的同名文件。

这样，我们在引入js库就能获得ts的静态检查支持

不过，现在很多js库都提供另外的类型库。自己编写d.ts的情况，主要是ts和js的混合开发，或者从js到ts的渐进式替换


## 库结构
有这样几种类型的
1. 全局库：导出一个全局变量，例如jquery
2. 模块化的库：模块化具有内部作用域，不污染全局环境。常以import/export/require形式出现
3. UMD模块：既支持模块化引入，也支持全局引入


```js
// 题外：UMD常以这种格式开始，兼容多种环境
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["libName"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("libName"));
    } else {
        root.returnExports = factory(root.libName);
    }
}(this, function (b) {
```

## 1. Modular Libraries -- 模块化的库
常用的场景是，为内部的js代码提供静态类型


## 2. Global Libraries -- 全局库
全局库是指在全局作用域暴露变量，从而无需import直接使用

书写规则
1. namespace：namespace定义的都是全局变量，无需import引入即可使用

例子
```ts
// 全局变量myLib和她的属性
declare namespace myLib {
  //~ We can write 'myLib.timeout = 50;'
  let timeout: number;
  //~ We can access 'myLib.version', but not change it
  const version: string;
  //~ There's some class we can create via 'let c = new myLib.Cat(42)'
  //~ Or reference e.g. 'function f(c: myLib.Cat) { ... }
  class Cat {
    constructor(n: number);
    //~ We can read 'c.age' from a 'Cat' instance
    readonly age: number;
    //~ We can invoke 'c.purr()' from a 'Cat' instance
    purr(): void;
  }
  //~ We can declare a variable as
  //~   'var s: myLib.CatSettings = { weight: 5, name: "Maru" };'
  interface CatSettings {
    weight: number;
    name: string;
    tailLength?: number;
  }
  //~ We can write 'const v: myLib.VetID = 42;'
  //~  or 'const v: myLib.VetID = "bob";'
  type VetID = string | number;
  //~ We can invoke 'myLib.checkCat(c)' or 'myLib.checkCat(c, v);'
  function checkCat(c: Cat, s?: VetID);
}
```










## declare？
所有类型都需要以declare开头， declare左右就是告诉TS编译器你担保这些变量和模块存在，并声明了相应类型，编译的时候不需要提示错误！

### todo: export与 export declare
在d.ts中使用delcare到底有什么作用？