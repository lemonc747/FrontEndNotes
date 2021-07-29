### Q&A

Q:解决ajax请求下，后台sendRedirect页面跳转无效
A: 不能用ajax，因为：。。。。

Q:Cause: java.lang.UnsupportedOperationException
A:这里 resultType 指的是 select 返回的每一条记录 的类型，而不是所有记录组成的类型。

Q：避免Java中的空指针异常。遵从这些技巧同样可以减少Java代码中到处都有的非空检查的数量

4.implements Serializable做了什么？
    a1:https://www.ibm.com/developerworks/cn/java/j-lo-serial/index.html

### 5.responseBody什么时候使用 
@Responsebody 注解表示该方法的返回的结果直接写入 HTTP 响应正文（ResponseBody）中，一般在异步获取数据时使用；
在使用 @RequestMapping 后，返回值通常解析为跳转路径，加上 @Responsebody 后返回结果不会被解析为跳转路径，而是直接写入HTTP 响应正文中。例如，异步获取 json 数据，加上 @Responsebody 注解后，就会直接返回 json 数据。

plan
    理论+理解+实践
    1. mdn-js https://developer.mozilla.org/zh-CN/docs/Web/JavaScript
    指南与参考

jili:
- money
- control
- 


Q：tomcat转spring boot时，request转MultipartHttpServletRequest丢失参数
http://blog.yangxiaochen.com/blog/java/spring-mvc-multipart-error.html


spring mvc & spring boot 入门深入