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