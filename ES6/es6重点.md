## 1. import & export

### import单个

### import多个

### export单个

### export多个

采用`export { a, b, c }`的格式可以导出多个模块，特别注意：这里的中括号`{}`不是表示一个对象，而是export特殊语法。
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

## 2. 函数默认参数
允许在函数参数没有值或为`undefined`时，使用默认值。注意：仅传入`undefined`使用默认值，传入其他假值则使用对应假值（例如`false, 0, null`则为对应值）。
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
有默认值的解构参数
```js
function f([x, y] = [1, 2], {z: z} = {z: 3}) { 
  return x + y + z; 
}

f(); // 6
```