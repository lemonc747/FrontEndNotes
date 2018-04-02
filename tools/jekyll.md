
126> 45 > 77 
通用密码gya747283747
私密gya863002958
#jekyll

# getting-start
## install for windows
1. brew || homebrew : macOS的软件包管理器
1. ruby || ruby: brew install ruby
2. gem || rubygem: 下载安装，2.7.5版本有bug，降级到2.7.4 => `gem update --system 2.7.4`
3. node || NodeJS: 下载安装
5. jekyll || 安装jekyll

## install for macOS
1. 安装ruby+Devkit捆绑包，https://rubyinstaller.org/downloads/
2. gem install jekyll: 安装jekyll

## run
根据默认配置或_config.yml配置运行
1. jekyll build [--watch]
1. jekyll serve [--no-watch] : 启动服务
3. 安装插件
    - 在_config.yml中配置plugins
    ```
    # This will require each of these plugins automatically.
    plugins:
    - jekyll-gist
    - jekyll-coffeescript
    - jekyll-assets
    - another-jekyll-plugin
    ```
    然后运行
    ```
    gem install jekyll-gist jekyll-coffeescript jekyll-assets another-jekyll-plugin
    ```
    - 在Gemfile中配置，然后运行`bundle install`
    ```
    group :jekyll_plugins do
        gem "jekyll-gist"
        gem "jekyll-coffeescript"
        gem "jekyll-assets"
        gem "another-jekyll-plugin"
    end
    ```





# 配置

# 书写博客
## 术语
- YAML头信息：按照YAML格式，在w文件开头的地方，在两行三条虚线之间设置变量属性
- Liquid标签：

## 设置头信息
头信息可以设置y预定义的变量，也可以DIY变量。你可以在模板或者包含这个文件的页面中，通过Liquid标签引用这些变量

### 预定义的全局变量
|变量|描述|note|
|:---|:---|:---|
|layout|设置该文件的布局模板，省略拓展名，必须放在_layouts目录||
|permalink|永久链接|默认值：`/year/month/day/title.html`|
|published|设为false时不发布这篇文章，默认true||
### 预定义的文章变量
date, category||categories, tags
### 自定义变量
头信息中没有预定义的变量都会通过Liquid模板调用，eg: {{page.title}}

### 内置变量引用
- site.url: 域名的根目录，
- site.posts : 所有文章，一般用在for-in展示所有文章目录。其中每个post包含：
    - post.url: 
    - post.title:
    - post.excerpt: 摘要
    - ...



# plugins
常用jekyll插件
### jekyll-toc

# Liquid模板语言
https://liquid.bootcss.com/
# yaml格式


# References
    - [Liquid template language](https://help.shopify.com/themes/liquid/basics)
    - [How jekyll template work?](http://jekyllcn.com/docs/templates/)


# 实践
一些细节点
## warnings
1. 不要在配置文件中使用 tab 制表符 ：这将造成解析错误，或倒回到默认设置。请使用空格替代。
2. Destination 文件夹会在站点建立时被清理
    - <destination> 的内容默认在站点建立时会被自动清理。不是你创建的文件和文件夹会被删除。你想在 <destination> 保留的文件和文件夹应在 <keep_files> 里指定。不要把<destination> 设置到重要的路径上，而应该把它作为一个暂存区域,从那里复制文件到您的web服务器。

## jekyll中文目录乱码？

## 配置2
### _config.yml中设置defaults
    我们可以在全局配置文件`_config.yml`中设置文章的统一配置，从而避免在每篇文章中设置的繁琐操作。
    ```
    defaults:
    - 
        scope: 
            path: "docs/getting-started"
            type: "test"
        values:
            layout: "docs"
            toc: true
            group: "getting-started"
    - 
        scope: 
            path: "docs/develop-docs"
        values:
            layout: "docs"
            toc: true
            group: "develop-docs"
    ```
    defaults标签下包含键值对的数组，每个数组代表一个统一配置。
    - scope表示作用域，属性值会应用到scope下的文章中。path,type
    - values表示需要设置的属性值，包含预设属性和自定义属性。