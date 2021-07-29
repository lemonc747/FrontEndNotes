## javaScript
1. JavaScript由三部分组成，ECMASCRIPT该脚本语言的语法与语义标准描述，DOM文档对象模型，BOM浏览器对象模型。

## JavaScript类型
包括：字符串、数字、布尔、数组、对象、Null、Undefined。

1. 字符串
	1. 可以使用单引号或双引号，由最外层的引号决定。里层如果有引号则属于字符串内容。
JavaScript 中的所有事物都是对象：字符串、数字、数组、日期，等等。
在 JavaScript 中，对象是拥有属性和方法的数据。\

## JavaScript对象
JavaScript 中的所有事物都是对象：字符串、数值、数组、函数...对象只是带有属性和方法的特殊数据类型。

1. 类比基于对象的语言，这一点后面详细说明。
	JavaScript 是面向对象的语言，但 JavaScript 不使用类。
	在 JavaScript 中，不会创建类，也不会通过类来创建对象（就像在其他面向对象的语言中那样）。
	JavaScript 基于 prototype，而不是基于类的。
2. 数字： JavaScript 中的所有数字都存储为根为 10 的 64 位（8 比特），浮点数。
八进制和十六进制
如果前缀为 0，则 JavaScript 会把数值常量解释为八进制数，如果前缀为 0 和 "x"，则解释为十六进制数。
3. 

## DOM文档对象模型
1. 查找 HTML 元素
	通过 id 找到 HTML 元素，document.getElementById("intro")
	通过标签名找到 HTML 元素，getElementsByTagName("p")
	通过类名找到 HTML 元素，getElementByClassName("cn")。
	**通过类名查找 HTML 元素在 IE 5,6,7,8 中无效。
	
2. HTML属性
	向 HTML 输出流写内容：document.write() 
	改变或获取HTML 内容：document.getElementById(id).innerHTML =new html
	改变或获取 HTML 属性：document.getElementById(id).attribute=new value
	改变 HTML 样式：document.getElementById(id).style.property=new style

3. 使用 HTML DOM 来分配事件
	eg: document.getElementById("myBtn").onclick=function(){displayDate()};
	事件有：onclick, onload, onunload, onchange, onmouseover , onmouseout , onmousedown, onmouseup ,onfocus

4. 添加和删除节点（HTML 元素）。
	创建新的 HTML 元素：
	var para=document.createElement("p");
	var node=document.createTextNode("这是新段落。");
	para.appendChild(node);
	var element=document.getElementById("div1");
	element.appendChild(para);
	删除元素：
	var parent=document.getElementById("div1");
	var child=document.getElementById("p1");
	parent.removeChild(child);
	在不引用父元素的情况下删除某个元素：
	var child=document.getElementById("p1");
	child.parentNode.removeChild(child);

## BOM浏览器对象模型

所有浏览器都支持 window 对象。它表示浏览器窗口。
	所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。全局变量是 window 对象的属性，全局函数是 window 对象的方法，甚至 HTML DOM 的 document 也是 window 对象的属性之一
1. location
	location.hostname 返回 web 主机的域名
	location.pathname 返回当前页面的路径和文件名
	location.port 返回 web 主机的端口 （80 或 443）
	location.protocol 返回所使用的 web 协议（http:// 或 https://）
	location.href 属性返回当前页面的 URL。
	location.assign() 当前页面方法加载新的文档。
2. window.navigator 对象包含有关访问者浏览器的信息。
3. 警告框：alert("文本")
	确认框：confirm("文本")。如果用户点击确认，那么返回值为 true。如果用户点击取消，那么返回值为 false。
	提示框：prompt("文本","默认值")。如果用户点击确认，那么返回值为输入的值。如果用户点击取消，那么返回值为 null。

## TIPS
1. 如果在文档已完成加载后执行 document.write，整个 HTML 页面将被覆盖
2. JavaScript 对大小写是敏感的。
3. JavaScript 会忽略多余的空格。
4. 您可以在文本字符串中使用反斜杠对代码行进行换行。注意：是字符串中，不是一行代码中。
5. 一个好的编程习惯是，在代码开始处，统一对需要的变量进行声明。这是由js语言本身的特性决定的。
6. 一条语句，多个变量。该语句以 var 开头，并使用逗号分隔变量即可。
7. 重新声明 （而不是赋值）一个已有的JavaScript 变量，值不变没有丢失。
8. 向未声明的 JavaScript 变量来分配值，该变量将被自动作为全局变量声明。