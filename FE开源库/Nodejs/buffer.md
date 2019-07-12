# 纯nodejs下文件的处理

# nodejs+browser文件处理（例如electron）

## 1. Buffer 与 ArrayBuffer
nodejs与浏览器环境下，文件的交互，重点在文件数据格式的转换。

### nodejs-Buffer
构建Buffer的方法：

使用八位字节数组 array 分配一个新的 Buffer
```js
const buffer = Buffer.from(array)

// 创建一个包含字符串 'buffer' 的 UTF-8 字节的新 Buffer。
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
```

使用ArrayBuffer创建：
1. 创建 ArrayBuffer 的视图，但不会拷贝底层内存。 例如，当传入 TypedArray 的 .buffer 属性的引用时，新建的 Buffer 会与 TypedArray 共享同一内存。
```js
Buffer.from(arrayBuffer[, byteOffset[, length]])


```

## 案例1：浏览器的blob下载为文件
```js
const reader = new FileReader();
// 将【浏览器环境的file对象】或者【blob】读取为ArrayBuffer
reader.readAsArrayBufer(blob);
reader.onload = () => {
  // 将ArrayBuffer转换为nodejs环境下的buffer
  const buffer = Buffer.from(reader.result);
  // 写入文件
  fs.writeFile('test/time.mp4', buffer, {}, (err, res) => {
    if (err) {
      console.log('record voice error', err);
    }
    // ...
  });
};

```


## 1. blob数据下载为文件


# 纯browser文件处理