# 关于react框架本身的易错点

## 1. setState是异步的
```js
// setState和handleFetch都是异步操作，
this.setState({ [businessSign]: checkedValue });
this.handleFetch();
// 采用setState回调的方法
this.setState(() => ({ [businessSign]: checkedValue }), () => this.handleFetch());
```

## react版的管理员平台，examine审核页面为例，一次请求为什么触发了那么多次render？查看console