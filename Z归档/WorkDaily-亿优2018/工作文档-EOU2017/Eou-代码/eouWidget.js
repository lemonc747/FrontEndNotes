
/**
 * 基于框架的自定义html组件
 *
 * @based-on
 *      jquery >> bootstrap >> beyond 依次依赖
 *      layer弹窗
 */

var EouWidget = {};
/**
 * TOP排名
 *
 * @param params
 *     {
 *          data: {name\String, value\String Or Number},
 *          class: String,
 *          callback: function
 *     }
 *
 * @param styleClass
 *            css样式类，主要设置每行的高度
 * @param tabId/toolsId/tabBtnId:
 *            switchTabAndTools方法的三个参数，用于更多按钮点击时切换tab页面。
 * @returns {String}
 */
EouWidget.getTopRankHtml = function (tops, styleClass, tabId, toolsId, tabBtnId){
    var topDivHtml = "<div class='orders-container' style='position:inherit;'><ul class='orders-list' style='background-color: #FBFBFB'>";
    for(var i = 0; i<tops.length; i++){
        topDivHtml +="<li class=\"order-item\"><div class=\"row "+ styleClass +"\"><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left\"><span class=\"item-booker\">";
        topDivHtml +=tops[i].name+"</span></div><div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right\"><div class=\"item-booker\" style=\"text-align: right;\"><span class=\"currency\">";
        topDivHtml += tops[i].value+"</span><span class=\"price\">";
        topDivHtml +="</span></div></div></div></li>";
    }
    for ( var i = tops.length; i < 10; i++) {
        topDivHtml +="<li class=\"order-item\"><div class=\"row "+ styleClass +"\"><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left\"><span class=\"item-booker\">-";
        topDivHtml +="</span></div><div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right\"><div class=\"item-booker\" style=\"text-align: right;\"><span class=\"currency\">";
        topDivHtml +="</span><span class=\"price\"></span></div></div></div></li>";
    }
    topDivHtml +="<li class=\"order-item\"><div class=\"row\" style=\"height:21px;line-height:21px\"><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left\"><span class=\"item-booker\">";
    topDivHtml +="</span></div><div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right\"><div class=\"item-booker\" style=\"text-align: right;\"><span class=\"currency\">";
    topDivHtml +="</span><span class=\"price\"><button class=\"btn btn-palegreen btn-sm pull-right\" onclick='switchTabAndTools(\""+tabId+"\",\""+toolsId+"\",\""+tabBtnId+"\")'>"
        +$.i18n("status.cdrNew.info29")+"</button></span></div></div></div></li>";
    topDivHtml +="</ul></div>";
    return topDivHtml;
};


// EouWidget._switchTabAndTools = function(tableId, toolsId, tabBtnId){
//     var $table = $("#"+tableId);
//     if($table.length>0){
//         if( $table.hasClass("flag-table-init")){
//             queryTableDataModel(tableId, '1');
//         }else{
//             InitTableModuleWithId(tableId);
//         }
//     }
//     $(".flag-tools").hide();
//     $(".flag-tabs").hide();
//     if(tableId)
//         $table.show();
//     if(toolsId)
//         $("#"+toolsId).show();
//     if(tabBtnId){// 适配“更多”按钮
//         $(".flag-tabs-btn").removeClass("active");
//         $("#"+tabBtnId).addClass("active");
//     }
// };