
CommonJS规范
## summary
Node使用CommonJS规范，
- 每个文件时一个模块，有自己的作用域，内容是私有的；
- 模块内部，module代表当前模块，是一个对象
- module.exports
- require

- 模块可以多次加载，但只在第一次加载时运行一次，然后结果被缓存。想要重新运行，必须清楚缓存

### module对象
node内部提供Module的构造函数，所以模块都是Module实例。

每个模块内部都有一个module对象
- module.id 模块的识别符，通常是带有绝对路径的模块文件名。
- module.filename 模块的文件名，带有绝对路径。
- module.loaded 返回一个布尔值，表示模块是否已经完成加载。
- module.parent 返回一个对象，表示调用该模块的模块。
- module.children 返回一个数组，表示该模块要用到的其他模块。
- module.exports 表示模块对外输出的值。

### module.exports
模块对外输出接口。其他模块调用，实际上是读取module.exports数据

### exports
指向module.exports

不能直接将exports变量指向一个单一值，因为这样等于切断了exports与module.exports的联系。
```
//wrong
exports = funcion or string ...
//right
exports.fnc = function(){}
```

### require
读取并执行一个JS文件，并返回该module的exports对象

### require加载规则
- 加载后缀默认`.js`: `require(foo)`等同于`require(foo.js)`

路径
- 绝对路径：参数字符串以“/”开头
- 相对路径：参数字符串以“./”开头
- 参数字符串不以“./“或”/“开头时，加载核心模块（node安装目录），或npm包（全局或局部）安装目录
- 如果参数字符串不以“./“或”/“开头，而且是一个路径，比如require('example-module/path/to/file')，则将先找到example-module的位置，然后再以它为参数，找到后续路径
- 如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node搜索
- 如果想得到require命令加载的确切文件名，使用require.resolve()方法。






## references
- [commonjs规范](http://javascript.ruanyifeng.com/nodejs/module.html)