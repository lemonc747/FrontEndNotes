### react/sort-comp
以同样的组织方式排序你的函数，有助于你方便的查找函数

默认顺序
1. 静态方法和属性
2. 生命周期函数
3. 自定义函数
3. render

note: 仅在必要时，对应相对事件时将函数命名为`onXXX`。因为以on开头的函数也会被要求放在自定义函数之前，on函数被理解为监听事件

### arrow-parens
Expected parentheses around arrow function argument having a body with curly braces.
在函数主题有花括号的箭头函数中，参数应该有括号；反之亦然

### evcohen/eslint-plugin-jsx-a11y: no-static-element-interactions && 
1. 静态HTML元素响应事件时，应该赋予一个可交互的role属性。
没有语义的静态HTML标签最典型的`<div> <span>`,还有`<a>, <big>, <blockquote>, <footer>, <picture>, <strike> and <time>`等。
role属性赋予了元素语义
2. 非交互的HTML元素和非交互的role属性表示UI中的容器和内容，不支持event处理。
非交互的元素包括 <main>, <area>, <h1> (,<h2>, etc), <p>, <img>, <li>, <ul> and <ol>. 非交互的WAI-ARIA roles包括 article, banner, complementary, img, listitem, main, region and tooltip.

解决方式
1. 当元素表现的想button，link这样的标签时，赋予它对应的role
常用的role有：button,link
checkbox
menuitem
menuitemcheckbox
menuitemradio
option
radio
searchbox,switch,textbox
2. 当元素只是捕捉内部冒泡事件时，`role="presentation"`
3. 在元素内嵌套一个可交互的元素标签