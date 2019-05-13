### 1
index.js:2178 Warning: React does not recognize the `targetId` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `targetid` instead. If you accidentally passed it from a parent component, remove it from the DOM element.

现象：为dom添加了自定义属性targetId，然后通过e.target.targetId获取时报警告

解释：自定义属性会转换为全小写，可以获取`e.target.targetid`;


### 记一次“在mount component之前调用setState”的bug
index.js:2178 Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in BlogReply (at BlogBottom.js:146)

解释：大多数情况下异步获取初始化数据导致这个bug。因为异步获取数据后，通常我们会调用`setState`更新视图，但如果我们是在`constructor`中这么做，有可能组件还没有`mount`完成。所以初始化的异步操作我们会放在`componentDidMount`中

例外：但是此次bug却是另外的原因
```js
  // child component
  onReply() {
    // callback in parent component
    const { onReply } = this.props;
    if (onReply) {
      onReply();
    }
    this.setState({ flag: true});
  }
```
在父组件`onReply`中我们也`setState`更新了父级视图，不巧的是此次更新我们判断去掉了`child`组件
``` js
  onReply() {
    this.setState({ show: false});
  }

  render() {
    return (
      ...
      { show ? <Child .../> : null}
    );
  }
```
此时回头看`child`组件，`onReply`最后一行代码`this.setState({ flag: true});`调用的时候，`child`组件已经被销毁了，因此处于`unmount`状态

解决方案：在父级组件的回调后，禁止执行任何方法。而且也是没有必要的，所有的更新父级应该都能控制。

### @mention的时候替换出现的bug
    // fixed-20181106: 当用户，部门，话题name存在包含关系（‘@政治部’是‘@政治部人事处’的子集），单纯的replace就会出错
    // fixed-20181106: 解决方案：由特殊意义的标志文本必须闭合，才能保证替换时的准确性



### react引入png图片报错
```js
import test2 from '../../../asset/bgCombo.png';
// can't read property 'context' of undefined
```
1. 似乎只有png会报错
2. 



### react-router：You should not use <Switch> outside a <Router>



### react-immutable: reducer returned undefined when handling @@init action
问题：reducer函数返回undefined