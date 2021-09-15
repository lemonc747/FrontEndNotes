# Downdrop实现悬浮高亮显示

## 常规

例如有这样一个Menu
```js
const menus = (
    <ul>
        <li>复制</li>
        <li>移动</li>
        // ...
    </ul>
)

```
定义一个`state`，为每个`li`设置`MouseEnter MouseLeave`事件，修改`state`

但是这种解决方案有一个问题：当鼠标移动太快时，不能保证最后一次执行的`MouseLeave`，导致鼠标离开之后
有可能某个Item保持高亮(猜测根本原因应该是`react-setState`有可能是异步的，导致多次执行顺序错误)

## 解决方案1：防抖的一种变化用法

方案：
1. MouseEnter：取消定时器，然后立即执行。MouseEnter不能延时，不然用户体验差
2. MouseLeave: 取消定时器，重新设置定时器，并延时执行

其实就是MouseEnter事件立即执行，MouseLeave使用防抖，因为鼠标进入高亮，用户感受明显，而鼠标移出时可以缓一缓

```js
// 高亮显示Item的key值
const [hoverKey, setHoverKey] = useState<string>('');
cosnt timer: number = 0;
const debounceHighLigt = (key: string) => {
    clearTimeout(timer);
    // MouseEnter
    if (key) {
        setHoverKey(key);
    }
    // MouseLeave
    else {
        timer = setTimeout(() => {
            setHoverKey('');
        }, 150);
    }
}


```

## 解决方案2：css中`:hover`样式
这是最简单，最靠谱的方式，前面的方案时走弯路

直接设置Item的`:hover`样式
```css
  li {
    ...
  }
  li:hover {
    color: red;
  }
```
