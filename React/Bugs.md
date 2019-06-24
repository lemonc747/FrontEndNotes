# redux-saga 报错：index.js:1 uncaught at check call: argument [object Promise] is not a function

```js
  const users = yield call(Promise.all(members.map(hxId => getUser(hxId))), id);
  // 其中getUser是一个异步函数
```
原因很简单，call的第一个参数应该是函数，第二个参数应该是这个函数的参数。所以，可以简单的改成
```js
  const users = yield call((members) => Promise.all(members.map(hxId => getUser(hxId))), members);
```