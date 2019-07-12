# ref

## ref
`const node = this.myRef.current;`

ref 的值根据节点的类型而有所不同：

当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
你不能在函数组件上使用 ref 属性，因为他们没有实例。
# 两种创建方式
1. 
2. 回调函数

## 注意点
