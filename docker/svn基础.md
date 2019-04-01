

## 基础命令
```sh
# 将项目导入svn库
# -m：表示提交时的备注信息
# project_dir：本地项目的路径。注意导入的是项目内的文件，不包括该文件夹，故remote_dir需要创建文件夹
# remote_dir：目标文件夹路径，若remote_dir文件夹不存在，则自动创建
svn import -m 'messages' project_dir remote_dir


```