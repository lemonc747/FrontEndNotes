
# 配置MAC OS的环境变量

配置文件的作用和解释：http://www.mashangxue123.com/Linux/2816117882.html

2. 添加npm全局安装的目录到环境变量中
在用户根目录下`./bash_profile`中

语法
```shell
# 语法，中间用冒号隔开
export PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:------:<PATH N>
# 举例
export PATH=$PATH:/opt/local/bin:/opt/local/sbin
```

例子
```shell
# 定义
export PATH="$PATH:/Library/Frameworks/Python.framework/Versions/3.7/bin:/Users/shinystars/config/.npm-global/bin"
```

3. 重载配置文件, 使修改生效
两种方式:
3.1 粗鲁的方式: 重启终端;
3.2 优雅的方式: 重载配置文件
source ~/.bash_profile 或者 . ~/.bash_profile

# 全局安装的npm
。。。

获取全局安装位置的前缀<br/>
`npm get prefix`<br/>
添加环境变量`...:[prefix]/bin...`

