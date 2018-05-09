#### Js - Dom原生对象和jQuery对象的联系、区别、相互转换：
jQuery对象转成DOM对象---两种转换方式：[index]和.get(index)
- jQuery对象是一个数据对象，通过[index]的方法如：    
    var $v = $("#v") ; //jQuery对象
    var v = $v[0]; //DOM对象
    alert(v.checked) //检测这个checkbox是否被选中
- jQuery本身提供，通过.get(index)方法如：    
    var $v = $("#v"); //jQuery对象
    var v = $v.get(0); //DOM对象
    alert(v.checked) //检测这个checkbox是否被选中

DOM对象转成jQuery对象: 对于DOM对象，只需用$()把DOM对象包装起来，就可得到jQuery对象    
　　如：var v=document.getElementById("v"); //DOM对象
　　var $v=$(v); //jQuery对象    
    需要注意：jQuery无法使用DOM对象的任何方法，同理DOM对象也不能使用jQuery里的方法. 乱用会影响代码执行。
#### jquery如何判断隐藏显示？
	$("#id").is(':visible');            true 为显示 false 为隐藏
$("#id").is(":hidden");         true 为隐藏 false 为显示
jQuery("#tanchuBg").css("display")

#### bootstrapValidator提示Maximum call stack size exceeded？
    我的form中确实没有用form-group，看来bootstrapValidator的form校验此css样式是必须的。更正如下：