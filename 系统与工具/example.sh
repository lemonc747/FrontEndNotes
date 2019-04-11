#!/bin/bash
echo 'hello world!'
# for file in `ls `

#定义变量
#错误示例：myName = 'wali'，不能有空格
myName='wali'
# #使用变量: $打头，{}帮助识别变量边界，建议始终使用{}
# echo $myName
# echo ${myName}miss
# #变量可以重新定义
# myName='yiwa'
# echo $myName
# unset myName
# echo $myName
# myName='haha'
# echo $myName
# echo ${#myName}
# #字符串内部不包含变量和转义时，单双引号都可以
# str1='hello,''you are'${myName}'!'
# #字符串内部有变量，只能用双引号
# str2="hello""you are${myName}!"
# echo $str1
# echo $str2
echo ${myName:1}

string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4

arr=(11 'haha')
arr[3]='hehe'
echo ${arr[1]}
echo ${arr[@]}
{
arr=(11 'haha')
# 取得数组元素的个数
echo ${#arr[@]} # 输出2
echo ${#arr[*]} # 输出2
# 取得数组单个元素的长度
echo ${#arr[1]} # 输出4
}