# antd-pro采坑记

## fetch无法终止请求，在accessToken失效后错误
问题描述：accessToken失效时，我们通过`request.js`中的统一接口拦截并跳转到登录页，以重新获取token。但是`const response = yield call();`请求并没有终止，其中response.data的值为`无效的accessToken`字符串，而不是我们想要的数据，并且后续的步骤继续执行，导致`state.namespce.list = undefined`,从而导致渲染报错。

简单来说，我们虽然拦截并跳转到登录页，但请求后续的步骤并没有中断，空数据可能导致异常。

解决方案：https://github.com/dvajs/dva/issues/1778，https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController/AbortController。采用`AbortController`API

这种解决方案并没有用。依然没有中止`const response = yield call();`，此时`response = undefined`，所以需要检查response的值。这和检查检查`response.data.list`没有本质的区别
``` js
  *fetchServerSort({ payload }, { call, put }) {
    const response = yield call(fetchServerSort, payload);
    // console.log('fetch-sort-response', response);
    yield put({
      type: 'saveServerSort',
      payload: response.data,
    });
  },

  // 情况1：response正常
  response = { data: { list: [], pageSize: 10, ... }};
  // 情况2：由于fetch中止，response返回为空
  response = undefined;

  // 此时：payload: response.data, 报错... data of undefined
  // 但是：报错会导致执行中止，并且也跳转到了登陆页
  // 总之：不用在每个yield call中单独操作，先就这样吧
  // todo：等待更好的解决方案
```

## alert提示信息
提示信息要在异步请求操作结束后，展示成功或失败信息

解决方案：在model js中直接调用`alert, message, notification`，

异步请求结果状态判断：通过`response.code`的值判断，也就是说不能通过`HTTP.STATUS`的值判断，不能做统一的处理，因为提示消息有差异性，只能在每个请求中单独处理