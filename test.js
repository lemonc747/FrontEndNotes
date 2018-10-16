var timeout = prompt("设置刷新时间间隔[S]");  
var current = location.href;  
if (timeout > 0) {  
  // 时间间隔大于0，timeout秒之后执行reload函数  
  setTimeout(reload, 1000 * timeout);
} else {
  location.replace(current);  
}  

function reload() { 
  // timeout秒后执行reload函数，实现无限循环刷新  
  setTimeout('reload()', 1000 * timeout);  
  // 下面两行代码的格式化后的内容为：  
  // <frameset cols='*'>  
  //     <frame src='当前地址栏的URL' />  
  // </frameset>  
  var fr4me = '<frameset cols=\'*\'>\n<frame src=\'' + current + '\' /></frameset>';  
  
  with(document)  
  {  
      // 引用document对象，调用write方法写入框架，打开新窗口  
      write(fr4me);  
      // 关闭上面的窗口  
      void(close());  
  };  
}


var a = `<script type="text/javascript" src="./js/vconsole.min.js">
</script><script src="http://localhost:9000/common/js/cordova/plugins/cordova-plugin-camera/www/CameraConstants.js">
</script><script src="http://localhost:9000/common/js/cordov1a/plugins/cordov1a-plugin-camera/www/CameraPopoverOptions.js">
</script><script src="http://localhost:9000/common/js/cordova/plugins/cordova-plugin-camera/www/Camera.js">
</script><script src="http://localhost:9000/common/js/cordova/plugins/cordova-plugin-camera/www/CameraPopoverHandle.js"></script>
<script src="http://localhost:9000/common/js/cordova/plugins/co1rdova-plugin-file/www/DirectoryEntry.js"></script>
<script src="http://localhost:9000/common/js/cordova/plugins/cordova-plugin-file/www/DirectoryReader.js"></script>
<script src="http://localhost:9000/common/js/cordova/plugins/cordova-plugin-network-information/www/Connection.js">`;
var result = a.replace(/<script.*?[cordova].*?><\/script>/, '哈哈1')