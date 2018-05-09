---
title: 工作中的Java异常
date: 2017-11-20
categories: code
tags: 
- spring
- exception
---
### com.alibaba.fastjson.JSONException: syntax error, EOF异常？
    场景：同样的代码，在本地、测试环境、生产环境表现不同，生产环境报以上错误
    分析定位：
    1. 分析可能是数据库或其他方面的配置问题
    2. 通过日志找到问题出处：
        JSONObject portInfoMap = portInfo != null ? JsonUtils.parseObject(portInfo.toString()) : new JSONObject();
        问题出在JSON解析
        打印日志对比生产和测试环境的数据，发现生产环境的数据长度少且格式不完整，字符串被截断
        最后同事说这是数据库配置
        原因与解决
        sql数据库配置的问题：
        修改group_concat_max_len长度.否则某些使用group_concat查询的报错,
        配置文件(重启生效，即永久有效):linux:/etc/my.cnf 文件加入配置:group_concat_max_len=4294967295
        执行语句(重启失效，即会话内有效？):
        SET GLOBAL group_concat_max_len=4294967295;
        SET SESSION group_concat_max_len=4294967295;