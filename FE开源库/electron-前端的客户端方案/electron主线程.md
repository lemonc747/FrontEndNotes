# 启动
## 通过协议启动
1. 注册协议

区分以下几种场景
2. 第一实例：通过`process.argv`获取url和参数数据
```js
app.on('ready', () => {
  // 遍历process.argv，找到协议参数
  // 生产环境，通常为第三个参数，即process.argv[2]
});
```
3. 第二实例-windows：通过`seconde-instance`事件获取url和参数
4. 第二实例-macOS：通过`open-url`事件获取url和参数

10. 完整代码
```js
// 定义协议
const appProtocol = 'myApp';
// 注意：开发环境的处理没有做
// 注册协议
app.setAsDefaultProtocolClient(appProtocol, process.execPath, ['--']);

// windows-第二实例
// 参数是一个数组，只有一个item就是启动的url
app.on('second-instance', (e, argv) => {

});

// macOS-第二实例
// 参数是字符串，就是启动的url
// macOS还需要测试：open-url和ready事件是否会同时触发
app.on('open-rul', (e, url) => {
  if (app.isReady()) {

  } else {

  }
});

app.on('ready', () => {
  // 判断是否是协议启动，如果是，获取url和参数做处理，不过不是，正常启动
});
```

## 单例锁
1. 第一实例：启动，添加第二实例的监听事件
2. 第二实例：在监听事件中处理，常规操作是唤起界面
```js

```