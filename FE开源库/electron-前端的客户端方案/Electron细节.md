# 可拖拽
- 样式中设置: `-webkit-app-region: drag`
- 排除拖拽区域中不可拖拽的部分区域：`-webkit-app-region: no-drag`

注意：可拖拽区域的内需要交互的部分，必须定义`-webkit-app-region: no-drag`，否则不可交互，例如点击无效

# global变量
1. 主线程：可以定义新的key，可以修改数据
2. 渲染线程：只能修改已存在key的数据
3. 总结：现在主线程定义key，然后在各线程间共享和修改
# 进程通信

## 注意
1. 通过事件(channel)发送异步消息到主进程，可以携带任意参数。 在内部，参数会被序列化为 JSON，因此参数`对象上的函数和原型链`不会被发送。主进程可以使用 ipcMain 监听事件(channel) .

## 无窗口界面
在创建`BrowserWindow`的options中添加`frame: false`即可

注意：不要添加`titleBarStyle: hidden`，会覆盖frame选项，添加`红绿灯`
