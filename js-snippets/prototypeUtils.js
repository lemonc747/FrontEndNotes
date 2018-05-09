//***********************************扩展一些原生的方法**********************************
//---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
//---------------------------------------------------
Date.prototype.format = function (formatStr) {
    formatStr = formatStr || "yyyy-MM-dd HH:mm:ss";
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    var month = this.getMonth() + 1;
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/MM/, month > 9 ? month + '' : '0' + month);
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    return str;
};

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 ** 乘法函数，用来得到精确的乘法结果
 **/
Number.prototype.mul = function (num) {
    var m = 0, s1 = this.toString(), s2 = num.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};


/**
 ** 除法函数，用来得到精确的除法结果
 **/
Number.prototype.div = function (num) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = this.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        t2 = num.toString().split(".")[1].length;
    }
    catch (e) {
    }
    r1 = Number(this.toString().replace(".", ""));
    r2 = Number(num.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
};
// ***************************************** 字符串
// 匹配结尾
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    return this.substring(this.length - str.length) == str;
};
// 匹配开始
String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    return this.substr(0, str.length) == str;
};
//
String.prototype.contains = function (str) {
    return this.indexOf(str) > -1;
};


// ***************************************** 数组
// 批量设置数组中对象里的值
Array.prototype.setBatch = function (key, value) {
    for (var i = 0; i < this.length; i++) {
        var obj = this[i];
        if (obj == null && typeof(obj) != "object") {
            throw new Error("index:" + obj + " not object data error : " + JSON.stringify(obj));
        }
        obj[key] = value;
    }
    return -1;
};
