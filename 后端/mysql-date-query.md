---
title: MYSQL常用日期查询
date: 2017-11-20
categories: code
tags: 
- mysql
- date
---
mysql查询今天,昨天,近7天,近30天,本月,上一月数据的方法分析总结：
<!--more-->
话说有一文章表article，存储文章的添加文章的时间是add_time字段，该字段为int(5)类型的，现需要查询今天添加的文章总数并且按照时间从大到小排序，则查询语句如下：

1	select * from `article` where date_format(from_UNIXTIME(`add_time`),'%Y-%m-%d') = date_format(now(),'%Y-%m-%d');
或者：

1	select * from `article` where to_days(date_format(from_UNIXTIME(`add_time`),'%Y-%m-%d')) = to_days(now());

假设以上表的add_time字段的存储类型是DATETIME类型或者TIMESTAMP类型，则查询语句也可按如下写法：

查询今天的信息记录：

1	select * from `article` where to_days(`add_time`) = to_days(now());
查询昨天的信息记录：

1	select * from `article` where to_days(now()) – to_days(`add_time`) <= 1;
查询近7天的信息记录：

1	select * from `article` where date_sub(curdate(), INTERVAL 7 DAY) <= date(`add_time`);
查询近30天的信息记录：

1	select * from `article` where date_sub(curdate(), INTERVAL 30 DAY) <= date(`add_time`);
查询本月的信息记录：

1	select * from `article` where date_format(`add_time`, ‘%Y%m’) = date_format(curdate() , `%Y%m`);
查询上一月的信息记录：

1	select * from `article` where period_diff(date_format(now() , `%Y%m`) , date_format(`add_time`, `%Y%m`)) =1;
对上面的SQL语句中的几个函数做一下分析：

（1）to_days
/******   %Y%m用引号包裹，列column用 *******/

就像它的名字一样，它是将具体的某一个日期或时间字符串转换到某一天所对应的unix时间戳，如：

01	mysql> select  to_days('2010-11-22 14:39:51');      
02	 +--------------------------------+                                                        
03	| to_days('2010-11-22 14:39:51') |
04	+--------------------------------+
05	|                         734463 |
06	+--------------------------------+
07	 
08	mysql> select  to_days('2010-11-23 14:39:51');
09	+--------------------------------+
10	| to_days('2010-11-23 14:39:51') |
11	+--------------------------------+
12	|                         734464 |
13	+--------------------------------+

可以看出22日与23日的差别就是，转换之后的数增加了1，这个粒度的查询是比较粗糙的，有时可能不能满足我们的查询要求，那么就需要使用细粒度的查询方法str_to_date函数了，下面将分析这个函数的用法。

提醒：

（1）to_days() 不用于阳历出现(1582)前的值，原因是当日历改变时，遗失的日期不会被考虑在内。因此对于1582 年之前的日期(或许在其它地区为下一年 ), 该函数的结果实不可靠的。
 
（2）MySQL"日期和时间类型"中的规则是将日期中的二位数年份值转化为四位。因此对于'1997-10-07'和'97-10-07'将被视为同样的日期:

1	mysql> select to_days('1997-10-07'), to_days('97-10-07');
2	 
3	-> 729669, 729669
（2）str_to_date

这个函数可以把字符串时间完全的翻译过来，如：

1	mysql> select str_to_date("2010-11-23 14:39:51",'%Y-%m-%d %H:%i:%s');
2	 
3	+--------------------------------------------------------+
4	| str_to_date("2010-11-23 14:39:51",'%Y-%m-%d %H:%i:%s') |
5	+--------------------------------------------------------+
6	| 2010-11-23 14:39:51                                    |
7	+--------------------------------------------------------+

具体案例操作如下：

select str_to_date(article.`add_time`,'%Y-%m-%d %H:%i:%s') from article where str_to_date(article.`add_time`,'%Y-%m-%d %H:%i:%s')>='2012-06-28 08:00:00' and str_to_date(article.`add_time`,'%Y-%m-%d %H:%i:%s')<='2012-06-28 09:59:59';