macos涉及的常见问题和操作

## 1.环境变量配置
通常是用于npm命令不识别的问题

### 1.1 修改配置文件
`~/.profile`文件

### 1.2 让配置立即生效
命令`source ~/.profile`

### 1.3 确认查看是否生效
命令`echo $PATH`

## 2 配置npm的环境变量
对应的问题：全局安装时的访问权限问题

参考：https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
## 2.1 修改npm的默认路径

1. 创建文件夹：`mkdir ~/.npm-global`
2. 配置npm到新的路径：`npm config set prefix '~/.npm-global'`
3. 创建或打开`~/.profile`
4. 添加环境变量：`export PATH=~/.npm-global/bin:$PATH`
5. 保存

这里对应 `1.1`，按照后续操作即可
