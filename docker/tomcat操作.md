# 

## tomcat和docker的关系
引用一位网友的回答
> lsunwing  2017-03-31 两者不是同一种类型。
1. docker 是容器，tomcat是jsp应用服务器
2. tomcat可以安装在物理机上，虚拟机上，也可以安装在Docker上。所以从这个角度讲，Docker也可以看做是一种超轻量化的虚拟机。
3. Docker可以安装在物理机，虚拟机上，但不知道Docker上面是否可以再安装Docker，我觉得理论上应该可以。
4. Docker作为超轻量级的平台，可以整体移植，这也是它流行的其中一个原因。

## shell
```
在当前窗口启动
sh /usr/local/tomcat/bin/catalina.sh run
```