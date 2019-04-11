# Linux命令基础
目标：熟悉Linux内置系统命令

## linux文件基础属性
Linux系统是一种典型的多用户系统，不同的用户处于不同的地位，拥有不同的权限。

栗子
```
ShinyStarsdeMacBook-Pro:~ shinystars$ ls -l
total 0
drwx------+ 17 shinystars  staff   544  2 12 17:24 Pictures
drwxr-xr-x+  5 shinystars  staff   160 11 27 10:33 Public
drwxr-xr-x   4 shinystars  staff   128  2 12 09:34 application2
drwxr-xr-x@  4 shinystars  staff   128  1 23 15:17 config
drwxr-xr-x@ 15 shinystars  staff   480  2 12 11:39 oneDrive
drwxr-xr-x@  7 shinystars  staff   224  2 11 17:34 本地Resources
drwxr-xr-x  12 shinystars  staff   384  2 13 17:16 工作目录
drwxr-xr-x@  6 shinystars  staff   192  1 10 14:47 本地私密数据
```

`ls -l`显示当下目录文件列表及属性，属性中的字符有特定的含义
- 第一个字符表示文件类型，有`d,-,l,b,c`五种
  - 当为[ d ]则是目录
  - 当为[ - ]则是文件；
  - 若是[ l ]则表示为链接文档(link file)；
  - 若是[ b ]则表示为装置文件里面的可供储存的接口设备(可随机存取装置)；
  - 若是[ c ]则表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)
- 接下来的9个字符表示3种用户的权限，以`rwx`为一组且顺序不变，没有的权限用减号`-`
  - [ r ]代表可读(read)、[ w ]代表可写(write)、[ x ]代表可执行(execute)。
  - 分为三组，分别代表：属主权限（文件所有者，user），属组权限（所有者的同组用户，group），其他用户权限（others）
  ![文件权限](../assets/linux-file-prop.png)

### 文件的属主和属组
对于文件来说，它都有一个特定的所有者，也就是对该文件具有所有权的用户。
同时，在Linux系统中，用户是按组分类的，一个用户属于一个或多个组。

### chgrp更改文件属组
```sh
chgrp [-R] 属组名 文件名
# -R：递归更改文件属组，就是在更改某个目录文件的属组时，如果加上-R的参数，那么该目录下的所有文件的属组都会更改。
```
### chown更改文件属主，也可以同时更改文件属组
```
chown [–R] 属主名 文件名
chown [-R] 属主名：属组名 文件名
```

### chmod更改文件权限属性
前面说到，Linux文件的基本权限就有九个，分别是user/group/others三种身份各有自己的read/write/execute权限。
同时权限可以用数字表示，read：4，write：2，execute：1，无权限则为0，将三者累加表示一种用户的权限。
```sh
chmod [-R] xyz 文件或目录
# xyz每个都是三种权限的累加，例如4+2+1=7，7就表示三种权限都有
# xyz分别对应三种不同身份的权限
```

另一种更改权限的方式：使用身份简写和权限字符表示
- 格式为：`chmod [u/g/o][+/-/=][rwx] [file or dir]`
- 用户类型：u=user属主，g=group属组，o=others其他类型，a=all表示所有类型
- 操作：+增加某些权限，-减少某些权限，=设置为某些权限
- 权限：rwx三种随意组合
- 注意，可以同时设置多种身份的权限，逗号分隔
- 🌰：`chmod u=rwx,g-wx,o+r  test1`表示test1文件属主拥有rwx权限，属组减少w和x权限，其他用户增加r权限

## Linux 文件与目录管理
我们知道Linux的目录结构为树状结构，最顶级的目录为根目录 /。
其他目录通过挂载可以将它们添加到树中，通过解除挂载可以移除它们。

### 处理目录的常见命令
- ls: 列出目录
- cd：切换目录
- pwd：显示目前的目录
- mkdir：创建一个新的目录
- rmdir：删除一个空的目录
- cp: 复制文件或目录
- rm: 移除文件或目录
- mv: 移动文件与目录，或修改文件与目录的名称

### ls列出目录
`ls [-options] 目录名称`

参数：
- -a ：全部的文件，连同隐藏档( 开头为 . 的文件) 一起列出来(常用)
- -d ：仅列出目录本身，而不是列出目录内的文件数据(常用)
- -l ：长数据串列出，包含文件的属性与权限等等数据；(常用)
### mkdir创建目录
`mkdir [-mp] 目录名称`

选项与参数：
- -m ：配置文件的权限
- -p ：创建多级目录，帮助你直接将所需要的目录(包含上一级目录)递归创建起来

### rmdir 删除空的目录
选项和参数
- -p ：删除空目录，若上级目录为空也删除。（实际测试中不对，待验证）

### cp 复制文件或目录
```sh
[root@www ~]# cp [-adfilprsu] 来源档(source) 目标档(destination)
[root@www ~]# cp [options] source1 source2 source3 .... directory
```
