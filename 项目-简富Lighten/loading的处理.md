
## 文件操作

按现象分类
- 直接变更型：数据直接变更
    1. 原理：数据的改变是可预测的
    1. 包括：锁定/解除锁定，添加/删除快捷访问，重命名
    3. 异步loading：需要
    4. 刷新filelist：不需要
- 中断结束型：执行一个同步操作，结束，等待后续操作
    1. 原理：一个同步操作即结束，真正的异步操作在后续的操作
    2. 包括：
        1. 开始重命名：打开一个输入框，结束。后续输入新名称，点确认执行操作
        2. 
    1. 打开一个弹窗：删除
- 等待通知消息类：后台执行异步操作，并等待通知，收到通知后更新
    1. 原理：通过其他线程或者任务链执行，完成后通知




从异步操作上看
1. 异步请求：异步请求所消耗的时间，是需要阻断用户操作的，也就是需要加loading。
    1. 加在table上
    2. 加在弹窗上
    3. 不可见
2. 刷新列表
    1. 不刷新
    2. 刷新，且loading
    3. 刷新，后台不loading
3. 刷新目录树：
    1. 刷新，后台不loading

配置 refreshConfig
1. mutate? = undefined: FileModel====存在时直接变更
2. filelist? = undefined: showLoading |hiddenLoading
3. catalog? = undefined: showLoading |hiddenLoading