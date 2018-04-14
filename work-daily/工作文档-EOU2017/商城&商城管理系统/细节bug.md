### 部分手机无法访问微信商城
1. 如果微信昵称是有特殊符号的，导致无妨访问商城，那是你的mysql版本要换。
2. 如果是所有的安卓机器访问都有问题，那是tomcat版本问题。微信的sdk，他对于高版本的tomcat的支持，会存在io流传输上的丢失。所以会导致授权失败。需要7.0.6及以下版本

### 端口映射时，跳转丢失端口
nginx 反向代理时丢失端口的解决方案

    今天，配置nginx反向代理时遇到一个问题，当设置nginx监听80端口时转发请求没有问题。但一旦设置为监听其他端口，就一直跳转不正常；如，访问欢迎页面时应该是重定向到登录页面，在这个重定向的过程中端口丢失了。
    这里给出一个简短的解决方案，修改nginx的配置文件。
一、配置文件

    # the 90 port
    server {
        listen       90;
        server_name  zxy1994.cn;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host:$server_port; #这里是重点,这样配置才不会丢失端口
        location / {
                proxy_pass http://127.0.0.1:9001;
        }
        location = /50x.html {
            root   html;
        }
    }
二、产生原因

        nginx没有正确的把端口信息传送到后端，没能正确的配置nginx，下面这行是关键
                proxy_set_header Host $host:$server_port; 这一行是关键。
作者：zeng1994 
出处：http://www.cnblogs.com/zeng1994/ 
本文版权归作者和博客园共有，欢迎转载！但未经作者同意必须保留此段声明，且在文章页面明显位置给出原文链接！