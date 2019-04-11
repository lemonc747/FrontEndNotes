## having查询
http://www.tuicool.com/articles/JFbYniN
以聚合函数为查询条件是错误的：
HAVING过滤条件：
之前说了分组操作、聚合函数、WHERE过滤的执行顺序，那如果我们希望在聚合之后执行过滤条件怎么办？
例，我们想查询平均年龄在20岁以上的班级

SELECT student_class, AVG(student_age) FROM t_student WHERE AVG(student_age)>20 GROUP BY student_class;
结果会出错。正因为聚合函数在WHERE之后执行，所以这里在WHERE判断条件里加入聚合函数是做不到的。
这里使用HAIVING即可完成：
SELECT student_class,AVG(student_age) AS 平均年龄 FROM t_student GROUP BY (student_class) HAVING AVG(student_age)>20;

这里再啰嗦一句
SQL的执行顺序：
–第一步：执行FROM
–第二步：WHERE条件过滤
–第三步：GROUP BY分组
–第四步：执行SELECT投影列
–第五步：HAVING条件过滤
–第六步：执行ORDER BY 排序

 SELECT idxSIMId AS NAME FROM tbSIMCountDaily WHERE cntTimes>0 GROUP BY idxSIMId LIMIT 10 HAVING SUM(cntDataDown) = 0 ？
