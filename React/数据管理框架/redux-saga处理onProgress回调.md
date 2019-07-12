
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
https://github.com/dvajs/dva/issues/322
https://stackoverflow.com/questions/40685288/redux-saga-upload-file-progress-event

上面是使用redux-saga的方案

eventChannel是什么

现在的解决方案，直接在组件中处理异步，这样不是最终的方案
```js

const sendFileMessagePromise = (params, onProgress) => {
  const promise = new Promise((resolve, reject) => {
    const { body, sender, conversationId, conversationType = 0 } = params;
    const fileMsgBody = new easemob.EMFileMessageBody(body);
    const sendMessage = easemob.createSendMessage(sender, conversationId, fileMsgBody);
    sendMessage.setChatType(conversationType);
    const emCallback = new easemob.EMCallback();
    emCallback.onSuccess(() => {
      resolve('success')
      // console.log('onsuccess', test);
    });
    emCallback.onFail(error => {
      reject(error)
      // console.log('onerror', error);
    });
    emCallback.onProgress(progress => {
      if (onProgress) {
        onProgress(progress);
      }
      // resolve(progress)
      // console.log('onProgress', progress);
    });
    sendMessage.setCallback(emCallback);
    chatManager.sendMessage(sendMessage);
    // return sendMessage;
  });
  return promise;
};
```