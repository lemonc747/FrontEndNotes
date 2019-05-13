# 1. import & export

### import单个

### import多个

### export单个

### export多个

采用`export { a, b, c }`的格式可以导出多个模块，特别注意：这里的中括号`{}`不是对象字面量表示法，而是export特殊语法。
```js
// 正确做法：导出多个模块
const a = 1;
const b = 2;
const c = 3;
export {
  a,
  b,
  c,
};
// 错误做法：导出对象，语法错误
export {
  a: 1,
  b: 2,
  c: 3,
};

```

# 2. 解构的应用

解构赋值的好处有很多，比如
- 两个值的交换
- 函数参数默认值
- 函数返回值
- 正则匹配的返回值
- 快速处理 JSON 数据
- 遍历Map结构
ES6 的解构赋值给 JS 的书写带来了很大的便利性，同时也提高了代码的可读性。但是也需要注意一些问题，避免适得其反。
- 关于圆括号的问题，欢迎翻看阮一峰老师的博客
- 解构的嵌套尽量不要太深
- 函数有多个返回值时，尽量使用对象解构而不用数组解构，避免出现顺序对应问题
- 已声明过的变量不能用于解构

### 解构的实际应用
// http://www.infoq.com/cn/articles/es6-in-depth-destructuring
### 1. 函数参数定义
作为开发者，我们需要实现设计良好的API，通常的做法是为函数为函数设计一个对象作为参数，然后将不同的实际参数作为对象属性，以避免让API使用者记住 多个参数的使用顺序。
我们可以使用解构特性来避免这种问题，当我们想要引用它的其中一个属性时，大可不必反复使用这种单一参数对象。
```js
  // es5
  function removeBreakpoint(options) {
    var url = options.url;
    var line = options.line;
    var colum = options.column;
    // ...
  }
  // es6 destructuring
  function removeBreakpoint({ url, line, column }){
    // ...
  }
```

### 2.配置对象参数
我们同样可以给需要解构的对象属性赋予默认值。
当我们构造一个提供配置的对象，并且需要这个对象的属性携带默认值时，解构特性就派上用场了。
```js
  jQuery.ajax = function (url, {
    async = true,
    beforeSend = noop,
    cache = true,
    complete = noop,
    crossDomain = false,
    global = true,
    // ... 更多配置
  }) {
    // ... do stuff
  };
```
如此一来，我们可以避免对配置对象的每个属性都重复var foo = config.foo || theDefaultFoo;这样的操作。

### 3.与ES6迭代器协议协同使用

### 4.多重返回值
JavaScript语言中尚未整合多重返回值的特性，但是无须多此一举，因为你自己就可以返回一个数组并将结果解构：
```js
  function returnMultipleValues() {
    return [1, 2];
  }
  var [foo, bar] = returnMultipleValues();
```


# 3. 函数默认参数
在函数参数为`undefined`时，可以使用默认值。注意：仅`undefined`使用默认值，传入其他假值则使用对应假值（例如`false, 0, null`则为对应值）。
```js
function test(a =1) {
  console.log(a);
}
test(); // 1
test(undefined); // 1
test(null); // null
```
在函数被调用时，参数默认值会被解析，每次函数调用时都会创建一个新的参数对象。
```js
function append(value, array = []) {
  array.push(value);
  return array;
}

append(1); //[1]
append(2); //[2], not [1, 2]
```
参数为解构函数，同样可以设置默认值
```js
function f([x, y] = [1, 2], {z: z} = {z: 3}) { 
  return x + y + z; 
}

f(); // 6
// 例2
function test({ x, y = 5}) {
  console.log(x, y);
}
test({ 1 }) // 1 5
```
区分：函数定义，函数调用，都可以赋予默认值
```js
  function test(x = 1) {
    console.log(x);
  }
  test(y = 3) // 3
```


# 4.静态属性和方法
```js
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
//Foo类定义了一个静态属性prop,只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
```

# 5.@注解
http://es6.ruanyifeng.com/#docs/decorator