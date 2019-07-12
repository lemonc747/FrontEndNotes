### QA

1. immutable

2. smart组件和dumb组件

dumb父组件不能引入smart子组件，因为

3. redux和react-redux包的区别



### react-redux的内置性能优化
redux会对 mapStateToProps 和 mapDispatchToProps 生成后传入 connect 的 props 对象进行浅层的判等检查, 参见
[redux渲染的问题](https://cn.redux.js.org/docs/faq/ReactRedux.html)。


### immutable
#### 优点
Immutable.js 的基本原则是对于不变的对象返回相同的引用，而对于变化的对象，创建新数据并返回新的引用;

1. 不可变数据既能保证渲染，又能避免重复渲染
由于redux的combinedReducers和connet都会对state进行浅对比，假设一个Immutable数据
```js
const temp1 = Immutable.Map({ a: 1, b: { b1: 3}});
// 修改a或者b
const temp2 = Immutable.set('a', 2);
temp1 === temp2 // return false
```

修改数据的部分(a)：创建的新imuutable数据，对比原生JS，不会造成在原始数据上修改导致数据引用不变，浅对比返回true，从而没渲染的错误。

未修改的部分(b): 共享的数据，浅对比返回true，从而避免重复渲染。

2. 共享数据结构提升性能

创建的新数据时，没有改变的部分是共享的原有数据，相比深拷贝性能提升

3. 不可变数据避免数据突变导致的不可预测性

#### redux + immutable

1. 使用高阶组件来转换从 Smart 组件的 Immutable.JS props 到 Dumb 组件的 JavaScript props

https://cn.redux.js.org/docs/recipes/UsingImmutableJS.html

toJS每次都会创建新的对象，导致mapStateToProps返回的对象，浅对比永远是false，每次都会重新渲染。

但是返回`{ key: Immutable }`就不一样了，immutable数据只要没改变，浅对比永远是true，就能避免重复渲染

2. 使用redux-immutable

幸运的是，Redux 并不排斥使用 Immutable，可以自己重写 `combineReducers` 或使用 redux-immutablejs(https://zhuanlan.zhihu.com/p/20295971) 来提供支持





## state数据范式化

### QA
1. 范式化有必要吗



## 加入redux后，react组件树的渲染
### 1.connet和combineReducer浅对比

1. react框架本身，在一般情况都会执行render函数（除了componentShouldUpdate返回false），计算virtual dom，然后diff两次的dom，重绘改变的dom
2. redux自身对性能进行了优化，相当于做了简单的`componentShouldUpdate`对比
  1. redux在`mapStateToProps && mapDispatchToProps`都会浅对比，发生改变才会进行组件重绘。
  2. redux在combineReducer中。。。

### react切换tab，并保留每个tab页数据和状态的方案


## redux复杂场景

### 1.state中的list，其中的item的reducer如何组织

## 一个关于如何组织store的问题
