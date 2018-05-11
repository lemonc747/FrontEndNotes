## structure

## 最佳实践
1. 让嵌套在四层或更少层级内  
嵌套是很好用的特性，但是不能层级太多，否则你的css层级就和你的html层级几乎一致了，既增加了耦合，又增加了css文件的大小和复杂度。   
嵌套的层级应该是紧密相连的，属于一个“单元”的或者“控件”的。而不是只要父子关系就可以嵌套。  


## 语法
### CSS Extensions
### 嵌套
1. 选择器嵌套：一个css规则可以嵌套到另一个css规则中，
2. 引用父选择符： &
3. 嵌套属性：例如，font-family, font-size, and font-weight are all in the font namespace==>
 font: 2px/3px {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
  ###  Comments: /* */ and //: 注释，输出时多行注释保留，单行注释移除
  ### SassScript
  Variables: $  变量：只能用在当前和子嵌套的规则中，例如$width: 5em; 

  数据类型：SassScript 支持六种主要的数据类型：
- 数字（例如 1.2、13、10px）
- 文本字符串，无论是否有引号（例如 "foo"、'bar'、baz）
- 颜色（例如 blue、#04a3f9、rgba(255, 0, 0, 0.5)）
- 布尔值（例如 true、false）
- 空值（例如 null）
- 值列表，用空格或逗号分隔（例如 1.5em 1em 0 2em、Helvetica, Arial, sans-serif）

数学运算之/      
```
p {     
  font: 10px/8px;              // 纯 CSS，不是除法运算   
  $width: 1000px;
  width: $width/2;            // 使用了变量，是除法运算
  width: round(1.5)/2;        // 使用了函数，是除法运算
  height: (500px/2);          // 使用了圆括号，是除法运算
  margin-left: 5px + 8px/2px; // 使用了加（+）号，是除法运算
}
```
如果你不想/被理解成除法，用#{} 包住变量。font: #{$font-size}/#{$line-height};

Interpolation: #{}    
插入变量或？，#{}的附近的操作，都会被当成纯洁的css，不会编译成其他内容

变量默认值： !default  
变量未赋值时，会使用这个默认值。用法类似 !important

### @ 规则和指令

@import 根据文件名引入。 默认情况下，它会寻找 Sass 文件并直接引入， 但是，在少数几种情况下，它会被编译成 CSS 的 @import 规则：

如果文件的扩展名是 .css。
I如果文件名以 http:// 开头。
如果文件名是 url()。
如果 @import 包含了任何媒体查询（media queries）。
如果上述情况都没有出现，并且扩展名是 .scss 或 .sass， 该名称的 Sass 或 SCSS 文件就会被引入。 如果没有扩展名， Sass 将试着找出具有 .scss 或 .sass 扩展名的同名文件并将其引入。

@media

@extend

@media (min-width:768px)

- 查询分销和代理比例
- 检查父级：

