## a标签点击跳转到顶部的bug
a标签作为按钮时，加上`href="#"`,点击会跳转到顶部

1. 去掉href。在BS4中定义a:not(href)的样式，所以这种方式会改变a链接的样式
2. `href="javascript:void(0);"`