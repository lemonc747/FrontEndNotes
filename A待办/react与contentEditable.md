### 1
A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional

### reference
[基于React的可编辑在线简历模板][1]


### 2
使用dangerouslySetInnerHTML设置innerHTML
```js
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

[1]:	https://segmentfault.com/a/1190000013695808