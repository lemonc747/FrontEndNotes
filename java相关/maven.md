
## 使用nexus搭建私服
1. 下载sonatype nexus
2. （可选）修改配置：配置bin目录下nexus.vmoptions文件，适当调整内存参数，防止占用内存太大
3. linux：bin目录下执行`sh nexus start`启动服务，`sh nexus stop`停止服务
4. 用户登录：默认用户`admin/admin123`

### Nexus 的仓库分为这么几类：
- hosted 宿主仓库：主要用于部署无法从公共仓库获取的构件（如 oracle 的 JDBC 驱动）以及自己或第三方的项目构件；
- proxy 代理仓库：代理公共的远程仓库；
- virtual 虚拟仓库：用于适配 Maven 1；
- group 仓库组：Nexus 通过仓库组的概念统一管理多个仓库，这样我们在项目中直接请求仓库组即可请求到仓库组管理的多个仓库。

![maven-repo-type](../assets/maven-repo-type.png)