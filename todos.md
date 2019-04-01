##  JS基础

- substring函数不会将结果赋值给自身
- mysql count&group by：如果语句的结果为空，则count结果不是0，而是在spring中报错Operand should contain 1 column(s)
	不用group则没问题
	eg: SELECT COUNT(*) FROM tbSimCard WHERE STATUS=100 GROUP BY keySimCardID
- web前端实时消息是如何实现的
	https://www.oschina.net/question/2275855_2194831
- RequestParam如何传递数组？
	将 参数名重复就行了，后台是 @RequestParam("test") Integer[] test  这样就可以拿到了,但是这样太麻烦，然后经过搜索后，看了下jQuery ajax的文档，有个属性叫traditional 用法是
- jquery如何判断隐藏显示？
	$("#id").is(':visible')，true 为显示 false 为隐藏；
$("#id").is(":hidden")，true 为隐藏 false 为显示；
jQuery("#tanchuBg").css("display")；
- bootstrapValidator提示Maximum call stack size exceeded？
    我的form中确实没有用form-group，看来bootstrapValidator的form校验此css样式是必须的。
- 小数在JS中表示怎么不准确？
0.3-0.2=0.099999...8等等
jS用64位来进行数字的表示，但是对于小数的表示却力不从心，即使对于我们最熟悉的小数表示起来都比较困难，当然是计算机本来就存在的问题。
如 0.1 +0.2=0.30000000000000004（JS的计算结果）。
出现这种结果的原因在于计算机本质上只能是存储0和1的，对于整数来说，使用十进制转换为二进制的方法是“除2取余，逆序排列”，表示起来毫无压力。
但是对于小数用二进制来表示，方法是不同的——"乘2取整，顺序排列"。

- csv文件的导入导出
	- html5的FileReader接口：实现前端的文件读取解析
	https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    - 导入导出的数据库 事务管理
    - js生成csv文件（a标签）
	http://blog.csdn.net/oscar999/article/details/16342699