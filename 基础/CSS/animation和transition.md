
# animation动画

## 动画与过渡的区别
1. 动画可以循环
2. 动画可以定义关键帧

# trasition过渡
简写语法
`transition: <property> <duration> <timing-function> <delay>`
## 可过渡的属性列表

## 属性
1. transition-property: 应用过渡的css属性，例如width，color等
2. transition-duration: 过渡花费的时间
3. transition-timing-function：过渡效果函数
4. transition-delay: 过渡开始前的延迟



## 当属性值列表长度不一致时节
以 transition-property 的值列表长度为标准

如果某个属性值列表长度短于它的，则重复其值以长度一致
```css
div {
  transition-property: opacity, left, top, height;
  transition-duration: 3s, 5s;
}
/* 将按下面这样处理: */
div {
  transition-property: opacity, left, top, height;
  transition-duration: 3s, 5s, 3s, 5s;
}
```
如果某个属性值列表长度长于它的，则截断多余的部分