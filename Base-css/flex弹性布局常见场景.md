# 嵌套flex布局，子flex容器的内容超出主轴高度/宽度时，会撑大

解决办法：设置上级flex容器的`min-height/width: 0`，
参考： https://juejin.cn/post/6931638878512087053

1. 设置min-height: 0，而不是设置height: 0。
2. 设置overflow: visible(只要不是auto就行）。