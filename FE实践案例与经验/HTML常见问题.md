# input type=file引入文件卡顿
只有chrome才会卡顿
### 问题的原因
但是到底是为什么会这么卡呢？？我查了查万能的Stack Overflow→_→

原来是因为Chrome的SafeBrowsing功能会在上传或保存时检查文件，
如果网络连接到google的速度比较快呢，就没有什么问题。
但是如果连接比较慢，或者干脆跪掉了，那SafeBrowsing就会让Chrome挂起一段时间，直到文件检查结束或者超时

使用accept="image/png, image/jpeg, image/gif"就可以解决这个问题，因为这些MIME类型在SafeBrowsing的白名单里面，不需要检查。
但是如果用像是accept="image/*"这样的呢，就不行了，就有可能变得卡卡的。
