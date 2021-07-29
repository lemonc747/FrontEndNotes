继承与原型链

### tips
- 原型链，最上层的prototype是Object的对象，Object对象的prototype是null
- 原型链上的对象，相同属性并不会覆盖。只是属性从下游往上游取，下游属性优先级更高而已

#### object.prototype与function.prototype
object的prototype是不能直接点运算符取出，之前有非标准实现\__proto__,ES6可以用Object.getPrototypeOf()和Object.setPrototypeOf()存取

function的Prototype，是使用new Func()构造函数时，设置新创建对象的prototype。