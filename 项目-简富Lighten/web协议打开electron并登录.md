# web协议打开并登录

## 启动时存在的场景

登录情况
1. 尚未登录：登录
2. 已登录，且同一用户：不做处理
3. 已登录，且不同用户：登出，然后登录
3. 已登录，但登录失效：登出，然后登录

渲染进程
1. 启动程序，进入项目空间页面，查询接口，报401，提示重新登录，并返回登录页面
2. 启动程序，进入项目空间页面，查询接口，正常

主进程任务队列
1. 启动程序，初始化队列，查询接口，正常
2. 启动程序，初始化队列，查询接口，报401，提示重新登录，并返回登录页面

(改动之前)初始化动作：包括初启动，登录，切换
1. 渲染进程，使用pubsub订阅和发布‘loginSuccess’消息
    1. taskrecordservice，collectionservice：在layout中直接执行（401后会中止，等待下一次loginsuccess）
    2. taskrecordservice，collectionservice：在loginsuccess后重新执行
    3. collectionservice: 在primaryLayout销毁时（也就是切到登录页面时）中止
2. 埋点
    1. xlog用户信息初始化：在layout中直接setUUID
    2. xlog用户信息初始化：在loginsuccess后重新setUUID
    3. Report.login：在loginsuccess后更新用户信息
2. 主进程，上传，下载，底稿导出队列，用户管理等
    1. app.ready后：直接注册loginsuccess监听
    2. app.ready后：直接执行任务（401后会中止，等待下一次loginsuccess）
    3. 401后：中止任务
    3. loginsuccess后：切换用户和队列，重新执行

## 方案2： 添加中转空白页？在处理所有初始化之前检测
思路：整理登录需要初始化的任务，集中处理。
1. 思路：添加一个最优先的空白页面，这个页面的加载就表示渲染进程已经准备完成。在此之前不会直接启动任务队列（但会注册监听）
2. 在空白页加载之后，主进程与渲染进程交流用户信息，检测token，（这个也能解决登录失效后，提示两次登录失败的问题，以及token频繁失效的问题？）
3. 最终：所有任务队列的执行与取消：都放到(主IPC，渲染pubsub)‘loginSuccess’消息（多次触发逻辑保持一致）

### 1.启动时
1. 初始化：主进程，渲染进程注册监听
2. render2main: 空白首页ipc发送通知，请求启动的参数
3. main2render: 主进程收到后，向渲染进程发送用户信息(这两步在electron升级后，可以使用involve的api一步实现)
4. 启动无参数：校验当前用户，401则到登录界面
5. 启动时有参数：
    1. 渲染进程：替换store中的用户信息
    2. 主进程&渲染进程触发loginSuccess：发送(主IPC，渲染pubsub)‘loginSuccess’消息，（清除当前用户任务并）启动所有任务
6. 如果参数的用户信息无效：触发401到登录界面

### 2. 已登录唤醒
【启动时-3】main2render开始

### 3. 切换用户
与【已登录唤醒】一致，因为同样时触发loginSuccess

### 缺点
1. 查询项目列表的接口，从项目页面转移到了空白页，耗时相同，但观感有细微差别 =》废弃，不适用缓存
2. 添加一个接口判断localstorage的token是否有效，启动耗时增加约200s

### 重要改动点
1. 主进程中没有使用文件缓存用户信息：文件缓存用户信息使用在2个场景，1是启动程序后，假设用户缓存token有效，直接初始化队列，2是登录成功后切换用户；
改动之后：1启动程序后，不会直接初始化队列，而是会等渲染进程触发loginsuccess消息，2登录成功后也是一样。2个场景都会在loginsuccess消息收到最新有效的user，
所以不再需要config.ini文件缓存

### bug-todo
1. 切换用户，此时若项目列表数据在有效期内，进入时就不会更新：添加用户判断 =》取消缓存
2. 右上角用户名称没有改变：header组件没有更新，通过更新routelist =>已修复
3. 登录界面的用户名和密码：在loginsuccesscallback中添加判断和处理 =>已修复

## 使用
- 支持：协议启动，协议唤醒，协议切换用户
- 参数有4个，同ione-pc和ione-ui中localstorage中的用户信息，userid,username, ioneauthorization, userDeptList
- 链接
    1. lighten:
    2. lighten:?userid=007441&username=....


## 方案1：在现在的流程上打补丁？各个任务的初始化动作太分散，不好处理

1. electron主进程启动A
2. 接收到参数中的用户信息。但渲染进程尚未加载，先缓存参数
3. 渲染进程启动，正常走流程：加载页面，调用接口（可能报401）
4. 向主进程发送消息查询是否有传入参数
5. 主进程向渲染进程发送参数用户信息
6. 根据【启动时存在的场景】


### 切换用户，清理数据。todos，处理不清晰的地方
1. header.js：查询消息的定时器在mount-unmount注册和注销，而header再primarylayout中使用，切换到login界面时会触发销毁unmount，登录后mount
2. sider.js：历史路由routerlist，同【1】
3. sider.js：退出登录后，清理localstorage中的user，清理store中的某个值
4. 整个应用store的清理
5. pubsub本地归集的订阅在layout，原稿，协作，底稿中，订阅了4次

### 清理数据分类
1. state：在无缝切换时，布局（sider，header）中的state可能残留，目前就有unreadCount,routerList。就算现在没有，也可能在后续的开发中增加
2. store：之前没有做任何清理（登出时有一个状态值修改），。在umi升级后，添加重置store默认值的方法
3. 

### 怎么改？
理论： 不使用引入文件的方式执行代码，这种方式会导致逻辑不清晰，文件的引入也可能随打包方式的改动而改变（例如动态引入和全量引入）
实践： 不在文件最外层注册订阅pubsub.subcribe


Q. 在primaryLayout生命周期中处理的数据，还是在loginsuccess回调中处理？