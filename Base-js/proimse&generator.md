
# generator

## 问题1：redux-saga如何在回调函数中调用yield
你不能在回调中使用yield,有两种方法可以避免这种情况：

```js
// 返回promise
function readFileWithPromise(file){
  return new Promise((resolve, reject) => {
   readFile(file, function(e){
     if (e){
      resolve('success')
     }else{
      reject('error')
     }
   })
 })
}
// 调用call方法，此时可能执行resolve或者reject，通过返回的结果判断
// 例如上例子中，我们返回了不同的结果
  let e = yield cps(readFile,file);
  if (e === 'success') {
    // ...
  } else {
    yield put({type: "UPDATE", img: e.target.result})
  }
  yield put({type: "UPDATE", img: e.target.result})
```

## 问题2：多次触发回调，例如onProress返回下载进度，如何用redux-saga处理





# Promise场景应用场景

## 1. 请求嵌套，上一个Promise的结果是下一个Promise的参数
