# electron的two package.json structure的依赖管理
管理dependecies
1. 分离app和electron的代码，用两个package.json管理依赖
2. 这里的依赖都是指dependecies，所有的devDependencies都只是生产依赖
2. app的依赖都是开发依赖，需要打包到代码中
4. electron的依赖都是生产依赖，不需要带包到代码中
## webpack externals
防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。

支持以下语法
1. string：将在全局检索
```js
module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
};
```
2. array：转化为父子关系，bundle引用子集

# bug：网页在electron窗口中显示“require is not defined”
在打包配置中添加`target: "electron-renderer"`，webpack会把页面视作集成在`node`环境中，自然就不会编译`require`（因为node本身就是commonjs环境）

问题大多出在环境配置上
1. electron@5的版本貌似是有问题的，也有可能是升级electron@5之后node的版本太低导致的，待确定`@gya-todos`