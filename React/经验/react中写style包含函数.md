# react中写style，style中包含函数

例如react 中写transform，复合属性值写法 用【】包裹复合属性，其实就是js类的对象写法

```js
<Image style={{height: imageHeight * zoom, transform: [`rotate(${rotate * 90}deg)`]}} />
```