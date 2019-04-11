## 1. fetch API

## 2. stream API

## 3. BUG & solution
### fetch api response的body是一个reableStream格式的数据，无法直接获取返回的内容

```js
// response的格式
response = {
  status: 200,
  url: 'http://...',
  headers: {},
  body: new ReadableStream(),
}
```

由于response响应主体不能被多次使用，所以在获取response中数据需要使用副本，使用`clone`函数
```js
fetch(url, options)
  .then(response => {
    // @gya-20190402:如果token失效，跳转到登录页
    response.clone().json().then(data => {
      if (data && (data.code === 302 || data.code ===405)) {
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        console.log('response', data);
      }
    });
    return response;
  })
  .then(response => ...);
```
todo：需要更详细的理解