# references
1. https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

# 简介
在每次的props更新时触发。从props中计算中衍生的state值，

此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。例如，实现 <Transition> 组件可能很方便，该组件会比较当前组件与下一组件，以决定针对哪些组件进行转场动画。

# 可能出现的问题
问题的原因的在于props和state的混合，且相互关联的关系
1. 可能导致内部状态的丢失

# 两种可替代的方案
## 1. 完全受控组件
将内部的state移动到父级的props，变成一个纯组件

## 2. 完全非受控组件，并带有`key`属性
key属性是react特有的属性，当一个组件的key改变时，react会创建一个新的实例，而不是更新当前实例
```js
<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
```
