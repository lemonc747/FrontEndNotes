### img
先注册事件，然后赋值src！！！！
```js
const img = document.createElement('img');
const imgSrc = (userData.avatarUrl.startsWith('http') ? '' : avatarServiceUrl) + userData.avatarUrl;
img.onload = function avatarOnload() {
  $(this).parent().addClass('xdt-showImg');
};
img.onerror = function avatarOnerror() {
  this.src = imgSrc;
};
$avatar.append(img);
img.src = imgSrc;
if (img.complete) {
  $avatar.addClass('xdt-showImg');
}
```

### 移动端表情和输入框流畅切换
相关：1.获取虚拟键盘高度

### 绑定事件时，命名空间区分同名事件


### 数据框动态效果

隐藏  》 表情 》 聚焦

1. 隐藏》聚焦：bottom默认行为即可
2. 聚焦》表情：bottom~

失焦状态，表情动态变化即可
3. 表情》隐藏：
4. 隐藏》表情：

5. 聚焦 - 表情：
bottom-144 > top-focus > top-emoji > bottom-0

在动画完成时，切换为bottom状态，保证收起键盘时输入框自动下降

## 匹配@{'id':'94964d8d-f5ef-46fa-8ff4-c22ff41d0ad0','name':'程爱民','type':0}

```js

   var str ="hahaha@{'id':'94964d8d-f5ef-46fa-8ff4-c22ff41d0ad0''name':'发''type':0}haha";
  str.replace(/@\{[id':]+[\w-]+[name':,]+[\u4e00-\u9fa5]+[type':,]+\d+\}/, function(str){
    return '<PEOPLE>';
  });

```

### 输入框聚焦时，游标位置的控制
