# antd-pro框架
基于umijs,dva,antd,react等框架
## node-loader未生效
>参考[svg文件被转换成base64，无法在component中使用](https://github.com/umijs/umi/issues/1082)

问题描述：项目中引入`.node`的c++插件时，得到的结果是base64的

原因：umijs有默认的loader加载这些文件

解决：在config.js和plugin.config.js中配置(由于antd-pro中组合了这两个配置文件)
```js
export default {
  // 添加 url-loader 的 exclude
  urlLoaderExcludes: [/.node$/],
  // 添加 loader
  chainWebpack(config) {
    config.module
    .rule('node-loader')
    .test(/\.node$/)
    .use('node-loader')
    .loader('node-loader')
  },
}
```

