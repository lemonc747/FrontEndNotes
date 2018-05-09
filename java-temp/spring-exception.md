---
title: Sping bugs记录
date: 2017-11-20
categories: code
tags: 
- spring
- exception
---
整理工作中遇到的spirng异常
<!--more-->
### Q: spring:message繁体显示乱码，js的$.i18n繁体显示正常
A: 增加defaultEncoding属性 
```
//pageEncoding 和 contentType
<!--&lt;!&ndash; 国际化配置 &ndash;&gt;-->
<bean class="org.springframework.context.support.ResourceBundleMessageSource" id="messageSource">
    <property name="basename" value="messages"/>
    <property name="defaultEncoding" value="UTF-8"/>
</bean>
```
### Q: RequestParam如何传递数组？
A: 将 参数名重复就行了，后台是 @RequestParam("test") Integer[] test  这样就可以拿到了,但是这样太麻烦，然后经过搜索后，看了下jQuery ajax的文档，有个属性叫traditional 用法是...