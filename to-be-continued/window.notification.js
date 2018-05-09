
// web api
if("Notification" in window){
    Notification.requestPermission().then(function(){
      var notification = new Notification("您有一条新的日程推送消息",{body: "跳转到指定窗口"});
      notification.onclick = function(event){
        //阻止默认事件：？？？  
        event.preventDefault;
        //可直接打开通知notification相关联的tab窗口
        window.focus();
        //window.open('http://www.mozilla.org', '_blank');    
      };
    })
  }