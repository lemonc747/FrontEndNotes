### defaultProps：是否支持设置嵌套属性的默认值
结论：应该将每个字段设置为`this.props`的直接子属性

```js
Comp.defaultProps = {
  data: {
    users: [],
    depts: [],
  }
}
```
这里的users和depts会生效吗？不会，这里this.props只会检查data有没有数据（请进一步验证）



### 如何用object简洁为jsx生成props
不能

### 在父级组件setState重绘，且子级组件prop数据没有更新时，子组件会重绘吗



# 抉择：state？props？私有变量？

## state还是私有变量？
两者都是组件内部数据，只与自己有关。

优劣势
1. state的更新可以触发视图的重新渲染，基于react内部实现
2. 私有变量的更新保证是同步的

所以
1. 数据涉及到视图，选择state，否则直接私有变量即可