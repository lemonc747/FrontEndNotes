### 约定
- eventData 
    - 类型：Object
    - 一个对象，它包含的数据键值对映射将被传递给事件处理程序
- handle || handler(eventObject)
    - 类型：Function()
    - 每当事件触发时执行的函数。
- return
    - 方法执行后返回的数据类型
- jQuery
    - 类型：jQuery对象
- eventType
    - 类型：String
    - Multiple Events（多个事件）：多个事件类型可以通过用空格隔开一次性绑定：例如'mouseenter mouseleave'
    - 一个包含一个或多个DOM事件类型的字符串，比如"click"或"submit,"或自定义事件的名称。
    
## 浏览器事件

### .error( handler(eventObject) )
error事件被发送到元素，比如一张图片被引用，由浏览器加载。如果没有正确载入，这个事件就会被调用。
- .error( handler(eventObject) )
- .error( [eventData ], handler(eventObject) 
- return jQuery

这个方法是 .bind('error', handler) 的快捷方式。
```
//用自定义图片替换“无效的图片”
$("img")
  .error(function(){
    $(this).hide();
  })
  .attr("src", "missing.png");
```
### .resize() 
**描述: 为 JavaScript 的 "resize" 事件绑定一个处理函数，或者触发元素上的该事件。**
- .resize( handler(eventObject) )
- .resize( [eventData ], handler(eventObject) )
- .resize() 
- return jQuery

这个函数的前两个用法是 .bind('resize', handler) 的快捷方式，第3个不带参数的用法是 .trigger('resize') 的快捷方式。
### .scroll()
每当元素的滚动位置的变化时，该元素就会触发scroll事件，不管什么原因。鼠标点击或拖动滚动条，拖动里面的元素，按箭头键，或使用鼠标的滚轮都可能导致触发此事件。
- .scroll( handler(eventObject) )
- .scroll( [eventData ], handler(eventObject) )
- .scroll()
- return jQuery

这个函数的前两个用法是 .bind('scroll', handler) 的快捷方式，第3个不带参数的用法是 .trigger('scroll') 的快捷方式。

## 文档加载事件
### .load()
描述: 当DOM准备就绪时，指定一个函数来执行。
- .ready( handler )
- return jQuery

虽然JavaScript提供了load事件，当页面执呈现时用来执行这个事件，直到所有的东西，如图像已被完全接收前，此事件不会被触发。在大多数情况下，只要DOM结构已完全加载时，脚本就可以运行。传递处理函数给.ready()方法，能保证DOM准备好后就执行这个函数，因此，这里是进行所有其它事件绑定及运行其它 jQuery 代码的最佳地方。当使用的脚本依赖 CSS 属性值时，需要特别注意，要保证外部的样式或内嵌的样式被加载完后，再调用脚本。

以下三个语法全部是等价的：
- $(document).ready(handler)
- $().ready(handler) (this is not recommended)
- $(handler)

## 绑定事件处理器
### .bind() @deprecated
描述: 为一个元素绑定一个事件处理程序。
- .bind( eventType [, eventData ], handler(eventObject) )
- .bind( eventType [, eventData ], preventBubble )
    - preventBubble 类型: Boolean
    - 第三个参数设置为false将绑定一个函数，防止默认事件，阻止事件冒泡。默认值是true。
- .bind( events )
    - events :
    - 类型: Object
    - 一个对象，包含一个或多个DOM事件类型和函数并执行它们。
- return jQuery

划重点：
- 从jQuery 1.7开始，.on() 方法是将事件处理程序绑定到文档（document）的首选方法。
- 对于早期版本，**.bind()** 方法用于直接附加一个事件处理程序到元素上。即：无法应用于追加的元素，即无法用于事件委托。
- 对于**eventType**任何字符串是合法的;若为非原生的DOM事件名称，是不会被浏览器调用，但可以通过其他JavaScript代码，例如使用.trigger()或.triggerHandler() 来手动触发。
- 如果eventType参数字符串包含一个点（ . ）字符，那么该事件是带命名空间的。这个点（ . ）字符将事件及其命名空间分隔开来。例如，在调用.bind('click.name', handler) ，字符串click是事件类型，而字符串name是命名空间。命名空间允许我们解除或绑定一些事件，而不会影响其他事件（注：即使是同类型的事件，命名空间不同，就不会受到影响。）
- 通过返回 false 的方式取消默认的动作，并防止它进行事件冒泡
```
$("form").bind("submit", function() { return false; })
```
- 通过使用 .preventDefault() 方法，仅取消默认的动作。
```
$("form").bind("submit", function(event) {
event.preventDefault();
});
```
- 通过使用 .stopPropagation() 方法，防止事件冒泡，但是默认执行默认的动作。
```
$("form").bind("submit", function(event) {
  event.stopPropagation();
});
```
- 绑定多个事件
```
$("div.test").bind({
  click: function(){
    $(this).addClass("active");
  },
  mouseenter: function(){
    $(this).addClass("inside");
  },
  mouseleave: function(){
    $(this).removeClass("inside");
  }
});
```

### .delegate() @deprecated
jQuery1.7版本之后，用on替代

### on() 
jQuery1.7版本之后, 事件绑定和委托的首选！
从 jQuery 1.7开始， .on() 和 .off()方法是最好的元素上附加和移除事件处理程序的方法

1. 事件处理只能绑定在当前被选中的元素上;而且，在您的代码调用.on()的时候，他们必须在页面文档中已经存在
2. 如果省略selector或者是null，那么事件处理程序被称为直接事件 或者 直接绑定事件 ,
    当提供selector参数时，事件处理程序是指为委派 事件
3. 委托事件有一个优势，他们能在后代元素添加到文档后，可以处理这些事件。以避免频繁的绑定事件及解除绑定事件
4. 高频率事件比如mousemove 或者 scroll, 可以按如下的办法提高事件的性能：减少事件处理函数中的工作量；对于在事件处理函数中要用到的信息做好缓存而不是再重新计算一次；或使用setTimeout限制的页面更新的实际次数。
5. 为了获得更好的性能，在绑定代理事件时，绑定的元素最好尽可能的靠近目标元素。避免在大型文档中，过多的在 document 或 document.body 上添加代理事件