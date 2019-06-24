
### 操作文档
术语：节点，元素节点，根节点，子节点，后代节点，父节点，兄弟节点，文本节点（包含文字串的节点）

#### doc api
- document.querySelector()
- document.createElement()
- document.createTextNode()
- [Parent].appendChild([child])
- [Parent].removeChild([child])
- [node].cloneNode(deep)

tips
- 节点是唯一副本

#### doc style
- document.styleSheets
- 内联样式：[node].style.color|backgroundColor|padding|width|textAlign...
    - css与js中小驼峰式命名与连接符命名相互转换
    - 尺寸记得加“px”
- 通过css选择的类：[node].setAttribute(attr, value)，如果setAttribute("class", "...")同样可以修改样式

#### window对象

