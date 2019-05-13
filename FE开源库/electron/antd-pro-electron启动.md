## antd-pro用electron启动

我使用的是antd-pro，无http服务启动成功了，我测试的结果如下：
1. 可以不用配置webpack.target（如果要配置，一样的，在antd-pro中config/plugin.config.js添加config.target('electron-renderer');）
2. 需要配置hashhistory，因为没有后端路由跳转，只能识别静态文件。在config.config.js中添加history: 'hash',
3. 配置静态文件路径，在config/config.js中配置publicPath: './'。默认是绝对路径'/'。

新手尝试不知道这种方式对不对，如果有更好的解决方案也@一下我啊，谢谢0 0

