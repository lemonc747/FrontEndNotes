```markdown
-  webpack基础1.md
-  @description 参照API文档，最常用的配置记录
-  @author @gya747
-  @created Tue Jan 29 2019 09:34:30 GMT+0800 (CST)
-  @email gya747283747@126.com
-  @github https://github.com/lemonc747
-  @lastModifier @gya747
-  @lastModifiedDate Tue Jan 29 2019 09:34:39 GMT+0800 (CST)
```

# Config

## mode
包括三种模式，`production`,`development`,`none`，每种模式有不同的优化方案。
```js
  mode: "production", // "production" | "development" | "none"
  mode: "production", // enable many optimizations for production builds
  mode: "development", // enabled useful tools for development
  mode: "none", // no defaults
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  // 选择mode可以告诉webpack使用对应的内置优化方案
```

## context
基础路径，绝对路径，用于解析`entry`和`loader`.
- __dirname: 
```js
const path = require('path');
module.exports = {
  //...
  context: path.resolve(__dirname, 'app')
};
```

## entry
webpack build入口
```js
string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })
```
- 如果是一个数组，则其中每项都会执行

## output
输出配置
### output.filename
此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。

- entry为单项字符串：output.filename为静态字符串，表示输出文件名
- entry多个入口：通过以下`占位符`配置

| 模板 |  描述  |
| --- | --- |
| [hash]  | 模块标识符(module identifier)的 hash  |
| [chunkhash] | chunk 内容的 hash |
| [name] |  模块名称  |
| [id] | 模块标识符(module identifier) |
| [query] |模块的 query，例如，文件名 ? 后面的字符串|

### output.path
