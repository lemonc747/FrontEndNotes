## 以bash为例
Linux的shell种类众多，常见的有
- Bourne Shell（/usr/bin/sh或/bin/sh）
- Bourne Again Shell（/bin/bash）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh）

在一般情况下，人们并不区分 Bourne Shell 和 Bourne Again Shell，所以，
像 #!/bin/sh，它同样也可以改为 #!/bin/bash。`#!`后的路径所指定的程序即是解释此脚本文件的 Shell 程序。

## 执行
- /bin/bash example.sh
- 

## 变量
### 用法
```sh
#定义变量
#错误示例：myName = 'wali'，不能有空格
myName='wali'
#使用变量: $打头，{}帮助识别变量边界，建议始终使用{}
echo $myName
echo ${myName}miss
#变量可以重新定义
myName='yiwa'
echo $myName
#删除变量：
unset myName
```
### 字符串
单引号：单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；

双引号：可以包含变量，转义符，例如`str="hello, you are \"${myName}\"!"`

字符串长度，变量名前使用#：`${#myName}`

拼接字符串：
```sh
myName='wali'
#字符串内部不包含变量和转义时，单双引号都可以
str1='hello,''you are'${myName}'!'
#字符串内部有变量，只能用双引号
str2="hello,""you are${myName}!"
```

截取字符串：格式`:num`，两个表示开始和截止，截止可省略表示截取到最后，另外不会数组越界。
`${myName:1:2}`为`al`，`${myName:1}`为`ali`

### 数组
用括号定义，空格或换行符分隔，一般形式为：`数组名=(值1 值2 ... 值n)`

单独定义数组元素，形式为`数组名[下标]`，可以不使用连续的下标

读取数组，使用 @ 符号可以获取数组中的所有元素，`${数组名[@]}`；读取数组元素，`${数组名[下标]}`

获取数组长度
```sh
arr=(11 'haha')
# 取得数组元素的个数
echo ${#arr[@]} # 输出2
echo ${#arr[*]} # 输出2
# 取得数组单个元素的长度
echo ${#arr[1]} # 输出4
```

### 注释
单行注释：以 # 开头的行就是单行注释，

多行注释:
```sh
:<<EOF
注释内容...
注释内容...
注释内容...
EOF
```

函数代替大段注释：可以把这一段要注释的代码用一对花括号括起来，定义成一个函数，没有地方调用这个函数，这块代码就不会执行，达到了和注释一样的效果

