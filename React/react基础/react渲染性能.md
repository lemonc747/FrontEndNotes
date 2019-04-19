### 渲染过程

1. 每一次setState都会重新触发视图更新的生命周期：》》》》。
2. 然后对比virtual dom，决定是否更新真实的DOM。
3. componentshold。。。可以阻止整个渲染过程，进一步优化运算。

分析可优化点
#### 1.react框架的virtual dom技术减少dom渲染。
react将dom转化为对应的object，对比object，如果没有改变，则不需要重新渲染对应的dom。
由于dom的渲染是页面渲染中最耗时和性能的，所以虚拟dom技术可以优化前端性能
#### 2.componentshouldupdate可以优化js计算过程
virtural dom减少dom渲染，但不能减少js的性能消耗。
componentshouldupdate可以在组件更新前判断是否需要重绘，在组件数据没有改变的情况下，可以阻断整个渲染过程。
特别对于渲染过程（render函数中）需要大量JS运算的组件，给定componentshouldupdate函数最好
#### 3.数组的key值优化
通过key值定位重绘前后子元素的对应，可以减少数组排序变动的情况下，若数组子元素没变，则避免重复渲染。
#### todo：进一步深入virtual dom技术
确认render函数在什么情况下运行，什么情况下不运行

栗子
```js
class parentComp extends Component{
  // ...

  comonentDidMount() {
    setTimeout(() => {
      this.updateChildA();
    }, 3000);
  }

  updateChildA() {
    this.setState({
      dataA: dataA+1,
    })
  }

  render() {
    const { dataA, dataB } = this.state;
    return (
      <ChildA data={dataA} />
      <ChildB data={dataB} />
    )
  }
}

class ChildA extends Component {
  // ...
  render() {
    return <div>{this.props.dataA}</div> //.....
  }
}
class ChildB extends Component {
  // ...
  render() {
    console.log('哈哈，即使只更新了dataA，ChildB的render也会触发');
    return <div>{this.props.dataB}</div> //.....
  }
}

```
结论：
- 当parent的updateChildA触发时，虽然只更新了dataA，也会触发childB的render函数。
- 但是并不会触发ChildB真实的DOM更新，因为对比virtual dom没有改变
- 

### shouldComponentUpdate进一步优化渲染性能
先看下视图更新的生命周期

然后看一下官方的栗子说明
![shouldComponentUpdate](../assets/react-shouldComponentUpdate-example1.png)
这是一个组件的子树。对其中每个组件来说，SCU表明了shouldComponentUpdate的返回内容，vDOMEq表明了待渲染的React元素与原始元素是否相等，最后，圆圈的颜色表明这个组件是否需要重新渲染。

由于以C2为根的子树的shouldComponentUpdate返回了false，React不会试图渲染C2，甚至不会在C4和C5上调用shouldComponentUpdate。

对C1和C3来说，shouldComponentUpdate返回了true，因此React会深入到分支中并检查它们。C6的shouldComponentUpdate返回了true，由于待渲染的元素与原始元素并不相等，React会更新这个DOM节点。

最后一个有趣的情况是C8，React需要渲染这个组件，但是由于组件元素返回值与原元素相等，因此它并没有更新这个DOM节点。

注意React只需更新C6，因为它是不可避免的。对C8来说，它通过比较待渲染元素与原始元素避免了渲染，对C2的子树和C7，它们甚至都没有执行比较，因为我们设置了shouldComponentUpdate为false，render没有被调用。

### 组件更新的生命周期

- componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()
- static getDerivedStateFromProps()
- shouldComponentUpdate()
- componentWillUpdate() / UNSAFE_componentWillUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()



### React.PureComponent也能做类似的优化
大部分情况下，你可以使用React.PureComponent而不必写你自己的shouldComponentUpdate，它只做一个浅比较。但是由于浅比较会忽略属性或状态突变的情况，此时你不能使用它。

### Redux的性能优化
实现容器组件

现在来创建一些容器组件把这些展示组件和 Redux 关联起来。技术上讲，容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。（这样你就不必为了性能而手动实现 React 性能优化建议 中的 shouldComponentUpdate 方法。