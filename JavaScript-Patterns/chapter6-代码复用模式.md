
## 类式继承
### 模式1-默认模式
最常用的一种模式，使用Parent()构造函数创建一个对象，将该对象赋值给Child()的原型。

缺点1：实例对象包括this下的自身属性和原型属性，我们只需要原型。因为this下的自身属性指向一个特殊的实例，不可复用。

#### 构造函数-复习
Q：属性放到：私有成员（构造函数this下）还是原型中？
- 对构造函数的一般经验法则是，对于可复用的成员添加到原型中。
#### 原型链-复习
- 当原型链上的对象存在重复属性时，切记：下游对象并不会修改上游对象属性的值，而是两个对象的值都存在且互不干扰。但是查找属性时，是从原型链下游开始查找的，先找到下游对象的属性，就给了我们一种下级对象覆盖上级对象的错觉（上下游，上下级，类比父子类，不是正式术语）；
- 函数有prototype属性而其他对象没有。
    - 参考https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
    - 遵循ECMAScript标准，someObject.[[Prototype]] 符号是用于指向 someObject的原型。从 ECMAScript 6 开始，[[Prototype]] 可以用Object.getPrototypeOf()和Object.setPrototypeOf()访问器来访问。这个等同于 JavaScript 的非标准但许多浏览器实现的属性 "\_\_proto__"。
    - 它不应该与函数(function)的func.prototype属性相混淆，func.prototype的作用是使用 new func() 创建的对象的实例的 [[Prototype]]。Object.prototype属性表示Object的原型对象。
- 原型链顶端为Object，Object的原型为null。Object.getPrototypeOf(Object.prototype) === null;//true

