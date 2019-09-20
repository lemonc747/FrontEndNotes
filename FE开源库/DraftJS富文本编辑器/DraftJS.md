# 基于react的富文本编辑器

# 光标位置

# 重要
1. 当有装饰器时，装饰器组件绘制的内容长度一定要与原本内容的长度一致，否则删除键时，光标的计算会错误，会导致光标移动到最前面

## editorState对象的存储
>不要用redux等框架管理editorState

editorState对象的存储：通常是存储在组件的内部状态。后来因为切换会话需要保存草稿，转移到dva数据流中，但是通过数据流更新可能会产生延迟（导致光标一系列奇葩的bug），所以最后还是最好将editorState保存在内部state中

尝试的方案
1. 存储在`editor`所在父组件的`state`中
    1. 优点：更新及时，光标位置正确
    2. 劣势：数据无法在组件外处理
2. 存储在dva等数据流中，优劣势与1刚好相反

### 方案：存双份
1. 组件内，editorState保证数据及时更新
2. dva中，存备份editorStateBackup，用于全局内的更新
```js
const compositeDecorator = [
  {
    strategy: handleEmojiStrategy,
    component: HandleEmoji,
  },
];

// 组件内直接引用children，即原本的文本内容
const EmojiSpan = (props) => {
  const { code, className, children, decoratedText } = props;
  const index = emojiCodes.indexOf(decoratedText);
  if (index === -1) {
    return decoratedText;
  }
  // return <span className='emojiSpan' style={{ backgroundImage: `url(${emoji0})` }}>{children}</span>
  // css sprits
  return <span className='emojiSpan' style={{ backgroundImage: `url(${require(`../../../assets/face/link_face_${index}.png`)})` }}>{children}</span>
}
```

# plugins
由于引入了`draft-js-plugins-editor`，以及内部的重写，导致了一些bug
# plugin: mention
## 存在的问题
1. 上下键选择时，窗口外的列表不能随上下键滚动到视野内

## 插件重写了editorstate，导致装饰器不生效，而且重置editorstate也会导致插件失效

引入decorator的方式与`draftjs`不同
```js
// @ErangaLakmal simply pass the decorators to the draft-js-plugins-editor like this:
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
// wrong
const compositeDecorator = new CompositeDecorator([
    {
        strategy: handleStrategy,
        component: HandleSpan,
    },
    {
         strategy: hashtagStrategy,
         component: HashtagSpan,
    },
]);
// right: just pass the array to Editor
const compositeDecorator = [
    {
        strategy: handleStrategy,
        component: HandleSpan,
    },
    {
         strategy: hashtagStrategy,
         component: HashtagSpan,
    },
];
<Editor
  editorState={this.state.editorState}
  onChange={this.onChange}
  decorators={[compositeDecorator]}
  plugins={plugins}
/>
```

## 重置后丢失decorators
我们不能直接重新创建`EditorState`， 而是应该在原来的基础上修改
1. mention插件用到了
```js
// 设置新的装饰器; 错误：这里应该用push
EditorState.set(editorState, {decorator: onlyHashtags});
```


## bug3: `otherDir` must be a strong direction to be converted to HTML Direction
场景：清除或者重置时出错
```js
    let newEditorState = EditorState.set(
      editorState,
      { currentContent: contentState }
    );
```

Q: set与push的区别

## bug4: Uncaught TypeError: setEditorState is not a function
The dependency to draft-js should be "draft-js": "~0.10.5", instead of "draft-js": "^0.10.5",. The new 0.11.0 release breaks this package.


# focus聚焦
有几个要点
1. `this.refs.focus()`聚焦时不会改变光标的位置
2. this.refs在组件创建或卸载期间，是有可能为undefined的
3. focus要在`this.setState`的回调中
4. 在3的基础上将focus放到`setTimeout`中，延时为0（原理：同步与异步在不同栈）
```js
  this.setState(newState, this.focus)

  focus = () => {
    setTimeout(() => {
      this.editor && this.editor.focus()
    }, 100)
  };
```

场景：聊天输入框
1. 插入文本
  1. 表情面板插入表情：直接focus
  2. 粘贴
2. 插入图片。如截图，复制图片


由于我们将`editorState`存在了dva数据流中，导致更新的时间点不能保障，即使使用`setTimeout`异步聚焦也不能保障（延时长能稳定正确聚焦，也证明了这一点）。因为我们在更新的生命周期`componentDidUpdate`中聚焦

另外，为了正确聚焦位置，我们使用两次更新法。切换会话时会先移动光标到最后，再focus；不切换则直接聚焦
1. 切换会话时，我们将`selectionState`移动到内容最后
2. 移动之后，此时会再一次触发`componentDidUpdate`，此时我们没有调用`focus`
3. 再次更新，此时`conversationId === converId`，所有调用`this.focus`
```js
  // 更新光标位置，或者聚焦，或者both
  // 这里或许不能判断editorState, 因为它包括光标的位置，光标改变也会触发，可能造成循环和异常的光标位置
  if (editorState && es !== editorState) {
    if (conversationId !== converId) {
      console.log('moveSelectionToEnd')
      this.moveSelectionToEnd();
    } else {
      console.log('focus')
      this.focus()
    }
  }

  // 移动光标
  moveSelectionToEnd = () => {
  const { editorState, dispatch } = this.props;
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const key = blockMap.last().getKey();
  const length = blockMap.last().getLength();
  const selection = new SelectionState({
      anchorKey: key,
      anchorOffset: length,
      focusKey: key,
      focusOffset: length,
  });
  const newEditorState = EditorState.acceptSelection(editorState, selection);
  dispatch({ type: 'conversation/updateEditorState', payload: newEditorState });
  // this.focus(); // 这里不能聚焦，会导致更新错误
  };
```


# 文本

## 表情
entity+decorator

1. 替代内容的文本：之前是空格，但空格会影响到@的功能，所以我们改为任一一个特殊字符
2. 我们使用span+背景图显示表情，同时文本的color为透明的，然后我们单独设置光标的颜色可见（默认光标的颜色和文本一致）

```js
const HandleEmojiRegex = /\s/g;
const HandleEmoji = (props) => {
  const { contentState, entityKey, children, decoratedText } = props;
  console.log('HandleEmoji', props)
  if (contentState && entityKey) {
    const entity = contentState.getEntity(entityKey);
    const { data } = entity;
    const { code, src } = data || {};
    // @gya-tips: 通过span嵌套图片的方式，可以保持光标显示（如果使用span加背景图，紧跟表情的光标会消失）
    return (
      <span className='emojiSpan' title={code} style={{ backgroundImage: `url(${src})` }}>
        <img style={{ height: '16px', width: '16px' }} alt='' src={src} />
        {children}
      </span>);
    // return <span className='emojiSpan' title={code} style={{ backgroundImage: `url(${src})` }}>{children}</span>
  }
  // @gya-tips：返回原文本，否则解析了空格会导致@无法触发
  return decoratedText; // children;
};
```
## 处理文本的复制粘贴

1. 插入表情
2. 插入复合文本
3. 转换为文本 =》会话草稿，复制等


# 草稿
利用`chat`组件的key属性，在切换会话时触发组件的卸载和装载，实现草稿的更新与保存

>为什么在`mount`和`unmount`中处理，而不是`didUpdate`中处理?
1. 组件安装与卸载可以通过改变key实现，流程清晰
2. update生命周期需要做可能相对复杂的判断

## 草稿数据存储位置
1. 存储在每个`conversation`的属性中
2. 单独用一个map存储，key为`conversationId`

两种方案没有本质区别，方案1无需查找，且随会话的更新(CRUD)而更新，更加稳定；方案2
其实存储在conversations中也一样，但是conversations的更新

数据
1. draftDatas: 按会话区分的草稿数据
    1. draft: 草稿简略文本，用于会话显示简略信息
    2. draftRaw：草稿持久数据
3. editorState：editor的实时数据

思路
1. 通过将`EditorComp`的`key`设置为`conversationId`，从而在每次切换会话，安装和卸载整个组件
2. 在组件的`componentDidMount`中，获取对应`current conversation`的`draftData`用于初始化`editorState`
3. 在组件的`componentWillUnmount`中，将`editorState`更新到`previous conversation`的`draftData`

editorComponent => 
componentDidMount => key & editorState 初始化
componentWillUnmount => 保存
