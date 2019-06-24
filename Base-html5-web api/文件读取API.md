
## FileReader API
FileReader允许WEB程序读取异步存储在用户计算机上的文件（或原始数据缓冲），使用[Blob][Blob]或[File][File]指定文件和数据

》构造函数
```js
const fileReader = new FileReader();
```

### 》属性
- error：只读，`DOMException`，表示在读取文件时发生了错误
- readyState：只读
  - FileReader.EMPTY: 0，还没有加载任何数据
  - FileReader.LOADING: 1，正在加载
  - FileReader.DONE: 2，加载完成
- result：只读，文件的内容，在`FileReader.DONE`时才有效

### 》事件处理
- onabort：读取操作被中断时触发
- onerror：读取操作发生错误
- onload：读取完成，读取成功
- onloadstart：读取操作开始
- onloadend：读取结束，成功或失败都触发
- onprogress：读取过程中

### 》方法
#### abort
中断读取，只能对`LOADING`中的reader使用否则抛出异常，操作后`readyState`属性为`DONE`
#### readAsText(blob[, encoding])
将`File`或`Blob`按照指定的编码转换成字符串形式，这个方法是异步的，要通过`onload`或`onloadend`事件中获取result

参数
- blob：Blob或者File类型
- encoding：编码，默认utf-8
#### readAsDataURL(blob)
result属性：一个base64编码的data:URL格式字符串
### readAsArrayBuffer(blob)
result属性：ArrayBuffer对象
## Blob接口
Blob表示一个不可变的，原始数据类型的类文件对象

》 构造函数
`Blob( blobParts[, options])`
- blobParts: 数组，创建的Blob对象内容由此数组串联组成
- options：配置项
  - type：blobParts中内容的MINE类型
  - endings：指定结束符`\n`如何写入<br>
    默认`transparent`，表示blob中结束符保持不变；
    `native`，表示结束符会随着宿主环境文件系统而变更；

》属性
- size：只读，Blob对象包含的数据的字节大小
- type：只读，Blob对象包含数据的MINE类型，如果类型未知，则该字段为空

》方法
`Blob.slice([start,[ end ,[contentType]]])`
返回一个新的Blob对象，内容为截取指定范围的数据
- start：起始位置，构造数组中的下标
- end：结束位置；`undefined`表示一直到结束；负数表示从结尾开始结算偏移量
- contentType：给新的Blob对象新的MINE类型

》应用场景，详情查看[细说web api中的Blob类型][Blob detail]
- File分片上传
- Blob URL

》🌰：使用Blog创建一个类型化数组的URL
```js
// 传入一个合适的MINE类型
const blob = new Blob(["11111111"], { type: 'application/octet-binary' });
// 
const url = URL.createObjectURL(blob);
// 会产生一个类似blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
// 你可以像使用一个普通URL那样使用它，比如用在img.src上。
```



---
## File接口
File接口提供文件信息，并允许js访问其内容

》来源
  -  \<input>元素上选择文件后返回的 FileList 对象
  - 来自由拖放操作生成的 DataTransfer 对象
  - 来自 HTMLCanvasElement 上的 mozGetAsFile() API

》接口
File继承了Blob接口的属性，这里不再列出，File是Blob的特例
- name：只读，文件的名称
- type：只读，文件的类型
- size：只读，文件的size
》方法
File 接口没有定义任何方法，但是它从 Blob 接口继承了以下方法：

- Blob.slice([start[, end[, contentType]]])<br>
返回一个新的 Blob 对象，它包含有源 Blob 对象中指定范围内的数据。

## 补充
### URL.createObjectURL
创建一个表示给定的`File`或`Blob`对象的字符串URL，这个URL的生命周期与创建他的窗口的document绑定

## refrences
- [FileReader][MDN-FileReader]

[MDN-FileReader]:<https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications> "FileReader"
[Blob]: https://developer.mozilla.org/zh-CN/docs/Web/API/Blob "Blob"
[File]: https://developer.mozilla.org/zh-CN/docs/Web/API/File "File"
[Blob detail]: https://www.jianshu.com/p/4d014a45aaf7 "细说Blob"