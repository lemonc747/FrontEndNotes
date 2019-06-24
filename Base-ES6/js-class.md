## ES5中类和继承的实现

### 关键概念
- 原型，原型链，prototype属性
- constructor
- instanceof

```
<!-- lang: js -->
function F(){};
var foo = new F();
alert(foo.constructor.prototype == F.prototype);
```
constructor属性不是对象自己的属性，而是顺着原型链向上从原型对象中获取的。这个属性指向的是这个原型对象所对应的构造函数。而构造函数的prototype属性指向了原型对象, 所以这样我们就可以间接得到了。

### 基础类型
分两类？基础类型，对象Object

### 原型是个什么东西？
### 对象的原型，与函数的prototype属性
对象的原型对象，并不是对象的属性，是无法直接获取的。
``` javascript
//获取原型对象
Object.getPrototypeOf(object);
//非标准的属性"__proto__"，不建议使用
object.__proto__;
```
