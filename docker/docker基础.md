## 打docker镜像
```sh
# 打tar包
tar zcvf msjw_web_administrator_platform.tar.gz msjw_web_administrator_platform
# 打镜像，文件夹中仅有tar包和dockerfile两个文件
# 日期-次数，作为tag标识
docker build -t msjw_web_administrator_platform:0311-1 . 
# 查看镜像
docker image ls
# 上传镜像：参照tsf指引

```

## docker image的启动和停止
```bash
docker start [image:tag]
docker stop [containerID]
```