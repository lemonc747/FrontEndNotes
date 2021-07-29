
## $.each()
描述: 遍历一个jQuery对象，为每个匹配元素执行一个函数。
```
    $.each(function(index, item){...})
```

## $.each实现
主要思路如下
1. 区分`数组(或类数组)`和`对象`，分别遍历它们的属性
2. 类数组的判断方式
3. callback在return false时break

tips
1. `window`和`function`的`length`属性很特殊，分别表示frames(frame或iframe)的个数，函数期望参数的个数
2. ss

## 拓展
1. 支持深度递归遍历
2. ？？