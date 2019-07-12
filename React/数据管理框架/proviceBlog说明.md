## normalizr
tips: 
1. normalizr不一定要处理全部state，也可以处理其中的一部分复杂数据，然后合并

### QA
1. 分表与不分表的界限
  - 分表是为了方便操作，以下情况：多处引用的统一数据，嵌套层级多的数据，相互关联的数据
  - 有些则没有必要。例如`blogItem`中的`thumbsUp`数组，虽然不同blogItem的thumbs的item属于同一类数据，但相互之间没有关联，单独将thumbsUp作为一个表只会增加操作

### 数据结构
1. 公共blog组件
``` js
const schema = [
  blogItem: {
    blog: {
      atUser: [],
      targetUser: [],
      msgContent: string => object,
    },
    comment: [],
    thumbsUp: [],
  }
]
```
2. 厅长点评

### 流程

1. `reducer`中按照范式化后的格式定义
2. 在异步`action-getBlogList`后范式化，并追加到对应的数据中


### 7个不同的blog tab页面
直接细化到state的数据中，因为不同tab的既有共同的处理也有差异点，且后续需求可能变化。
但是每个tab页本身是相对稳定的，后续也可能增加其他tab

## 其他库

1. immutable：
immutable需要在除了dumb组件外所有组件代码中使用，侵入性大
2. redux-immtable：
redux-immutable的combineReducer在嵌套reducer（似乎）不适用
3. combineReducer：
  1. combineReducer如何处理list数据中的item？
  2. combineReducer会细分state，项目中tab页部分使用的相同组件，然后通过sort区分；这样在获取sort时需要时刻传值，不太方便


### bugs
1. 获取api数据后，如果要分步dispatch，需要注意部分dispatch是否会导致数据不完整，而重绘崩溃。
例如：blogList dipatch了result，而没有dispatchentities

2. normalize是突变函数，会修改原数据