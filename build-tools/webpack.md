
## define
webpack是js应用程序的静态模块打包器module bundler，静态指在app运行前预编译

## 核心概念
- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

### 入口
构建依赖图的起点
```
//单个入口
module.exports = {
  entry: './path/to/my/entry/file.js'
};
//多个入口
module.exports = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```
CommonsChunkPlugin ？
### 输出
```
module.exports =  {
  output: {
    filename: '输出文件的文件名',
    path: '输出目录的绝对路径'
  }
};
```
如果创建多个chunk（例如多个入口，或CommonsChunkPlugin这样的插件），应该使用`占位符`以区分。
```
fileName: [name].js
```