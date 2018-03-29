
# 安装jekyll 3
1. homebrew : macOS的软件包管理器
1. ruby: brew install ruby
2. rubygem: 下载安装，2.7.5版本有bug，降级到2.7.4 => `gem update --system 2.7.4`
3. NodeJS: 下载安装


### 注意事项
1. 不要在配置文件中使用 tab 制表符 ：这将造成解析错误，或倒回到默认设置。请使用空格替代。
2. Destination 文件夹会在站点建立时被清理
    - <destination> 的内容默认在站点建立时会被自动清理。不是你创建的文件和文件夹会被删除。你想在 <destination> 保留的文件和文件夹应在 <keep_files> 里指定。不要把<destination> 设置到重要的路径上，而应该把它作为一个暂存区域,从那里复制文件到您的web服务器。

