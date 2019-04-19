## HtmlWebpackPlugin
html构建工具，丰富功能
- 保持index.html中入口文件名称与新构建的入口文件一致，不用手动修改
- 
```
npm install --save-dev html-webpack-plugin
```
webpack.config.js
```js
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  module.exports = {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
  };
```

## cleanWebpackPlugin
在每次构建前，清理dist生成目录
```
npm install clean-webpack-plugin --save-dev
```
webpack.config.js
```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
  module.exports = {
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],
  };
```



### 概念
### 起步
### 资源管理

### 一些常用webpack插件
HtmlWebpackPlugin：在更新了bundle时，自动帮你更新html中引用，详情查询官网，或者看看  html-webpack-template
 
clean-webpack-plugin ：每次构建前，帮你清理输出目录

我们推荐你在生产环境中使用 source map，因为 Source Maps 对于 debug 和运行基准测试(benchmark tests)非常有用
CommonsChunkPlugin

使用chunkhash时，为了在 HTML 中引用正确的文件，我们需要一些有关构建的信息。这可以使用下面这个插件，从 webpack 编译统计中提取
```
// webpack.config.js
const path = require("path");

module.exports = {
  /*...*/
  plugins: [
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "build", "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    }
  ]
};
```
或者，只需使用以下其中一个插件去导出 JSON 文件：

https://www.npmjs.com/package/webpack-manifest-plugin
https://www.npmjs.com/package/assets-webpack-plugin

http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts
在npm中引入echarts


### gulp
##### 串行方式运行任务，亦即，任务依赖,顺序执行任务
默认情况下，任务会以最大的并发数同时运行 -- 也就是说，它会不做任何等待地将所有的任务同时开起来。如果你希望创建一个有特定顺序的串行的任务链，你需要做两件事：

给它一个提示，用以告知任务在什么时候完成，
而后，再给一个提示，用以告知某任务需要依赖另一个任务的完成。
http://www.gulpjs.com.cn/docs/recipes/running-tasks-in-series/

### webpack如何构建依赖关系图