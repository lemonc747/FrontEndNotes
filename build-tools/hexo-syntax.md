
---
title: hexo入门与基础语法
date: 2017-01-01
categories: utils
tags: 
- hexo
- blog
---
介绍Hexo的安装和使用基础，适合新入坑的小白
给大家介绍下，这是我老婆@wonder woman :D
![](/images/wonder-woman.jpg)
<!--more-->

## 入门
### 安装与创建项目
1. 安装git和node.js，确保git和npm命名有效
2. 安装hexo：$ npm install -g hexo-cli
3. 创建新的项目
```
$ hexo init <folder>
$ cd <folder>
$ npm install
```
4. 修改配置文件_config.yml，参考[配置|Hexo](https://hexo.io/zh-cn/docs/configuration.html)。如果你是新手可以先不跳过，正常启动项目并熟悉后再定制
5. 安装服务器 $ npm install hexo-server --save ，就可以启动项目了 $ hexo server（ -p 5000），默认4000端口
5. 生成器：生成静态文件 $ hexo generate (--watch)
6. 生成&部署
    - 配置config中的deplog，并安装对应部署工具，例如git：$ npm install hexo-deployer-git --save
    ```
    # Deployment
    ## Docs: https://hexo.io/docs/deployment.html
    deploy:
        type: git
        repo: https://github.com/secretObserve/secretObserve.github.io
        branch: master
    ```
    - 生成后自动部署：$ hexo generate --deploy 或 $ hexo g -d

### 踩坑
1. YAML依靠缩进来确定元素间的从属关系。因此，请确保每个deployer的缩进长度相同，并且使用空格缩进。

### layout
Hexo 有三种默认布局：post、page 和 draft，分别对应路径source/_posts，source，source/_drafts
### Front-matter
Front-matter 是文件最上方以 --- 分隔的区域，用于指定单个文件的变量
- 参数	描述	默认值
- layout	布局
- date	建立日期	文件建立日期
- updated	更新日期	文件更新日期
- comments	开启文章的评论功能	true
- tags	标签（不适用于分页）
- categories	分类（不适用于分页）

### 分类和标签 categories&tags
- 分类具有顺序性和层次性：Hexo多个分类按顺序是父子关系（而非同级关系）
- 而标签没有顺序和层次

### 标签插件（Tag Plugins）
- API: 参考https://hexo.io/zh-cn/docs/tag-plugins.html
- 引用块：quote
- 代码块： code
- image:{% img [class names] /path/to/image [width] [height] [title text [alt text]] %}

### 资源文件夹
- 设置：post_asset_folder: true，之后在你hexo new layout title创建文章时会创建资源文件夹目录
![](/images/wonder-woman.jpg)
### 相对路径引用的标签插件
```
{% asset_path slug %}
{% asset_img slug [title] %}
{% asset_link slug [title] %}
```
正确的引用图片方式是使用下列的标签插件而不是 markdow
```
{% asset_img example.jpg This is an example image %}
```
### 数据文件
可以保存持久数据，此功能会载入 source/_data 内的 YAML 或 JSON 文件


