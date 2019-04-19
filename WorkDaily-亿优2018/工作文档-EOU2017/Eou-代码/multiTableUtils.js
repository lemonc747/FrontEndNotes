/**
 * 2016.6.16
 * gaoyouan
 * Eoutable Template Utils 表格工具类
 *
 *
 *
 */

/**
 * **************************** 中英文，验证提示语 模仿mycommen.js begin
 */
var tableValidator_zh_CN = {
    "notEmpty": "必选字段",
    "remote": "请修正该字段",
    "emailAddress": "请输入正确格式的电子邮件",
    "uri": "请输入合法的网址",
    "date": "请输入合法的日期",
    // "dateISO": "请输入合法的日期 (ISO).",
    "numeric": "请输入合法的数字",
    "integer": "只能输入整数（包括0，正整数和负整数）",
    "decimals": "小数位不能超过{0}位数",
    "authNum": "鉴权数量过载：剩余{0}，可鉴权总数{1}",
    "authUrlFormat": "URL格式：协议(仅支持http和https)+地址+端口号(可省略)，英文冒号分隔",
    "digits": "只能输入正整数",
    "creditcard": "请输入合法的信用卡号",
    // "equalTo": "请再次输入相同的值",
    // "accept": "请输入拥有合法后缀名的字符串",
    // "maxlength": "请输入一个长度最多是 {0} 的字符串",
    // "minlength": "请输入一个长度最少是 {0} 的字符串",
    "stringLength": "请输入一个长度介于 {0} 和 {1} 之间的字符串",
    "between": "请输入一个介于 {0} 和 {1} 之间的值",
    "lessThan": "请输入一个最大为 {0} 的值",
    "greaterThan": "请输入一个最小为 {0} 的值",
    "regexp": "输入值不符合正则表达式",
    "htmlChar": "文本包含不允许的特殊字符，例如\"、\'、\>、\<、\\等"
};

var tableValidator_en_US = {
    "notEmpty": "This field is required.",
    "remote": "Please fix this field.",
    "emailAddress": "Please enter a valid email address.",
    "uri": "Please enter a valid URL.",
    "date": "Please enter a valid date.",
    // "dateISO": "Please enter a valid date ( ISO ).",
    "numeric": "Please enter a valid number.",
    "integer": "Please enter only integer.",
    "decimals": "Decimal places, no more than {0} digits",
    "authNum": "鉴权数量过载：剩余{0}，可鉴权总数{1}",
    "authUrlFormat": "URL格式：协议(仅支持http和https)+地址+端口号(可省略)，英文冒号分隔",
    "digits": "Please enter only digits.",
    "creditcard": "Please enter a valid credit card number.",
    // "equalTo": "Please enter the same value again.",
    // "accept": "Please enter a string with a legitimate suffix",
    // "maxlength": "Please enter no more than {0} characters." ,
    // "minlength": "Please enter at least {0} characters." ,
    "stringLength": "Please enter a value between {0} and {1} characters long.",
    "between": "Please enter a value between {0} and {1}.",
    "lessThan": "Please enter a value less than or equal to {0}.",
    "greaterThan": "Please enter a value greater than or equal to {0}.",
    "regexp": "The value you enter donesn't match the regexp. ",
    "htmlChar": "text contains special characters,eg\" \' \> \< \\ .etc"
}

var menuGroupComData =
    ["optgroup",
        ["主页", [["/index", "主页"], ["/home", "欢迎"], ["/login", "登录"], ["/logout", "注销"]]],
        ["基本设置", [["/frame/resource", "菜单页面"], ["/frame/user", "系统用户"], ["/frame/role", "角色权限"], ["/frame/blackList", "IP黑名单"], ["/frame/password", "修改密码"],
            ["/frame/audit", "操作审计"]]],
        ["系统管理", [["/sysconfig/configure", "系统配置"], ["/sysconfig/wifiArea", "地区管理"], ["/sysconfig/sMSTemplate", "短信模板"], ["/sysconfig/vns", "设备注册"],
            ["/sysconfig/version", "版本管理"], ["/sysconfig/sysSupplier", "供应商管理"], ["/sysconfig/agentManager", "代理商管理"], ["/sysconfig/consumerPkg", "消费套餐"]]],
        ["用户管理", [["/user/user", "注册用户"], ["/user/userTopupRcd", "充值记录"], ["/user/voicePkg", "语音套餐"], ["/user/dataPkg", "流量套餐"],
            ["/user/smsNew", "消息管理"], ["/user/feedback", "用户反馈"]]],
        ["数据业务", [["/vsw/vswExchangeSer", "卡交换服务"], ["/vsw/simPDevNew", "SimPool卡池"], ["/vsw/simCardNew", "流量卡管理"], ["/vsw/viFiDeviceNew", "UUWiFi设备"],
            ["/vsw/globalSIMNew", "启动卡管理"], ["/vsw/data-rate", "流量费率"], ["/vsw/cdrNew", "流量账单"]]],
        ["语音业务", [["/vpx/vpx", "软交换服务"], ["/vpx/trunk", "落地线路"], ["/vpx/outboundRoute", "呼叫路由"], ["/vpx/account", "注册的账号"], ["/vpx/online-user", "app在线分布图"],
            ["/vpx/goIPDevNew", "GoIP设备"], ["/vpx/rateNewVer", "通话费率"], ["/vpx/LaiXunAuth", "Sealion授权"]]],
        ["套餐管理", [["/packageConsume/dailyRental", "流量日租"], ["/packageConsume/trafficPkg", "流量套餐"], ["/packageConsume/consume", "流量资费"]]],
        ["统计报表", [["/count/countDaily", "每日统计"], ["/count/countMonthly", "月度统计"], ["/count/countAccessIP", "访问IP统计"]]],
        ["系统日志", [["/syslog/fs/webmin", "管理系统日志"], ["/syslog/fs/ws", "服务接口日志"], ["/syslog/fs/as", "计费系统日志"], ["/syslog/fs/api", "卡调度接口日志"],
            ["/syslog/fs/vns", "卡调度系统日志"], ["/syslog/fs/vsw", "卡交换系统日志"], ["/syslog/fs/vpx", "软交换呼叫日志"], ["/syslog/fs/msg", "消息系统日志"]]]
    ];

/** **************************** 中英文，验证提示语 end ************************* */

/**
 * 数据来源于国际化字段comdata，查询value对应的别名（文本信息），一般用于转换显示信息格式
 *
 * @param i18nComdataKey
 *            国际化字段comdata的key值
 * @param value
 *            匹配comdata的value
 * @returns value对应的alias信息
 */
var matchComdata2Alias = function (i18nComdataKey, value) {
    var tipsData = $.i18n(i18nComdataKey),
        len = tipsData.length;
    for (var i = 0; i < len; i++) {
        var tipData = tipsData[i];
        if (tipData && tipData.length >= 2 && tipData[0] == value) {
            return tipData[1];
        }
    }
    return value;
};
/**
 * 数据来源于Service，查询value对应的别名（文本信息），一般用于转换显示信息格式
 *
 * @params data service查询的key-value数组
 * @params value target value
 * @returns value对应的alias信息
 */
var matchServiceData2Alias = function (data, value) {
    var len = data.length,
        tipVal = "";
    for (var i = 0; i < len; i++) {
        var tipData = data[i];
        if (tipData[0] == value) {
            tipVal = tipData[1];
            break;
        }
    }
    return tipVal;
};
/**
 * @params key, 值, 宽度, 默认颜色
 * data:    二位数组，子数组包含3段：value值/tips文本/color颜色
 * @notice 1.value允许大小写差异 2.default: width & defaultColor
 */
var matchData2FormatSpan = function (i18nComdataKey, value, width, defaultColor) {
    var data = $.i18n(i18nComdataKey);
    if (data === null || value === "" || value === undefined)
        return "";
    var len = data.length,
        width = width ? width : 50,
        defaultColor = defaultColor ? defaultColor : "default";
    for (var i = 0; i < len; i++) {
        var childData = data[i];
        if (childData && childData.length >= 3 && compareStrIngoreCase(childData[0], value)) {
            return "<span style='width:" + width + "px;' class='label label-" + childData[2] + "'>" + childData[1] + "</span>";
        }
    }
    return "<span style='width:" + width + "px;' class='label label-" + defaultColor + "'>" + value + "</span>";
};

/**
 * 将秒数转换成时间
 */
var valFormat_int2time = function (value) {
    var formatTime = function (time) {
        if (time < 10)
            time = "0" + time;
        return time;
    }
    value = parseInt(value);
    if (value || value == 0) {
        if (value < 60) {
            value = "00:00:" + formatTime(value);
        } else if (value < 3600) {
            var min = parseInt(value / 60);
            var sec = value % 60;
            value = "00:" + formatTime(min) + ":" + formatTime(sec);
        } else {
            var hour = parseInt(value / 3600),
                hourN = value % 3600,
                min = parseInt(hourN / 60),
                sec = hourN % 60;
            value = formatTime(hour) + ":" + formatTime(min) + ":" + formatTime(sec);
        }
    }
    return value;
};

/**
 * 格式化时间
 * from  ms to days
 * @param timeVal
 * @returns {string}
 */
function getTimeValue(timeVal) {
    var result = "";
    if (timeVal === undefined || timeVal === null || timeVal === "") {
        timeVal = 0;
    }
    //毫秒转化为秒, 到底是毫秒还是秒
    // timeVal = timeVal/1000;
    if (timeVal >= 24 * 3600) {
        result += parseInt(timeVal / (24 * 3600)) + "days,";
        timeVal = timeVal % (24 * 3600 * 1000);
    }
    if (timeVal >= 60) {
        if (timeVal >= 3600) {

            result += (parseInt(timeVal / 3600) < 10 ? ("0" + parseInt(timeVal / 3600)) : parseInt(timeVal / 3600)) + ":";
            if (timeVal % 3600 > 0) {
                var t1 = timeVal % 3600;
                result += (parseInt(t1 / 60) < 10 ? ("0" + parseInt(t1 / 60)) : parseInt(t1 / 60)) + ":";
                if (t1 % 60 > 0) {
                    result += (t1 % 60 < 10 ? ("0" + t1 % 60) : t1 % 60);
                } else {
                    result += "00";
                }
            } else {
                result += "00:00";
            }
        } else {
            result += "00:" + (parseInt(timeVal / 60) < 10 ? ("0" + parseInt(timeVal / 60)) : parseInt(timeVal / 60)) + ":";
            if (timeVal % 60 > 0) {
                result += (timeVal % 60 < 10 ? ("0" + timeVal % 60) : timeVal % 60);
            } else {
                result += "00";
            }
        }
    } else {
        result += "00:00:" + (timeVal < 10 ? ("0" + parseInt(timeVal)) : parseInt(timeVal));
    }
    return result;
}


/**
 * 取小数点后位数, 用0填充不够的小数位
 *
 * @params x target value
 * @params y 需要取的位数
 * @returns {Number}
 */
function toDecimals(value, digits) {
    var number = parseFloat(value);
    digits = parseInt(digits);
    if (isNaN(number) || isNaN(digits)) {
        return value;
    }
    var ratio = Math.pow(10, digits);
    number = Math.round(number * ratio) / ratio;

    var result = number.toString();
    var rs = result.indexOf('.');
    if (rs < 0) {
        rs = result.length;
        result += '.';
    }
    while (result.length <= rs + digits) {
        result += '0';
    }
    return result
}

/**
 * comdata to select2 data
 * 支持嵌套选项
 * [{text:"", children:[{id:"", text:""},...]},...]
 * [["fajldfj", [[1,2],[3,4]...]],...]
 */
function comdata2S2Data(comData) {
    var arr = [];
    if (comData && comData.length > 1 && comData[0] == "optgroup") {
        //comData = comData[1];
        for (var i = 1, leni = comData.length; i < leni; i++) {
            var comDataGrp = comData[i];
            if (comDataGrp && comDataGrp.length == 2) {
                var optiongrp = {};
                optiongrp.text = comDataGrp[0];
                var child = comDataGrp[1];
                var childArr = [];
                for (var j = 0, lenj = child.length; j < lenj; j++) {
                    var option = {};
                    option.id = child[j][0];
                    option.text = child[j][1];
                    childArr.push(option);
                }
                optiongrp.children = childArr;
            }
            arr.push(optiongrp);
        }
    } else {
        for (var k = 0, len = comData.length; k < len; k++) {
            var option = {};
            option.id = comData[k][0];
            option.text = comData[k][1];
            arr.push(option);
        }
    }
    return arr;
}


/**
 * jquery ajax的一点儿小包装:来源于commonUtils
 *
 * @param param
 *            jquery 一样的 对象参数, 不设置则包装方法默认的参数
 * @returns {{state: string}|*}
 */
function Utils_ajax(param) {
    var loadInx = layer.load(2);
    $.ajax({
        url: param.url,
        type: param.type || "post",
        timeout: param.timeout || 20000, // 超时时间设置，单位毫秒
        async: param.async === undefined ? true : param.async,
        complete: param.complete || function (XMLHttpRequest, status) { // 请求完成后最终执行参数
            tableajaxComplete(XMLHttpRequest, status, loadInx);
        },// 请求完成后最终执行参数
        data: param.data || {},
        contentType: param.contentType, // 设置请求头信息
        dataType: param.dataType || "json",
        success: function (res) {
            try {
                if (res.state != 0)
                    return layer.msg.error("error:" + res.message);
            } catch (e) {
            }
            if (param.success)
                param.success(res);
            res.message && layer.msg.success(res.message);
        }
    });
}

function tableajaxComplete(XMLHttpRequest, status, loadInx) {
    layer.close(loadInx);
    if (status != 'success') {
        var errorMsg = status == 'parsererror' ? $.i18n("frame.tips.error.netWorkTimeout") : XMLHttpRequest.responseJSON.message;
        layer.msg.error(errorMsg);
        var isIntoLoginPage = status == "parsererror" && XMLHttpRequest.responseText.indexOf("login-container");
        if (isIntoLoginPage) {
            location.href = window.PATH + "/login"
        }
        console.error($.i18n("frame.tips.error.netWorkErrorInfo"));
        console.error(arguments);
    }
}

/**
 * SELECT2 Data Source : s2下拉框数据源实现类
 * @autor gya 2016.12.17
 * @param params
 *        tableId:
 *        selector:
 *        url:
 *        placeholder:
 *        allowClear
 *        colVal:
 *        formatResult:
 *            params: data && data.id,data.text,...其他附加参数
 *        formatSelection: tongshang
 *        selectE:    function(e)
 *            params: e/event &&  e.data
 *        //
 *        wifiAreaFM: 使用wifiArea地区列表数据源
 *
 *    @param tableKeyVal 该条数据的主键值
 *        额外加上主键值，是为了在特定需要时，确定这条的数据的唯一性，方便定位查找和修改这条数据
 *        只在编辑框弹出，初始化时使用，故需要判断
 *
 */
function select2DataImpl(params, selector, placeholder, tableKeyVal) {
    if (!(params && params.url && selector)) {
        return false
    }
    ;
    //完整地区的格式化:id-下拉框选项和结果
    if (params.wifiAreaFM) {
        params.formatResult = wifiAreaS2Format;
        params.formatSelection = wifiAreaS2Format;
    }
    var $selectDom = $(selector);
    $selectDom.select2({
        placeholder: params.placeholder || placeholder || "placeholder init failed.",
        language: window.LANGUAGE || params.language || "en_US",
        allowClear: params.allowClear || true,
        ajax: {
            url: params.url || "",
            delay: 250,
            dataType: 'json',
            type: "post",
            minimumInputLength: 0,
            minimumResultsForSearch: 10,
            data: function (data) {
                var result = {
                    query: data.term,
                    page: data.page || 1,
                    pageSize: data.pageSize || 20
                };
                //加入主键值
                if (tableKeyVal != null && tableKeyVal != "") {
                    result.tableKey = tableKeyVal;
                }
                //这里应该是动态获取，所以传入function更合适
                var qryData = params.queryParams;
                if (qryData) {
                    if (typeof qryData === "function") {
                        qryData = qryData();
                        for (var item in qryData) {
                            result[item] = qryData[item];
                        }
                    } else if (typeof qryData === "object") {
                        for (var item in qryData) {
                            result[item] = qryData[item];
                        }
                    }
                }

                return result;
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;
                params.pageSize = params.pageSize || 20;
                return {
                    results: data.data.items,
                    pagination: {
                        more: (params.page * params.pageSize) < data.data.totalCount
                    }
                };

            },
            cache: false
        },
        templateResult: params.formatResult || undefined,
        templateSelection: params.formatSelection || undefined
    });
    params.selectE && $selectDom.on("select2:select", params.selectE);

}

/**
 * 固定数据的select2
 * @param params
 */
function select2BaseImpl(params, selector, placeholder) {
    if (!selector || !params || !params.data) {
        return false;
    }
    //支持嵌套的select
    var arrayData = comdata2S2Data(params.data);
    var $selectDom = $(selector);
    $selectDom.select2({
        minimumResultsForSearch: params.minimumResultsForSearch || 8,
        allowClear: true,
        placeholder: placeholder || undefined,
        data: arrayData || undefined,
        //data 可另外定义数据
        templateResult: params.formatResult || undefined,
        templateSelection: params.formatSelection || undefined
    });
    params.selectE && $selectDom.on("select2:select", params.selectE);
}
/**
 * 直接通过数组初始化S2控件
 * @param params
 */
function select2BaseImplByArray(params, selector, placeholder) {
    var $selectDom = $(selector);
    $selectDom.select2({
        minimumResultsForSearch: 8,
        allowClear: true,
        placeholder: placeholder || undefined,
        data: params.data || undefined,
        templateResult: params.formatter || undefined,
        templateSelection: params.formatter || undefined
    });
    params.selectE && $selectDom.on("select2:select", params.selectE);
    $selectDom.val("").trigger("change");
}

/**
 * select2:完整地区显示的 选项和结果format
 * td: 表格中的地区格式化
 * @param data
 * @returns
 */
function wifiAreaS2Format(data) {
    var keyAreaId = data && data.id;
    var areaHtml = wifiAreaTdFormat(keyAreaId);
    return $(areaHtml);
}
function wifiAreaTdFormat(keyAreaId) {
    if (keyAreaId && keyAreaId === "N")
        return "-";//$.i18n("label.common.unknownArea");
    if (keyAreaId) {
        var areas = keyAreaId.split("."),
            country = areas.length >= 3 ? $.i18n("country." + areas[2]) : "",
            region = areas.length >= 4 ? $.i18n("cn.region." + areas[3]) : "",
            regionAndCity = areas.length >= 5 ? $.i18n("cn." + areas[3] + "." + areas[4]) : "";
        //版本更替，面向客户时，不匹配的信息一律隐藏或者处理掉，保证界面显示的正确。面向测试则显示所有信息
        if (country || region || regionAndCity) {
            var result = country + (regionAndCity ? "-" + regionAndCity.replace(".", "-") : (region ? "-" + region : ""));
            return "<span><i class='img-country country-" + areas[2] + "'></i>" + result + "</span>";
        }
        return "<span>" + keyAreaId + "</span>";//$.i18n("tips.select2QueryFailed")+
    }
    return keyAreaId || "<span>" + $.i18n("db.common.wifiArea.help") + "</span>";
}


/** ****************************************************************************************************** */


/**
 * 定时器TimerID
 *
 * @utils 定义一个命名空间, 定义一个常量，存储上一次的TimerID !!没有做闭包处理，请不要直接操作TimerID getter &
 *        setter & clearTimer: 设置&获取TimerID & 清除此定时器
 */
var MULTI_TABLE_TEMPL = {};
MULTI_TABLE_TEMPL.timerID = 0;
MULTI_TABLE_TEMPL.setTimerID = function (timerID) {
    MULTI_TABLE_TEMPL.timerID = timerID;
}
MULTI_TABLE_TEMPL.getTimerID = function () {
    return MULTI_TABLE_TEMPL.timerID;
}
MULTI_TABLE_TEMPL.stopCurrentTimer = function () {
    var timerID = MULTI_TABLE_TEMPL.getTimerID();
    clearInterval(timerID);
    clearTimeout(timerID);
    MULTI_TABLE_TEMPL.setTimerID(0);
}
// 关闭旧的timer，同时更新新的timerID——常用
MULTI_TABLE_TEMPL.stopAndUpdateTimer = function (timerID) {
    MULTI_TABLE_TEMPL.stopCurrentTimer();
    MULTI_TABLE_TEMPL.setTimerID(timerID);
}


/*********  伸缩详情页面 ********************/
/**
 * API
 * {
	 * 	id:	id,
	 //* 	size:	size,
	 * 	data:	[
	 *		{
	 *	 title:,
	 *	 data: function/string/object,
	 *	 remoteData: options( object params for ajax, ),
	 *   formatter: ,
	 *	 }
	 * 	],
	 *
	 */
    // modal结构的部分可以抽象出来
var createFlexDetailModal = function (options) {
        if (!(options && options.id && isArray(options.data)) || $("#" + options.id).length != 0)
            return;
        var id = options.id,
            commonKey = options.key,
            data = options.data,
            size = data.length;
        var $modal = $([
            '<div class="modal fade modal-primary " id="' + id + '"  role="dialog" aria-hidden="true">',
            '<div class="modal-dialog">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">',
            '<span aria-hidden="true">&times;</span></button>',
            '<h4 class="modal-title text-info"><i class="fa fa-list-alt" ></i>' + $.i18n("details") + '</h4>',
            '</div>',
            '<div class="modal-body bg-white no-padding" style="overflow-y:auto;max-height: 80vh;"></div>',
            '<div class="modal-footer">',
            '<button class="btn btn-danger" data-dismiss="modal" aria-label="Close">' + $.i18n("close") + '</button>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''));
        $("#pageDiv").append($modal);
        var $container = $("#" + id).find(".modal-body");
        for (var i = 0; i < size; i++) {
            var $detailPart = $([
                '<div class="detailParts">',
                '<div class="detailPartHeader"  data-expand="false" style="font-size: 14px;padding: 4px 12px;margin-left:3.56px;">',
                '<i class="fa fa-plus-square"></i>',
                '<i class="fa fa-minus-square" style="display:none"></i>',
                '<span></span>',
                '</div>',
                '<div class="detailPartBody" style="display:none">',
                '<table class="table table-bordered table-striped">',
                '<tbody></tbody>',
                '</table>',
                '</div>',
                '</div>'].join(''));
            $detailPart.find(".detailPartHeader span").append(i);
            $detailPart.find(".detailPartBody tbody").append(i);
            $container.append($detailPart);
        }
        $container.find(".detailParts").each(function (i, el) {
            var $header = $(this).find(".detailPartHeader"),
                $body = $(this).find(".detailPartBody"),
                obj = data[i],
                content = "";
            $header.find("span:first-of-type").html(obj.title);
            if (obj && typeof(obj.data) == "string") {
                content = obj.data;
            } else if (obj && typeof(obj.data) == "function") {
                content = obj.data();
            } else if (obj && typeof(obj.data) == "object") {
                content = initCommonDetailContent(obj.data, obj.i18n);
            }
            $body.find("tbody").html(content);
            $header.on("click", function () {
                var that = $(this),
                    expandFlag = that.data("expand");
                if (obj && obj.remoteData && !expandFlag) {
                    var remoteData = obj.remoteData,
                        key = remoteData.key ? remoteData.key : commonKey;
                    Utils.ajax({
                        url: window.PATH + remoteData.url,
                        type: obj.type || "post",
                        data: (typeof(key) == "function" ? key() : key),
                        success: function (res) {
                            res && $body.find("tbody").html(initCommonDetailContent(res.data, obj.i18n));
                        }
                    });
                }
                that.find("i").toggle();
                that.data("expand", !expandFlag);
                $body.slideToggle(250);
            });
        });
    };
//一般通用
var initCommonDetailContent = function (obj, i18n) {
    var content = "";
    $.each(obj, function (key, value) {
        var name = $.i18n("" + i18n + key) || $.i18n("db.common." + key) || key;
        //    childCon = "";
        //if( typeof value == "object" && value !=null){
        //    $.each(value, function(key1, value1) {
        //      childCon +=  '<tr><td class="text-right" width="32%">' + key1 +
        //          ': </td><td class="right-border-none"><div style="word-wrap:break-word;word-break: break-all;" class="f-p-tips">'+value1+'</div></td></tr>';
        //    })
        //}
        content += '<tr><td class="text-right" width="32%">' + name +
            ': </td><td class="right-border-none"><div style="word-wrap:break-word;word-break: break-all;" class="f-p-tips">' + value + '</div></td></tr>';
    });
    return content || ("<tr><td>" + $.i18n("label.table.noDataRecord") + "</td></tr>");
};
//show
function showFlexDetailModal(id) {
    $("#" + id).find(".modal-body").find(".detailParts").each(function (i, el) {
        var expandFlag = $(this).find(".detailPartHeader").data("expand");
        if ((i == 0 && !expandFlag) || (i > 0 && expandFlag)) {
            $(this).find(".detailPartHeader").trigger("click");
        }
    });
    $modal = $("#" + id).modal({backdrop: 'static'});
    //$("#"+ id).modal("hide");
}


/** ************************************************************************************************************************************************* */
/**
 * 上传下载 导出csv文件的方法，来源于../../assets/js/utils/commonUtils
 *
 * @param name
 * @param data
 * @returns
 */
function importCsvModel(tableId) {
    var $this = $("#" + tableId + "_importCsv");
    $this = $this ? $this[0] : undefined;
    if ($this.files.length) {
        var reader = new FileReader();
        reader.onload = function () {
            var csvStr = this.result;
            checkDevCsvFile(csvStr, tableId) && importCsvRequest(csvStr, tableId);
        };
        reader.readAsText($this.files[0]);
    }
    // 重置change事件
    $("#" + tableId + "_importCsv").replaceWith($("#" + tableId + "_importCsv").clone(true));
}
function importCsvRequest(csvStr, tableId) {
    var requestUrl = getLSDataChild(tableId, "urlPrefix");
    $.ajax({
        url: requestUrl + "/importCsv.ajax",
        type: "post",
        data: {csvStr: csvStr},
        success: function () {
            // return dosearch8('1'); //查询列表
        }, error: function () {

        }
    });
}
// vifidevicenew 单独用的方法，还需要抽象出来
function checkDevCsvFile(csvStr, tableId) {
    var tbI18n = getLocalStorageModel(tableId, "tableParams").i18nPrefix;

    //var tableCVSHead = ["keyDevID","idxViFiID","pwd","idxDevGrpID","idxVNSID","devState","idxAgentID","debugIdt",
    //	"hardwareVer","firmwareVer","softwareVer","idxUserId"];//抽象化，作为参数保留
    ////校验：通过表格参数校验
    //var tabCVSHeadLength = tableCVSHead.length;

    var CVS_HEAD = "keyDevID,idxViFiID,pwd,idxDevGrpID,idxVNSID,devState,idxAgentID,debugIdt,hardwareVer," +
            "firmwareVer,softwareVer,idxUserId",
        CVS_HEAD_LEN = 12;
    var csvRows = csvStr.split(/\r\n|\r|\n/);
    var csvRow1 = csvRows[0] || "";
    if (csvRow1 != CVS_HEAD) {
        layer.msg.error("csv data error, title = " + CVS_HEAD);
        return false;
    }
    // for (var i = 1; i < csvRows.length; i++) {
    //     var csvRow = csvRows[i];
    //     var row = csvRow.split(",");
    //     if(",,,,,,,,,," == row || row ==""){
    //         continue;
    //     }
    //     if (row.length != CVS_HEAD_LEN && row.length != 1) {
    //         layer.msg.error("csv data error, data line:" + (i + 1) + " error :" + csvRow + ",row len" + row.length);
    //         return false;
    //     }
    //     // VNS 服务器
    //     var vnsSelData = selectPermissionsInfo.vnsSelData;
    //     if (isRowBoolean(vnsSelData, row[4])) {
    //         layer.msg.error("csv data error, data line:" + (i + 1) + " error : idxVNSID");
    //         return false;
    //     }
    //     // 状态
    //     var i18nTextQryType = $.i18n(tbI18n + "devState.comData");
    //     if (isRowBoolean(i18nTextQryType, row[5])) {
    //         layer.msg.error("csv data error, data line:" + (i + 1) + " error : devState");
    //         return false;
    //     }
    //     // 代理商
    //     var agentSelData = selectPermissionsInfo.agentSelData;
    //     if (isRowBoolean(agentSelData, row[6])) {
    //         layer.msg.error("csv data error, data line:" + (i + 1) + " error : idxAgentID");
    //         return false;
    //     }
    //     // 硬件版本
    //     var hardwareVerSelData = selectPermissionsInfo.hardwareVerSelData;
    //     if (isRowBoolean(hardwareVerSelData, row[8])) {
    //         layer.msg.error("csv data error, data line:" + (i + 1) + " error : hardwareVer");
    //         return false;
    //     }
    //     // 固件版本
    //     var firmwareVerSelData = selectPermissionsInfo.firmwareVerSelData;
    //     if (isRowBoolean(firmwareVerSelData, row[9])) {
    //         layer.msg.error("csv data error, data line:" + (i + 1) + " error : firmwareVer");
    //         return false;
    //     }
    //     // 系统版本
    //     var softwareVerSelData = selectPermissionsInfo.softwareVerSelData;
    //     if (isRowBoolean(softwareVerSelData, row[10])) {
    //         layer.msg.error("csv data error, data line:" + (i + 1) + " error : softwareVer");
    //         return false;
    //     }
    // }
    return true;
}

// function isRowBoolean(setData, rowVal) {
//     var flag = true;
//     try {
//         if (setData != null) {
//             for (var i = 0; i < setData.length; i++) {
//                 if (setData[i][0] == rowVal) {
//                     flag = false;
//                     break;
//                 }
//             }
//         }
//     } catch (e) {}
//     return flag;
// }

// function exportTempCsvModel(tableId){
//     var requestUrl = getLSDataChild(tableId, "urlPrefix")
//
//     $.ajax({
//         url: requestUrl + "exportTempCsv.ajax",
//         type:"post",
//         success: function(res) {
//             if(res && res.data){
//                 return exportRowModel(tableId+ 'Template.csv', res.data);
//             }
//             return layer.msg.error("No Data.");
//         }
//     });
// }

function exportCsvModel(tableId) {
    var tableParams = $("#" + tableId).data(KEY_TABLE_ITEMS);
    var localStrg = getLocalStorageModel(tableId, "localStrg"),
        sorts = localStrg.sorts || [];
    var searchParams = getSearchParamsAndSorts(tableId, tableParams.trs, sorts);
    $.ajax({
        url: window.PATH + tableParams.initParams.urlPrefix + "exportCsv.ajax?pageSize=50000",//?pageSize=" + pageSize + "&page="+page
        type: "post",
        data: searchParams,
        success: function success(res) {
            if (res && res.data) {
                return exportRowModel(tableId + new Date().format("yyyy-MM-dd_HH_mm_ss") + '.csv', res.data);
            }
            return layer.msg.error("No Data.");
        }
    });
}

//创建下载节点并模拟点击
var exportRowModel = function (name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var exportBlob = new Blob(["\ufeff" + data], {type: 'text/csv,charset=UTF-8'});
    var saveLink = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    saveLink.href = urlObject.createObjectURL(exportBlob);
    saveLink.download = name;
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
    saveLink.dispatchEvent(ev);
};

/** *********************************************************************************************** */





    
    