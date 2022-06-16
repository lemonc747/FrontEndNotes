## Q1.安装过程下载超时Downloading tmp-50552-0-electron-v4.2.12-darwin-x64.zip Error: read ETIMEDOUT

方法1：手动下载，然后放到指定目录
1. 在[electron-releases](https://github.com/electron/electron/releases)中，下方的`Assets`中找到对应版本-平台的文件，并下载
2. 



### 缓存目录说明 （4.2.12版本目前有效）
Electron官方提供了一个该情况的解决方法，可以选择手动下载该安装包存放在本地目录中代替网络下载。缓存包包括了名为electron-v4.0.6-darwin-x64.zip与SHASUMS256.txt-4.0.6的两个文件，这里以在Mac上安装v4.0.6版的Electron为例，可以根据使用的具体版本及平台改变文件名中对应的字段。

首先，需要到Electron的Github发布页面下载上述两个文件，下载地址为https://github.com/electron/electron/releases/tag/vVERSION，根据安装的版本更改VERSION字段。例如安装v4.0.6版本可以前往https://github.com/electron/electron/releases/tag/v4.0.6下载。在下载完成后，需要将两个文件拷贝到Electron的缓存文件夹。不同平台的缓存文件夹位置如下所述。

- Linux: $XDG_CACHE_HOME或~/.cache/electron/
- MacOS: ~/Library/Caches/electron/
- Windows: $LOCALAPPDATA/electron/Cache或~/AppData/Local/electron/Cache/
老版本Electron的缓存文件夹可能会位于~/.electron中

另外，也可以通过设置ELECTRON_CACHE环境变量指定一个新的缓存文件夹位置。在完成上述操作后，重新运行npm即可完成Electron的安装。

2019/12/24更新
由于@electron/get包的修改，使上文中方法无效。解决方式为使用ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/" npm install electron命令安装。