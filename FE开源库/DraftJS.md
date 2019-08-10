# 基于react的富文本编辑器

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
// 设置新的装饰器
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