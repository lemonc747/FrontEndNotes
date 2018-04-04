
function InitTableMoudle(tableId, toolsAreaId, urlPrefix, params, permissions, page, customSearchWidget) {
    if (params) {
        params.initParams = {};
        params.initParams.tableId = tableId;
        params.initParams.toolsId = toolsAreaId;
        params.initParams.urlPrefix = urlPrefix;
        params.initParams.permissions = permissions;
        params.initParams.page = page;
    }
    if (CheckAndInitStorage(params)) {
        createDatatable(params, customSearchWidget);
    } else {
        layer.msg.error("Table params is error!");
    }
}

function InitTableModuleNew(params) {
    if (CheckAndInitStorage(params)) {
        createDatatable(params);
    } else {
        layer.msg.error("Table params is error!");
    }
}

function InitTableModuleWithId(tableId) {
    if (checkLocalStorage(tableId)) {
        var params = $("#" + tableId).data(KEY_TABLE_ITEMS);
        createDatatable(params);
    } else {
        // TODO 切换标签页，概要信息页会走到这里，不合规范
        //layer.msg.error("Table localStorage is empty!");
    }
}

function CheckAndInitStorage(params) {
    // 检查table参数是否完整有效
    var initParams = params && params.initParams ? params.initParams : {};
    var tableId = initParams.tableId,
        toolsId = initParams.toolsId,
        urlPrefix = initParams.urlPrefix,
        permissions = initParams.permissions;
    if (!params || !tableId || !toolsId || !urlPrefix || !permissions) {
        return false;
    }
    var newParams = formatTableParams(params),
        localStrg = newParams.localStrg,
        oldStorage = getLocalStorageModel(tableId, KEY_TABLE_LS),
        $table = $("#" + tableId);
    $table.data(KEY_TABLE_ITEMS, newParams);
    if (!(oldStorage && (!(oldStorage.version || localStrg.version)
        || (oldStorage.version && localStrg.version && oldStorage.version == localStrg.version)))) {
        initLocalStorage(tableId, localStrg);
    }
    return true;
}

function formatTableParams(tableItems) {
    var items = tableItems.trs,
        len = items.length,
        tableKey = tableItems.tableKey,
        i18nPrefix = tableItems.i18nPrefix,
        urlPrefix = window.PATH + tableItems.initParams.urlPrefix,
        customComps = tableItems.customComps,
        newItems = [],
        showCols = [],
        localStrg = {};
    for (var i = 0; i < len; i++) {
        var item = items[i],
            name = item.name,
            width = item.width,
            vali = item.vali;
        if (!(item.show === false)) {
            item.show = true;
        }
        if (item.sort || item.name == tableKey) {
            item.sort = true;
        }
        if (!width || isNaN(Number(width))) {
            item.width = 100;
        }
        // 新增编辑组件的初始化
        // comType & qryType的初始化，qryType取自前者；
        if (item.comType == "select") {
            // 兼容：将数组转换成object的格式
            if (!item.comData || isArray(item.comData)) {
                var oldData = item.comData;
                item.comData = {};
                item.comData.data = oldData || $.i18n(i18nPrefix + name + ".comData");
            } else {
                if (!item.comData.data) {
                    item.comData.data = $.i18n(i18nPrefix + name + ".comData")
                }
            }
        }
        if (item.comType == "ajaxSelect") {
            item.comDataS2.url = urlPrefix + item.comDataS2.url;
            item.comDataS2.editInit = item.comDataS2.editInit !== false;
        }
        if (item.qryType == "select") {
            if (!item.qryData || isArray(item.qryData)) {
                var oldQryData = item.qryData;
                item.qryData = {};
                item.qryData.data = oldQryData || $.i18n(i18nPrefix + name + ".comData");
            } else {
                if (!item.qryData.data) {
                    item.qryData.data = $.i18n(i18nPrefix + name + ".comData")
                }
            }
        }
        if (item.qryType == "ajaxSelect") {
            item.qryDataS2.url = urlPrefix + item.qryDataS2.url;
            item.qryDataS2.editInit = item.qryDataS2.editInit !== false;
        }
        // 用comType相关值填充qryData
        if (!item.qryType && item.comType) {
            item.qryType = item.comType;
            if (item.qryType == "select") {
                item.qryData = Object.create(item.comData)
            }
            if (item.qryType == "ajaxSelect") {
                item.qryDataS2 = Object.create(item.comDataS2)
            }
        }
        if (!(vali && vali.required === false)) {
            if (!vali)
                item.vali = {};
            item.vali.required = true;
        }
        if (vali && vali.date) {
            // 日期同时设置搜索和新增编辑的comType
            item.qryType = item.qryType || item.comType || "date";
            item.comType = item.comType || item.qryType || "date";
            if (!vali.dateFormat) {
                item.vali.dateFormat = "YYYY-MM-DD hh:mm:ss";// "YYYY/DD/MM
                // hh:mm:ss";?8.16改动，不确定是否正确
            }
        }
        if (item.qryType == "date") {
            item.qryDateFormat = item.qryDateFormat || "YYYY-MM-DD hh:mm:ss";
        }
        // disabled="A",适用于表格主键自增长的情况
        if (item.name == tableKey && (!item.hideEdit) && (!item.disabled)) {
            item.disabled = "E";
        }
        // 设置显示列的本地存储
        showCols.push([item.name, item.show]);
        newItems.push(item);
    }
    tableItems.trs = newItems;
    // 组装localStrg
    localStrg.version = tableItems.version;
    localStrg.pageSize = tableItems.pageSize;
    localStrg.sorts = tableItems.sorts || [];
    localStrg.showCols = showCols;
    localStrg.resetCols = showCols;
    localStrg.customComps = customComps;
    localStrg.urlPrefix = urlPrefix;
    tableItems.localStrg = localStrg;

    return tableItems;
}

var KEY_TABLE_LS = "localStrg",
    KEY_TABLE_ITEMS = "tableParams",
    KEY_TABLE_CONTENT = "queryData",
    KEY_LS_SHOWCOLS = "showCols",
    KEY_LS_RESETCOLS = "resetCols",
    KEY_LS_VERSION = "version";

function setLocalStorageModel(tableId, keyWord, data) {
    if (!tableId || !keyWord || !data)
        return false;
    var storage = window.localStorage;
    var KEY_WORD = "config." + keyWord + "." + tableId;
    if (typeof data == "string") {
        storage.removeItem(KEY_WORD);
        storage.setItem(KEY_WORD, data);
    } else if (typeof data == "object") {
        storage.removeItem(KEY_WORD);
        storage.setItem(KEY_WORD, JSON.stringify(data));
    }
}
function getLocalStorageModel(tableId, keyWord) {
    var KEY_WORD = "config." + keyWord + "." + tableId;
    var storage = window.localStorage;
    var data = storage.getItem(KEY_WORD);
    if (data != null && data != "") {
        if (data.indexOf("{") != -1 || data.indexOf("[") != -1) {
            data = JSON.parse(data);
        }
        return data;
    }
    return "";
}

function getLSDataChild(tableId, keyWord) {
    var localStrg = getLocalStorageModel(tableId, KEY_TABLE_LS);
    if (!localStrg || typeof localStrg !== "object") {
        return false
    }
    return localStrg[keyWord];
}
function setLSDataChild(tableId, keyWord, data) {
    var key = "config." + KEY_TABLE_LS + "." + tableId,
        storage = window.localStorage,
        localStrg = getLocalStorageModel(tableId, KEY_TABLE_LS);
    if (!tableId || !keyWord || !data || !localStrg || typeof localStrg !== "object")
        return false;
    localStrg[keyWord] = data;
    storage.removeItem(key);
    storage.setItem(key, JSON.stringify(localStrg));
}

function initLocalStorage(tableId, lsData) {
    if (!lsData || typeof lsData !== "object") {
        return false
    }
    var localStrgKey = "config." + KEY_TABLE_LS + "." + tableId,
        storage = window.localStorage;
    storage.removeItem(localStrgKey);
    storage.setItem(localStrgKey, JSON.stringify(lsData));
}

function checkLocalStorage(tableId) {
    var params = $("#" + tableId).data(KEY_TABLE_ITEMS),
        initParams = (params && params.initParams) || {},
        //tableId = initParams.tableId,
        toolsId = initParams.toolsId,
        urlPrefix = initParams.urlPrefix,
        permissions = initParams.permissions;
    return ( tableId && toolsId && urlPrefix && permissions);
}

function switchTabAndTools(tableId, toolsId, tabBtnId) {
    var $table = $("#" + tableId);
    if ($table.length > 0) {
        if ($table.hasClass("flag-table-init")) {
            queryTableDataModel(tableId, '1');
        } else {
            InitTableModuleWithId(tableId);
        }
    }
    $(".flag-tools").hide();
    $(".flag-tabs").hide();
    if (tableId)
        $table.show();
    if (toolsId)
        $("#" + toolsId).show();
    if (tabBtnId) {// 适配“更多”按钮
        $(".flag-tabs-btn").removeClass("active");
        $("#" + tabBtnId).addClass("active");
    }
}

function createDatatable(params, customSearchWidget) {
    var tableId = params.initParams.tableId,
        toolsId = params.initParams.toolsId,
        //urlPrefix = params.initParams.urlPrefix,
        permissions = params.initParams.permissions,
        page = params.initParams.page,
        custom = params.customComps && params.customComps.custom;
    initTabContainerHtml(tableId, toolsId, custom, permissions, params.imports, params.exports);
    initTableTools(tableId, params, customSearchWidget);
    initTableBodyAndEvent(tableId, page);
    initTablePositionModel(tableId);
}

function initTabContainerHtml(contentId, toolsAreaId, custom, permissions, imports, exports) {
    var style = ' style="font-size: 14px;padding: 4px 12px;margin-left:3.56px;" ',
        curdTools = '', IExportTools = '', settingAndSearchTools = '',
        custom1 = '', custom2 = '', custom3 = '', toolsHtml = '', table = '';
    if (custom && isArray(custom)) {
        for (var i = 0; i < custom.length; i++) {
            var obj = custom[i], name = obj.name, location = obj.location, color = obj.color, icon = obj.icon,
                associated = obj.associated;
            var customHtml = '<div class=" btn f-p-tips ' + color + '" ' + style + ' id="' + contentId + '-tools-' + name + '" '
                + (associated !== false ? '' : 'disabled="disabled"')
                + '><i class="fa ' + icon + '"></i>' + '<div class="f-t-tips">' + $.i18n(name) + '</div></div>';
            if (location == 1) {
                custom1 = customHtml;
            } else if (location == 2) {
                custom2 = customHtml;
            } else {
                custom3 = customHtml;
            }
        }
    }
    if (permissions[0] == 0) {// onclick="viewDetail(\''+contentId+'\')"
        curdTools += '<div class="btn f-p-tips gray_tableModal" disabled="disabled" ' + style + ' id="' + contentId + '-tools-detail">'
            + '<i class="fa fa-list-alt"></i><div class="f-t-tips">' + $.i18n("details") + '</div></div>';
    }
    if (permissions[1] == 0) {
        curdTools += '<div class=" btn success f-p-tips" ' + style + ' id="' + contentId + '-tools-add" '
            + '><i class="fa fa-plus"></i>' + '<div class="f-t-tips">' + $.i18n("new") + '</div></div>';
    }
    if (permissions[2] == 0) {
        curdTools += '<div  class="btn f-p-tips gray_tableModal" disabled="disabled" ' + style + ' id="' + contentId + '-tools-edit"'
            + '><i class="fa fa-edit"></i>' + '<div class="f-t-tips">' + $.i18n("edit") + '</div></div>';
    }
    if (permissions[3] == 0) {
        curdTools += '<div  class="btn f-p-tips gray_tableModal" disabled="disabled" ' + style + ' id="' + contentId + '-tools-delete" onclick="toolDelete(\'' + contentId + '\')" ' +
            '><i class="fa fa-trash-o"></i><div class="f-t-tips">' + $.i18n("delete") + '</div></div>';
        ;
    }
    if (imports) {
        IExportTools += '<input type="file" id="' + contentId + '_importCsv" class="hidden" accept="text/csv" onchange="importCsvModel(\'' + contentId + '\')">' +
            '<div  class="btn darkorange f-p-tips" ' + style + ' onclick="$(\'#' + contentId + '_importCsv\').click()"><i class="fa fa-upload"></i>' +
            '<div class="f-t-tips">' + $.i18n("import") + '</div></div>';
    }
    if (exports) {
        IExportTools += '<div class="btn darkorange f-p-tips" ' + style + ' onclick="exportCsvModel(\'' + contentId + '\')"><i class="fa fa-download"></i>' +
            '<div class="f-t-tips">' + $.i18n("export") + '</div></div>';
        // '<div class="btn darkorange f-p-tips" '+style+' onclick="exportTempCsvModel(\''+ contentId +'\')"><i class="fa fa-download"></i>'+
        // '<div class="f-t-tips">'+$.i18n("exportTemplate")+'</div></div>'; 导出模板
    }
    settingAndSearchTools += '<div class="viewcfg-dropdown" id="' + contentId + '-tools-setting">'
        + '<a class="btn purple f-p-tips dropdown-toggle" ' + style + ' data-toggle="dropdown" href="javascript:" aria-expanded="false">'
        + '<i class="fa fa-gear"></i><div class="f-t-tips">' + $.i18n("setting") + '</div></a>'
        + '<ul class="dropdown-menu dropdown-blue rowPopContainer"  onclick="event.stopPropagation()"><li style="border-bottom: 1px solid #00A2E9;height:30px;">'
        + '<div class="pull-left"><label style="margin: 0 0 0 20px;">'
        + '<input type="checkbox" id="' + contentId + '-checkAllBtn"><span class="text"></span></label>' + $.i18n("check_all") + '</div>'
        + '<button id="' + contentId + '-resetColsBtn" class="btn btn-info pull-right" style="padding:0 3px;margin: 0 5px 0 0;">'
        + '<i class="fa fa-refresh"></i>' + $.i18n("restore") + '</button></li>'
        + '<div id="' + contentId + '-RowPopId"></div></ul></div>';
    settingAndSearchTools += '<div id="' + contentId + '-searchBtnId" class="btn f-p-tips warning" ' + style + ' aria-expanded="false">'
        + '<i class="fa fa-search-plus" id="' + contentId + '-searchPlusId"></i>'
        + '<i class="fa fa-search-minus" style="display:none" id="' + contentId + '-searchMinusId"></i><div class="f-t-tips">' + $.i18n("search") + '</div></div>';
    toolsHtml += custom1 + curdTools + IExportTools + custom2 + '&nbsp;&nbsp;' + settingAndSearchTools + custom3;
    $("#" + toolsAreaId).append(toolsHtml);
    table += '<form class="collapse" id="' + contentId + '-searchArea"></form>';
    table += '<div class="data-thead ' + contentId + '-theadDivClass" style="border-bottom:1px solid #00A2E9;"' +
        'onmousemove="thOnMouseMoveModel(\'' + contentId + '\')"' + 'onmouseup="thOnMouseUpModel(\'' + contentId + '\')"' +
        '><table class="table  table-striped dataTable" style="width:auto;">' +// table-bordered
        '<thead class="flip-content"><tr style="background-color:#FBFBFB;" role="row" id="' + contentId + '-thead"></tr></thead></table></div>';
    table += '<div class="data-tbody ' + contentId + '-bodyDivClass"' +
        'onmousemove="thOnMouseMoveModel(\'' + contentId + '\')"' + 'onmouseup="thOnMouseUpModel(\'' + contentId + '\')"' + '>'
        + '<div><table class="table table-bordered table-hover table-striped" style="width:auto;">'
        + '<tbody class="page-data-tbody" id="' + contentId + '-body"></tbody></table></div>'
        + '<div id="' + contentId + '-body-noData" style="width:100%;padding:10px;text-align:center;display:none;">'
        + '<span style="font-size:14px;font-weight:bold;">' + $.i18n("label.table.noDataRecord") + '</span></div>'
        + '</div>';
    table += '<div class="row foot-tools" id="' + contentId + '-foot" style="height:45px;"><div id="' + contentId + '-footContent" class="pull-right table-page-tools position-relative">'
        + '<div class="pagetools" id="' + contentId + '-footBody"></div><select id="' + contentId + '-footPop" onchange="changePagesizeModal(\'' + contentId + '\')" class="form-control">'
        + '<option label="25" value="25">25</option><option label="60" value="60">60</option><option label="100" value="100">100</option>'
        + '</select></div></div>';
    $("#" + contentId).append(table).addClass("flag-table-init");
}

function initTableTools(tableId, params, customSearchWidget) {
    var localStrg = getLocalStorageModel(tableId, "localStrg"),
        showCols = localStrg.showCols,
        trs = params.trs,
        i18nPrefix = params.i18nPrefix,
        customComps = params.customComps || {},
        custom = customComps.custom,
        $addBtn = $("#" + tableId + "-tools-add"),
        $editBtn = $("#" + tableId + "-tools-edit"),
        $detailBtn = $("#" + tableId + "-tools-detail"),
        addObj = customComps.add,
        editObj = customComps.edit,
        detailObj = customComps.detail,
        addClickE = addObj && addObj.click && typeof addObj.click === "function" ? addObj.click : undefined,
        editClickE = editObj && editObj.click && typeof editObj.click === "function" ? editObj.click : undefined,
        detailClickE = detailObj && detailObj.click && typeof detailObj.click === "function" ? detailObj.click : undefined;
    if (!customSearchWidget) {
        initSearchWidgetModel(tableId);
    }
    initSettingBodyAndEvent(tableId, trs, showCols, i18nPrefix);
    if (addClickE) {
        $addBtn.on("click", {tabId: tableId, type: "new"}, addClickE);
    } else {
        $addBtn.on("click", {tabId: tableId, type: "new"}, viewEditOrAdd);
    }
    if (editClickE) {
        $editBtn.on("click", {tabId: tableId, type: "edit"}, editClickE);
    } else {
        $editBtn.on("click", {tabId: tableId, type: "edit"}, viewEditOrAdd);
    }
    if (detailClickE) {
        $detailBtn.on("click", {tabId: tableId, type: "edit"}, detailClickE);
    } else {
        $detailBtn.on("click", function () {
            viewDetail(tableId);
        });
    }
    if (custom && isArray(custom)) {
        for (var i = 0; i < custom.length; i++) {
            var obj = custom[i];
            var name = obj.name, click = obj.click, $customBtn = $("#" + tableId + "-tools-" + name);
            $customBtn.on("click", {tabId: tableId}, click);
        }
    }
}

function initSettingBodyAndEvent(tableId, trs, showCols, i18nPrefix) {
    // 填充HTML
    var $setting = $("#" + tableId + "-tools-setting"),
        selectRowsPopId = tableId + "-RowPopId",
        allCheckBtnId = tableId + "-checkAllBtn",
        $rowsPop = $setting.find("#" + selectRowsPopId),
        html = "",
        len = trs.length;
    for (var i = 0; i < len; i++) {
        var name = trs[i].name,
            title = $.i18n(i18nPrefix + name) || $.i18n("db.common." + name);
        html += "<li><label style='margin: 0 0 0 20px;'><input type='checkbox' class='inverted EUBtn-blue'";
        html += getShowFlagByName(name, showCols) ? " checked " : "";
        html += "name='" + selectRowsPopId + "' value='" + name + "' >";// onchange='changeShowItems(\""+tableId+"\")'
        html += "<span class='text'></span></label>" + title + "</li>";
    }
    $rowsPop.html(html);
    var chsub = $rowsPop.find("input[name='" + selectRowsPopId + "']").length;
    var checkedsub = $rowsPop.find("input[name='" + selectRowsPopId + "']:checked").length;
    $("#" + allCheckBtnId).attr("checked", checkedsub == chsub ? true : false);
    $setting.find(".rowPopContainer").on("change", {tabId: tableId}, function (e) {
        var tableId = e.data.tabId,
            target = e.target || e.srcElement,
            $target = $(target),
            showCols = getLSDataChild(tableId, "showCols"),
            newShowCols = showCols,
            rowPopIdOrName = tableId + "-RowPopId";
        if (target.id == (tableId + "-checkAllBtn")) {
            var checked = $target.prop("checked");
            newShowCols = refreshShowColsData(tableId, showCols, checked ? 1 : -1);
        } else if (target.nodeName.toLowerCase() == "input" && $target.attr("name") == selectRowsPopId) {
            var checked = $target.prop("checked"),
                value = $target.val();
            newShowCols = refreshShowColsData(tableId, showCols, value, checked)
        }
        refreshSettingPopBody(tableId, newShowCols);
        queryTableDataModel(tableId);
    });
    $("#" + tableId + "-resetColsBtn").on("click", {tabId: tableId}, function (e) {
        var tableId = e.data.tabId,
            resetCols = getLSDataChild(tableId, KEY_LS_RESETCOLS);
        setLSDataChild(tableId, KEY_LS_SHOWCOLS, resetCols);
        refreshSettingPopBody(tableId, resetCols);
        queryTableDataModel(tableId);
    });
}

function refreshSettingPopBody(tableId, showCols) {
    var rowPopIdOrName = tableId + "-RowPopId",
        $setting = $("#" + tableId + "-tools-setting");
    $("#" + rowPopIdOrName).find("input[name=" + rowPopIdOrName + "]").each(function (index, item) {
        var name = $(this).val();
        for (var i = 0, len = showCols.length; i < len; i++) {
            if (name == showCols[i][0]) {
                $(this).prop("checked", showCols[i][1]);
                break;
            }
        }
    });
    var chsub = $setting.find("#" + rowPopIdOrName).find("input[name='" + rowPopIdOrName + "']").length;
    var checkedsub = $setting.find("#" + rowPopIdOrName).find("input[name='" + rowPopIdOrName + "']:checked").length;
    $setting.find("#" + tableId + "-checkAllBtn").prop("checked", checkedsub == chsub ? true : false);
}

function getShowFlagByName(name, showCols) {
    for (var i = 0, len = showCols.length; i < len; i++) {
        if (name == showCols[i][0]) {
            return showCols[i][1];
        }
    }
}

function refreshShowColsData(tableId, showCols, cols, flag) {
    if (cols && (cols == 1 || cols == -1)) {
        var value = cols == 1 ? true : false;
        for (var i = 0, len = showCols.length; i < len; i++) {
            showCols[i][1] = value;
        }
    } else if (cols) {
        for (var i = 0, len = showCols.length; i < len; i++) {
            if (cols == showCols[i][0]) {
                var value = flag ? true : false;
                showCols[i][1] = value;
                break;
            }
        }
    }
    setLSDataChild(tableId, "showCols", showCols);
    return showCols;
}

function initSearchWidgetModel(tableId) {
    var $searchForm = $("#" + tableId + "-searchArea"),
        tableParams = $("#" + tableId).data(KEY_TABLE_ITEMS),
        items = tableParams.trs,
        group = tableParams.group && isArray(tableParams.group) && tableParams.group.length > 0,
        i18nPrefix = tableParams.i18nPrefix,
        queryList = [],
        btnPosFlag = 0,
        html = '<div class="panel-body"><div class="row">';
    for (var i = 0, len = items.length; i < len; i++) {
        if (items[i].advQry) {
            queryList.push(items[i]);
        }
    }
    for (var i = 0, queryLen = queryList.length; i < queryLen; i++) {
        var queryItem = queryList[i],
            name = queryItem.name,
            vali = queryItem.vali,
            advQry = queryItem.advQry,
            qryType = queryItem.qryType,
            duringFlag = (advQry.indexOf("DURING") >= 0),
            inFlag = (advQry.indexOf("IN") >= 0),
            nameType = "cx_" + advQry + "-|-" + name,
            placeholder = $.i18n(i18nPrefix + name + ".help") || $.i18n("db.common." + name + ".help") || "i18n is null : " + name;
        btnPosFlag += 1;
        html += '<div class="col-md-4 margin-bottom-5"><span class="adv-name">' + $.i18n(i18nPrefix + name) + ':</span><div class="adv-value">';
        if (qryType === "select" || qryType === "ajaxSelect") {
            var multiS2 = advQry.indexOf("IN") >= 0;
            html += '<div class="input-sm no-border no-padding" style="min-width:154px;' + (multiS2 ? "height:40px !important;" : "") + '">'
                + '<select name="' + nameType + '" style="width: 100%;" ' + (multiS2 ? ' multiple="multiple"' : "") + '></select></div>';
        } else {
            var laydateHtml = "", laydateHtmlEnd = "", dateFormat = "";
            if (qryType === "date") {
                dateFormat = queryItem.qryDateFormat ? ',format:"' + queryItem.qryDateFormat + '"' : "";
                laydateHtml = "onclick='laydate({istime: true" + dateFormat + "})'";
                laydateHtmlEnd = "onclick='laydate({istime: true" + dateFormat + ",defaultHms:\"23:59:59\"})'";
            }
            if (duringFlag) {
                var phGte = $.i18n(i18nPrefix + name + ".gte") || $.i18n("db.common." + name + ".gte") || "i18n.gte is null : " + name,
                    phlte = $.i18n(i18nPrefix + name + ".lte") || $.i18n("db.common." + name + ".lte") || "i18n.lte is null : " + name;
                html += '<div><input type="text" style="width:48%;" name="cx_GTE-|-' + name + '" class="input-sm"' + 'placeholder="' + phGte + '" ' + laydateHtml +
                    '><span style="display:inline-block;width: 4%;text-align: center;">-</span>' +
                    '<input type="text" style="width:48%;" name="cx_LTE-|-' + name + '" class="input-sm"' + 'placeholder="' + phlte + '" ' + laydateHtmlEnd + '></div>';
            } else {
                html += '<div><input type="text" name="' + nameType + '" class="input-sm"' + 'placeholder="' + placeholder + '" ' + laydateHtml + '></div>';
            }
        }
        html += '</div></div>';
    }

    html += '<div class="col-md-4 col-md-offset-' + (2 - ( btnPosFlag % 3 )) * 4 + ' ">'
        + '<div class="text-right" style="display:inline-block;width:95%;margin-left:6px;">'// perfect!
        + (group ? '<select name="groupBy" style="float:left;"></select>' : '')//三目运算符优先级最低//width:100%;
        + '<button type="button" class="btn btn-default success" style="height:30px;margin:0 5px;" onClick="queryTableDataModel(\'' + tableId + '\',1)"><i class="fa fa-search"></i>' + $.i18n("search") + '</button>'
        + '<button type="button" class="btn btn-default orange" style="height:30px;" onClick="resetSearchCondition(\'' + tableId + '\')"><i class="fa fa-undo"></i>' + $.i18n("page.clear_search") + '</button>'
        + '</div></div></div></div>';
    $searchForm.append(html);

    for (var i = 0, listLen = queryList.length; i < listLen; i++) {
        var queryItem = queryList[i],
            name = queryItem.name,
            advQry = queryItem.advQry,
            qryType = queryItem.qryType,
            qryData = queryItem.qryData,
            placeholder = $.i18n(i18nPrefix + name + ".help");
        var nameType = advQry == "[LIKE]" ? "cx_LIKE-|-" + name : "cx_" + advQry + "-|-" + name;
        var selector = '#' + tableId + '-searchArea [name="' + nameType + '"]';
        if (advQry && qryType == "select") {
            if (qryData && qryData.data) {
                select2BaseImpl(qryData, selector, placeholder);
                $(selector).val(queryItem.defQry || "").trigger("change");
            }
        } else if (advQry && qryType == "ajaxSelect") {
            select2DataImpl(queryItem.qryDataS2, selector, placeholder);
        }
    }
    // group下拉框
    if (group) {
        var groupData = [], originalData = tableParams.group;//groupData = [{id:"", text:$.i18n("groupBy")}],
        for (var i = 0, len = originalData.length; i < len; i++) {
            groupData.push({id: originalData[i], text: $.i18n(i18nPrefix + originalData[i])});
        }
        var groupParams = {
            data: groupData,
            // formatter: function(data){
            //     var groupName = data && data.id;
            //     if( groupName===""||groupName===undefined){
            //         return $('<div class="success" style="display:inline-block;"><i class="fa fa-search"></i>'+data.text+'</div>');
            //     }else{
            //         return $('<div class="success" style="display:inline-block;">'+data.text+'</div>');
            //     }
            // },
            selectE: function () {
                queryTableDataModel(tableId, 1);
            }
        };
        select2BaseImplByArray(groupParams, '#' + tableId + '-searchArea [name="groupBy"]', $.i18n("groupBy"));
    }
}

function resetSearchCondition(tableId) {
    var columns = $("#" + tableId).data(KEY_TABLE_ITEMS).trs,
        $form = $("#" + tableId + "-searchArea");
    for (var i = 0, len = columns.length; i < len; i++) {
        var defQry = columns[i].defQry ? columns[i].defQry : "";
        $form.find("[name$=" + columns[i].name + "]").val(defQry).trigger("change");
        $("#search-" + tableId + "-" + columns[i].name).val(defQry).trigger("change"); // ?兼容
    }
    $form.find("[name$=groupBy]").val("").trigger("change");
    queryTableDataModel(tableId, 1);
}

function initTableBodyAndEvent(tableId, page) {
    queryTableDataModel(tableId, page);
}

function initTablePositionModel(tableId) {
    var winHeight = document.documentElement.clientHeight;
    var dataTableDivHeight = winHeight - 186 - $(".stati-info").height() - $(".page-breadcrumbs").height();// 窗体高度-198-？的高度-栏目条高度
    var $dataTBody = $("." + tableId + "-bodyDivClass"),
        $dataTHead = $("." + tableId + "-theadDivClass");
    $dataTBody.css("height", dataTableDivHeight);
    $(".summary-tab").css("height", dataTableDivHeight + 81);
    $dataTBody.scroll(function (e) {
        return $dataTHead.prop("scrollLeft", e.target.scrollLeft);
    });
    var $searchBtn = $("#" + tableId + "-searchBtnId"),
        $searchArea = $("#" + tableId + "-searchArea");
    $searchBtn.click(function () {
        var isExpanded8 = !JSON.parse($searchBtn.attr("aria-expanded"));
        var height8 = dataTableDivHeight;
        if (isExpanded8) {
            $searchArea.show();
            $("#" + tableId + "-searchPlusId").hide();
            $("#" + tableId + "-searchMinusId").show();
            height8 = (dataTableDivHeight - $searchArea.height());
        } else {
            $searchArea.hide();
            $("#" + tableId + "-searchMinusId").hide();
            $("#" + tableId + "-searchPlusId").show();
        }
        $dataTBody.css({"height": height8 + "px"});
        $searchBtn.attr("aria-expanded", isExpanded8 + "");
    });
}

function selectThisRow(tableId, number) {
    $("input[name*='" + tableId + "-rowItems']").prop("checked", false);
    $("input[name='" + tableId + "-rowItems" + number + "']").prop("checked", true);
    changeSelectRows(tableId);
    changeTrBackground(tableId);
}

function changeTrBackground(tableId) {
    var checkedsubList = $("input[name*='" + tableId + "-rowItems']:checked");
    var unCheckedsubList = $("input[name*='" + tableId + "-rowItems']").not("input:checked");
    unCheckedsubList.each(function () {
        $(this).parents("tr").removeClass("active_tr");
    });
    checkedsubList.each(function () {
        $(this).parents("tr").addClass("active_tr");
    });
}

function changeSelectRows(tableId) {
    var chsubList = $("input[name*='" + tableId + "-rowItems']").length,
        checkedsubList = $("input[name*='" + tableId + "-rowItems']:checked").length,
        tableItems = $("#" + tableId).data(KEY_TABLE_ITEMS),
        permission = tableItems.initParams.permissions,
        batchEdit = tableItems.batchEdit,
        custom = tableItems.customComps && tableItems.customComps.custom;
    if (checkedsubList == chsubList) {
        $("#" + tableId + "-tableCheckAllBtn").prop("checked", true);
    } else {
        $("#" + tableId + "-tableCheckAllBtn").prop("checked", false);
    }
    var $details = $('#' + tableId + "-tools-detail"),
        $edit = $('#' + tableId + "-tools-edit"),
        $delete = $('#' + tableId + "-tools-delete"),
        $add = $('#' + tableId + "-tools-add");
    if (checkedsubList == 1 && permission[0] == 0) {
        $details.removeAttr("disabled");
        $details.removeClass("gray_tableModal").addClass("blue");
    } else {
        $details.attr("disabled", "disabled");
        $details.removeClass("blue").addClass("gray_tableModal");
    }

    if ((checkedsubList == 1 && permission[2] == 0) || (checkedsubList > 1 && permission[2] == 0 && batchEdit)) {
        $edit.removeAttr("disabled");
        $edit.removeClass("gray_tableModal").addClass("primary");
    } else {
        $edit.attr("disabled", "disabled");
        $edit.removeClass("primary").addClass("gray_tableModal");
    }
    if (checkedsubList > 0 && permission[3] == 0) {
        $delete.removeAttr("disabled");
        $delete.removeClass("gray_tableModal").addClass("danger");
    } else {
        $delete.attr("disabled", "disabled");
        $delete.removeClass("danger").addClass("gray_tableModal");
    }
    if (permission[1] == 0) {
        $add.removeAttr("disabled");
        $add.removeClass("gray_tableModal").addClass("success");
    } else {
        $add.attr("disabled", "disabled");
        $add.removeClass("success").addClass("gray_tableModal");
    }
    //关于多行编辑
    if (custom && isArray(custom)) {
        for (var i = 0; i < custom.length; i++) {
            var obj = custom[i], name = obj.name, color = obj.color, associated = obj.associated,
                $custom = $('#' + tableId + "-tools-" + name);
            if (associated !== false) {
                if (checkedsubList == 1) {
                    $custom.removeAttr("disabled");
                    $custom.removeClass("gray_tableModal").addClass(color);
                } else {
                    $custom.attr("disabled", "disabled");
                    $custom.removeClass(color).addClass("gray_tableModal");
                }
            }
        }
    }
    changeTrBackground(tableId);
}

function checkAllRows(tableId) {
    var isChecked = $("#" + tableId + "-tableCheckAllBtn").prop('checked');
    $("input[name*='" + tableId + "-rowItems']").prop("checked", isChecked);
    changeSelectRows(tableId);
    changeTrBackground(tableId);
}

function rowsSort(tableId, columnName) {
    var tableParams = $("#" + tableId).data(KEY_TABLE_ITEMS),
        params = tableParams.trs,
        paramsLen = params.length;
    for (var i = 0; i < paramsLen; i++) {
        var item = params[i],
            name = item.name,
            sort = item.sort;
        if (name == columnName) {
            if (sort === false) {
                return;
            } else {
                break;
            }
        }
    }

    var rowsSortList = [];
    var theadId = "th-" + tableId + "-" + columnName;
    var th = $("#" + theadId);
    var c = th.attr("class");
    if (c && c.indexOf('sorting_asc') > -1) {
        th.removeClass('sorting_asc').addClass('sorting_desc');
    } else if (c && c.indexOf('sorting_desc') > -1) {
        th.removeClass('sorting_desc').removeClass('sorting_asc').addClass('sorting');
    } else if (c && c.indexOf('sorting') > -1) {
        th.removeClass('sorting').addClass('sorting_asc');
    }
    var html_sort = "";
    $("#" + tableId + "-thead>th").each(function (index, item) {
        var sortArr = [],
            sortClass = $(this).attr("class") || "sorting",
            colName = $(this).attr("name") || "";
        if (sortClass.indexOf("sorting_asc") != -1) {
            sortArr.push(colName);
            sortArr.push(1);
        } else if (sortClass.indexOf("sorting_desc") != -1) {
            sortArr.push(colName);
            sortArr.push(2);
        }
        sortArr.length > 0 && rowsSortList.push(sortArr);
    });

    setLSDataChild(tableId, "sorts", rowsSortList);
    queryTableDataModel(tableId);
}

function paginationWidget(pageResult, tableId) {
    var page = pageResult || {},
        len = pageResult.contentList.length,
        sb = "",
        paginationSize = 5,
        current = (page.number + 1) || "-",
        begin = Math.max(1, current - parseInt(paginationSize / 2)),
        end = Math.min(begin + (paginationSize - 1), page.totalPages),
        size = page.size || "-",
        pageSize = page.size || 25,
        totalEle = page.totalElements || "-",
        totalPages = page.totalPages || "-";
    sb += "<div><ul class=\"pagination\">";

    if (page.hasPreviousPage) {
        sb += "<li><a page=\"1\" href=\"" + getJavascriptStrModal(tableId, 1, size) + "\">&lt;&lt;</a></li>";
        sb += "<li><a href=\"" + getJavascriptStrModal(tableId, current - 1, size) + "\">&lt;</a></li>";
    } else {
        sb += "<li class=\"disabled\"><a href=\"javascript:\">&lt;&lt;</a></li>";
        sb += "<li class=\"disabled\"><a href=\"javascript:\">&lt;</a></li>";
    }
    for (var i = begin; i < (end + 1); i++) {
        if (i == current) {
            sb += "<li class=\"active\"><a page=\"" + i + "\" href=\"javascript:\">" + i + "</a></li>";
        } else {
            sb += "<li><a href=\"" + getJavascriptStrModal(tableId, i, size) + "\">" + i + "</a></li>";
        }
    }
    if (page.hasNextPage) {
        sb += "<li><a href=\"" + getJavascriptStrModal(tableId, current + 1, size) + "\">&gt;</a></li>";
        sb += "<li><a href=\"" + getJavascriptStrModal(tableId, page.totalPages, size) + "\">&gt;&gt;</a></li>";
    } else {
        sb += "<li class=\"disabled\"><a href=\"javascript:\">&gt;</a></li>";
        sb += "<li class=\"disabled\"><a href=\"javascript:\">&gt;&gt;</a></li>";
    }

    var pageNum = "<input style='width:30px;margin:1px 5px;' value='" + current +
        "' onkeydown='event.keyCode===13&&queryTableDataModel(\"" + tableId + "\",  this.value)'>";
    sb += "<li class=\"disabled\"><a href=\"javascript:\">" + $.i18n("page_tools.tips", totalPages, totalEle) + "</a></li>";
    sb += "<li><span style='padding:3px 12px;'>" + $.i18n("page_tools.goto_page", pageNum) + "</span></li>";
    sb += "<ul></div>";
    $("#" + tableId + "-footBody").html(sb);
    $("#" + tableId + "-footPop").val(pageSize);
    if (len == 0) {
        $("#" + tableId + "-footContent").hide();
    } else {
        $("#" + tableId + "-footContent").show();
    }
}

function getJavascriptStrModal(tableId, page, pageSize) {
    return "javascript:queryTableDataModel(\'" + tableId + "\', " + page + ")";
}

function changePagesizeModal(tableId) {
    var pageSize = $("#" + tableId + "-footPop").val() || 25;
    setLSDataChild(tableId, "pageSize", pageSize);
    // setLocalStorageModel(tableId, "pageSize", pageSize);
    queryTableDataModel(tableId, 1);
}

function queryTableDataModel(tableId, page) {
    var tableParams = $("#" + tableId).data(KEY_TABLE_ITEMS);
    var localStrg = getLocalStorageModel(tableId, "localStrg"),
        currentPage = $("#" + tableId + "-footBody").find("li.active>a").html(),
        pageSize = localStrg.pageSize || "25",
        page = page || currentPage || localStrg.page || "1",
        sorts = localStrg.sorts || [],
        url = window.PATH + tableParams.initParams.urlPrefix + "list.ajax?pageSize=" + pageSize + "&page=" + page;
    var searchParams = getSearchParamsAndSorts(tableId, tableParams.trs, sorts);
    var params = {
        url: url,
        data: searchParams,
        success: function (req) {
            var newResult = req.data,
                data = newResult.contentList;
            $("#" + tableId).data("queryData", data);
            createTabEntityById(tableId);
            paginationWidget(newResult, tableId);
            resetToolsBtnStatus(tableId);
        }
    };
    doTableAjax(params);
}

function getSearchParamsAndSorts(tableId, columns, sorts) {
    var orderLen = sorts.length,
        params = getSearchParams(tableId, columns);
    if (sorts && orderLen > 0) {
        var html = '[';
        for (var i = 0; i < orderLen; i++) {
            var html_str = '[';
            html_str += '"' + sorts[i][0] + '",' + sorts[i][1] + ']';
            if (i != orderLen - 1) {
                html += html_str + ',';
            } else {
                html += html_str + ']';
            }
        }
        params.cx_ORDER_LIST = html;
    }
    return params;
}

function getSearchParams(tableId, columns) {
    var $form = $("#" + tableId + "-searchArea"),
        formData = $form.serializeArray(),
        params = {},
        colsLen = columns.length;
    for (var i = 0, len = formData.length; i < len; i++) {
        var name = formData[i].name,
            value = formData[i].value;
        for (var k = 0; k < colsLen; k++) {
            if (name.indexOf(columns[k].name) != -1) {
                var ratio = columns[k].ratio;
                value = value && ratio ? value * ratio : value;
                continue;
            }
        }
        params[name] = value;
    }
    return params;
}

function createTabEntityById(tableId) {
    var items = $("#" + tableId).data(KEY_TABLE_ITEMS),
        resultList = $("#" + tableId).data("queryData"),
        localStrg = getLocalStorageModel(tableId, KEY_TABLE_LS);
    createTabEntity(tableId, resultList, items, localStrg);
}

function createTabEntity(tableId, resultList, items, localStrg) {
    var i18nPrefix = items.i18nPrefix,
        itemsArr = items.trs,
        tableKey = items.tableKey,
        detailObj = items.customComps && items.customComps.detail,
        detailClickE = detailObj && detailObj.click && typeof detailObj.click === "function" ? detailObj.click : undefined;
    sorts = localStrg.sorts,
        showCols = localStrg.showCols,
        columnArr = [];
    for (var i = 0, itemslen = itemsArr.length; i < itemslen; i++) {
        var name = itemsArr[i].name;
        for (var j = 0, colLen = showCols.length; j < colLen; j++) {
            if (name == showCols[j][0] && showCols[j][1] == true) {
                columnArr.push(itemsArr[i]);
                break;
            }
        }
    }
    var html_thead = createTableHeadHtml(tableId, columnArr, sorts, i18nPrefix);
    var html_tdata = createTableBodyHtml(tableId, resultList, columnArr, i18nPrefix, tableKey);
    $("#" + tableId + "-thead").html(html_thead);
    $("#" + tableId + "-body").html(html_tdata);
    $("#" + tableId + "-body").find("tr").on("dblclick ", function () {
        detailClickE ? detailClickE(tableId) : viewDetail(tableId);
    });
    if (resultList.length == 0) {
        $("#" + tableId + "-body-noData").show();
    } else {
        $("#" + tableId + "-body-noData").hide();
    }
}

function createTableHeadHtml(tableId, columnArr, sorts, i18nPrefix) {
    var html_thead = "<th style='background-color: inherit;border:1px solid #FBFBFB;' ><label class='no-margin-bottom'><input type='checkbox' class='inverted EUBtn-blue' id='" + tableId +
        "-tableCheckAllBtn' onclick='checkAllRows(\"" + tableId + "\")'><span class='text'></span></label></th>";
    for (var m = 0, colLen = columnArr.length; m < colLen; m++) {
        var sort_str = "",
            sortHtml = "",
            columnName = columnArr[m].name,
            columnWidth = (columnArr[m].width) ? (columnArr[m].width) : 80,
            columnI18n = $.i18n(i18nPrefix + columnName) || $.i18n("db.common." + columnName),
            theadId = "th-" + tableId + "-" + columnName;
        if (columnArr[m].sort) {
            sort_str = "sorting";
            if (sorts && sorts.length > 0) {
                for (var y = 0, sortsLen = sorts.length; y < sortsLen; y++) {
                    if (columnArr[m].name == sorts[y][0]) {
                        if (sorts[y][1] == 1) {
                            sort_str = "sorting_asc";
                        } else {
                            sort_str = "sorting_desc";
                        }
                        break;
                    }
                }
            }
            sortHtml += " class='" + sort_str + "' onClick='rowsSort(\"" + tableId + "\",\"" + columnName + "\")'";
        }
        html_thead += "<th draggable='false' style='background-color: inherit;border:1px solid #FBFBFB;' " + sortHtml + " id='" + theadId + "' name='" + columnName
            + "'onmousedown=\"thOnMouseDownModel('" + tableId + "','" + columnName + "')\"" + " >"// up和move方法移动到thread和body上去了
            + "<div class='table-data' draggable='false' style='width: " + columnWidth + "px;'>" + columnI18n + "</div></th>";
    }
    return html_thead;
}

function createTableBodyHtml(tableId, resultList, columnArr, i18nPrefix, tableKey) {
    var html_tdata = "";
    for (var n = 0, resultLen = resultList.length; n < resultLen; n++) {
        var tableKeyValue = resultList[n][tableKey];
        html_tdata += "<tr onclick='selectThisRow(\"" + tableId + "\",\"" + n + "\")' >" +//onDblClick='viewDetail(\""+tableId+"\",\""+n+"\")'
            "<td><label style='margin-bottom:0;' onclick='event.stopPropagation()'>" +
            "<input type='checkbox' class='inverted EUBtn-blue' name='" + tableId + "-rowItems" + n + "' value='" + tableKeyValue + "-|-" + n +
            "' onclick='changeSelectRows(\"" + tableId + "\")'><span class='text'></span></label></td>";
        for (var k = 0, arrLen = columnArr.length; k < arrLen; k++) {
            var isFirstRow = n == 0,
                tipContent = "",
                columnData = columnArr[k],
                isTip = columnData.tip, name = columnData.name, width = columnData.width,
                rowData = resultList[n],
                rowContent = formatData2Html(i18nPrefix, columnArr[k], rowData, isFirstRow);
            if (isTip && rowContent) {
                tipContent = '<div class="' + isFirstRow ? "f-tips" : "f-t-tips" + '">' + rowContent + '</div>';
            }
            html_tdata += '<td><div class="f-p-tips" name="' + name + '"><div style="width:' + width + 'px;overflow: hidden;' +
                'word-break: keep-all;text-overflow: ellipsis;height: 23px;line-height: 22px;">' + rowContent + '</div>' + tipContent + '</div></td>';
        }
        html_tdata += "</tr>";
    }
    return html_tdata;
}

function formatData2Html(i18nPrefix, columnParam, rowData) {
    var name = columnParam.name,
        comType = columnParam.comType,
        rowContent = rowData[name],
        valFormat = columnParam.valFormat,
        ratio = columnParam.ratio,
        newContent = "";
    //屏蔽界面上的undefined和null
    rowContent = (rowContent === undefined || rowContent === null) ? "" : rowContent;
    if (ratio) {
        rowContent = rowContent / ratio;
    }
    if (valFormat) {
        try {
            if (typeof valFormat === "function") {
                newContent = valFormat(rowContent, rowData);
            } else if (typeof valFormat === "string") {
                newContent = eval(valFormat + "(\"" + rowContent + "\")");
            }
        } catch (e) {
            return "format function error!";
        }

    } else if (comType === "select") {
        var comData = columnParam.comData && columnParam.comData.data;
        for (var i = 0; i < comData.length; i++) {
            if (comData[i][0] == rowContent) {
                newContent = comData[i][1];
                break;
            }
        }
    }
    if (columnParam.priceFM) {
        // N: normal   H:highLight
        rowContent = columnParam.priceFM == "N" ? priceFormat(rowContent) : priceFormatHighLight(rowContent);
    }
    if (columnParam.wifiAreaFM || (comType == "ajaxSelect" && columnParam.comDataS2 && columnParam.comDataS2.wifiAreaFM)) {
        newContent = rowContent && wifiAreaTdFormat(rowContent);
    }
    return newContent ? newContent : rowContent;
}
/**
 * 价格格式化
 *    保持小数位一致，默认统一2位
 * @param value 价格
 * @param decimals 保留小数位
 * @param ratio 倍率（除以该倍率）
 */
function priceFormatHighLight(value) {
    var valSplit = value.toString().split("."),
        decimals = valSplit && valSplit.length === 2 ? valSplit[1].length : 0;
    switch (decimals) {
        case 0 :
            value += ".00";
            break;
        case 1 :
            value += "0";
            break;
        default:
            value = Math.ceil(value * 100) / 100;
    }
    return '<span class="label label-info" style="width:80px;text-align:right;">' + value + '</span>';
}

function priceFormat(value, style) {
    var valSplit = value.toString().split("."),
        decimals = valSplit && valSplit.length === 2 ? valSplit[1].length : 0;
    switch (decimals) {
        case 0 :
            value += ".00";
            break;
        case 1 :
            value += "0";
            break;
        default:
            value = Math.ceil(value * 100) / 100;
    }
    return '<div style="width:80px;text-align:right;">' + value + '</div>';
}

function trafficCommonFM(value) {
    var valSplit = value.toString().split("."),
        decimals = valSplit && valSplit.length === 2 ? valSplit[1].length : 0;
    switch (decimals) {
        case 0 :
            value += ".000";
            break;
        case 1 :
            value += "00";
            break;
        case 2 :
            value += "0";
            break;
        default:
            value = Math.ceil(value * 1000) / 1000;
    }
    return value;
}

function resetToolsBtnStatus(tableId) {
    var tableItems = $("#" + tableId).data(KEY_TABLE_ITEMS),
        custom = tableItems.customComps && tableItems.customComps.custom;
    if (custom && isArray(custom)) {
        for (var i = 0; i < custom.length; i++) {
            var obj = custom[i], name = obj.name, color = obj.color, associated = obj.associated,
                $custom = $('#' + tableId + "-tools-" + name);
            if (associated !== false) {
                $custom.removeAttr("disabled").attr("disabled", "disabled").removeClass(color).addClass("gray_tableModal");
            }
        }
    }
    $("#" + tableId + "-tools-detail").removeAttr("disabled").attr("disabled", "disabled").removeClass("blue").addClass("gray_tableModal");
    $("#" + tableId + "-tools-edit").removeAttr("disabled").attr("disabled", "disabled").removeClass("primary").addClass("gray_tableModal");
    $("#" + tableId + "-tools-delete").removeAttr("disabled").attr("disabled", "disabled").removeClass("danger").addClass("gray_tableModal");
}

function getFirstSelectedRow(tableId) {
    var checkedRows = $("#" + tableId + "-body").find("input[name*=" + tableId + "-rowItems]:checked");
    if (checkedRows && checkedRows.length > 0) {
        var number = checkedRows[0].value.split("-|-");
        return number[1];
    }
    return 0;
}
//单行与批量
function getSelectedRows(tableId) {
    var checkedRows = $("#" + tableId + "-body").find("input[name*=" + tableId + "-rowItems]:checked");
    if (checkedRows && checkedRows.length === 1) {
        var number = checkedRows[0].value.split("-|-");
        return number[1];
    } else {
        var result = [];
        for (var i = 0, len = checkedRows.length; i < len; i++) {
            result.push(checkedRows[i].value);
        }
        return result;
    }
}

function getSelectedRowData(tableId) {
    var queryData = $("#" + tableId).data("queryData"),
        number = 0;
    var checkedRows = $("#" + tableId + "-body").find("input[name*=" + tableId + "-rowItems]:checked");
    if (checkedRows && checkedRows.length > 0) {
        var value = checkedRows[0].value.split("-|-");
        number = value[1];
    }
    return queryData[number];
}

function viewDetail(tableId, number) {
    number = getFirstSelectedRow(tableId, number);
    createDetailDialog(tableId, number);
    showDialogModel(tableId, "detail");
}

//新增 && 单行编辑 && 多行编辑
function viewEditOrAdd(event, tableId, type) {
    if ((!tableId || !type) && event.data) {
        tableId = event.data.tabId;
        type = event.data.type;
    }
    var rows = getSelectedRows(tableId);
    if (isArray(rows) && rows.length > 0 && type === "edit") {
        createBatchEditModal(tableId, rows);
        showDialogModel(tableId, "batchEdit");
    } else {
        createEditDialog(tableId, type, rows);
        showDialogModel(tableId, type);
    }
}

function createBatchEditModal(tableId, rows) {
    var $table = $("#" + tableId),
        tableLocal = $table.data(KEY_TABLE_ITEMS),
        tableItems = tableLocal.trs,
        tableKey = tableLocal.tableKey,
        i18nPrefix = tableLocal.i18nPrefix,
        itemsLen = tableItems.length,
        idList = [],
        tkVal = "",
        html = [];
    if (!tableLocal.batchEdit || !rows || !isArray(rows)) {
        return;
    }
    for (var i = 0, len = rows.length; i < len; i++) {
        var tk = rows[i].split("-|-");
        tk.length > 0 && idList.push(tk[0]);
    }
    tkVal += idList[0] + "..." + idList[idList.length - 1] + "," + $.i18n("totalFor") + idList.length + $.i18n("items");
    for (var i = 0; i < itemsLen; i++) {
        var item = tableItems[i],
            name = item.name,
            batchEdit = item.batchEdit,
            vali = item.vali,
            comType = item.comType;
        if (!batchEdit && name !== tableKey) {
            continue;
        }
        var content = "";
        if (comType === "select" || comType === "ajaxSelect") {
            content += '<select id="edit-' + tableId + '-' + name + '" name="' + name + '" style="width: 100%;"></select>';
        } else {
            var laydateHtml = "";
            if (vali.date) {
                var choose = "laydateCallbackModel&|" + tableId + "&|" + name;
                laydateHtml = "onclick='laydate({istime: true, format: \"" + vali.dateFormat + "\",choose:\"" + choose + "\"})'";
            }
            content += '<input type="text" id="edit-' + tableId + '-' + name + '" name="' + name + '"' + ' placeholder="' + $.i18n(i18nPrefix + name + ".help") +
                '" class="form-control input-sm layer-date"' + laydateHtml + '>';
        }

        html.push(
            '<div class="form-group slideFlag-' + name + '">',
            '<div><label class="control-label col-sm-3" style="padding-left:0px;padding-right:0px">',
            ($.i18n(i18nPrefix + name) + ':'),
            '<span class="required" style="color:red;width:8px;display:inline-block;margin:0 5px 0 10px;">',
            '</span></label>',
            '<div class="col-sm-8" style="padding-left:0;padding-right:0;">',
            '<div id="' + tableId + '-comContent-' + name + '">',
            (name === tableKey ? ('<input type="text" disabled="disabled" class="form-control input-sm" value="' + tkVal + '"/>') : content),
            '</div ></div>',
            // '<div class="col-sm-1">',
            // (name===tableKey
            //     ? ('<a class="btn btn-blue btn-sm icon-only white" onclick="slideToggleBatchModal(\''+tableId+'\')" href="javascript:void(0);"><i class="fa fa-undo "></i></a>')
            //     : ('<a class="btn btn-danger btn-sm icon-only white" onclick="slideToggleBatchModal(\''+tableId+'\',\''+name+'\')" href="javascript:void(0);"><i class="fa fa-times "></i></a>')),
            // '</div>',
            '</div></div>'
        );
    }

    var result = [
        '<div class="modal fade modal-primary" id="' + tableId + '-batchEdit">',
        '<div class="modal-dialog"><div class="modal-content">',
        '<form id="' + tableId + '-batchEdit-form" class="form-horizontal" onchange="formChangeModal()">',
        '<div class="modal-header">',
        '<button type="button" class="close" onclick="removeModal(\'' + tableId + '\',\'batchEdit\')"><span>&times;</span></button>',
        '<h4 class="modal-title text-primary"><i class="fa fa-edit" ></i>' + $.i18n("batchEdit") + '</h4>',
        '</div>',
        '<div style="padding-top:15px;">',
        '<input type="hidden" name="idList"/>',// value="'+ JSON.stringify(idList)+'"
        html.join(''),
        '<div style="padding: 0 50px;color:red;"><span>*' + $.i18n("label.tips.batchEditEmpty") + '</span></span></div>',
        '</div>',
        '<div class="modal-footer " style="background-color:#FFFFFF;">',
        '<button type="submit" class="btn btn-primary">' + $.i18n("save") + '</button>',
        '<a class="btn btn-danger" onclick="removeModal(\'' + tableId + '\',\'batchEdit\')">' + $.i18n("cancel") + '</a>',
        '</div>',
        '</form></div></div>'
    ];
    $table.append(result.join(''));
    $("#" + tableId + "-batchEdit").find("[name=idList]").data("data-submit", idList);
    fillBatchEditModalContent(tableId);
}

// function slideToggleBatchModal(tableId, name ){
//     var $modal = $("#"+tableId +"-batchEdit");
//     if( name ){
//         $modal.find(".slideFlag-"+name).slideToggle(120);
//     }else{
//         var cols = $("#"+tableId).data(KEY_TABLE_ITEMS).trs;
//         for(var i=0, len=cols.length; i<len; i++) {
//             var item = cols[i],
//                 $col = $modal.find(".slideFlag-"+item.name),
//                 batchEdit = item.batchEdit;
//             if( batchEdit && $col.is(":hidden")){
//                 $col.slideToggle(120);
//             }
//         }
//     }
// }

function createDetailDialog(tableId, number) {
    var tableParams = $("#" + tableId).data(KEY_TABLE_ITEMS),
        tableItems = tableParams.trs,
        i18nPrefix = tableParams.i18nPrefix,
        queryData = $("#" + tableId).data("queryData"),
        permissions = tableParams.initParams.permissions,
        customComps = tableParams.customComps,
        dataRow = queryData[number],
        itemsLen = tableItems.length,
        html = "";
    for (var i = 0; i < itemsLen; i++) {
        var name = tableItems[i].name,
            i18nKey = $.i18n(i18nPrefix + name) || $.i18n("db.common." + name),
            content = formatData2Html(i18nPrefix, tableItems[i], dataRow, false);
        html += "<tr class=\"ng-scope\"><td class=\"text-right\" width='32%'> " + i18nKey +
            ": </td><td class='right-border-none'><div style='word-wrap:break-word;word-break: break-all;' class=\"f-p-tips\">" + content + "</div></td></tr>";
    }

    var modalStyle = tableParams.expandDetail ? 'style="width:70vw;"' : '';
    var totalHtml = '<div class="modal fade modal-primary" id="' + tableId + '-detail"  role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog" ' + modalStyle + '><div class="modal-content"><div class="modal-header">' +
        '<button type="button" class="close" onclick="removeModal(\'' + tableId + '\',\'detail\')" aria-label="Close"><span aria-hidden="false">×</span></button>' +
        '<h4 class="modal-title text-info"><i class="fa fa-list-alt" ></i>' + $.i18n("details") + '</h4></div>' +
        '<div class="modal-body bg-white no-padding" style="overflow-y:auto;max-height: 80vh;">';// overflow,这个容器即使浮动也具有高度
    if (tableParams.expandDetail) {
        var result = tableParams.expandDetail(tableId, number);
        var colWidth = result.colWidth;
        var detailHtml = result.detailHtml;
        totalHtml += '<div class="col-sm-' + colWidth + '" style="padding:0px;"><div><table class="table table-bordered table-striped ' +
            ' detailTable" style="border-right:1px solid #ddd !important;"><tbody>' + html +
            '</tbody></table></div></div><div class="col-sm-' + (12 - colWidth) + '">' + detailHtml + '</div>';
    } else {
        totalHtml += '<div><table class="table table-bordered table-striped  detailTable"><tbody>' + html + '</tbody></table></div>';
    }

    var style = ' style="font-size: 14px;padding: 4px 12px;margin-left:3.56px;float:left;" ';
    totalHtml += '</div><div class="modal-footer">';
    if (permissions[2] == 0 && isEmptyObject(customComps)) {
        totalHtml += '<div class="btn blue f-p-tips" ' + style + ' id="' + tableId + '-skip2EditModal" onclick="skip2EditModalG(\'' + tableId + '\')">'
            + '<i class="fa fa-edit"></i><div class="f-t-tips">' + $.i18n("edit") + '</div></div>';
    }
    totalHtml += '<button class="btn btn-danger" onclick="removeModal(\'' + tableId + '\',\'detail\')" aria-label="Close">' + $.i18n("close") + '</button>' +
        '</div></div></div></div>';
    $("body").append(totalHtml);
}

function createEditDialog(tableId, type, number) {
    var tableLocal = $("#" + tableId).data(KEY_TABLE_ITEMS),
        tableItems = tableLocal.trs,
        tableKey = tableLocal.tableKey,
        i18nPrefix = tableLocal.i18nPrefix,
        customComps = tableLocal.customComps,
        itemsLen = tableItems.length,
        // data = $("#"+tableId).data("queryData"),
        permissions = tableLocal.initParams.permissions,
        tableKeyHtml = "",
        itemHtmlArr = [];
    for (var i = 0; i < itemsLen; i++) {
        var item = tableItems[i],
            name = item.name,
            hideEdit = item.hideEdit,
            disabled = item.disabled,
            vali = item.vali,
            comType = item.comType,
            html = "";
        var disabledFlag = disabled && (disabled == "A" || (disabled == "E" && type == "edit") || (disabled == "N" && type == "new"));
        var hideEditFlag = hideEdit && (hideEdit == "A" || (hideEdit == "E" && type == "edit") || (hideEdit == "N" && type == "new"));
        var disabledHtml = disabledFlag ? 'disabled="disabled"' : "";
        var requiredHtml = item.vali.required ? '<b>*</b>' : "";
        if (hideEditFlag) {
            if (name == tableKey && type == "edit") {
                //!!这里不能用name=name，会触发校验
                tableKeyHtml = '<div class="form-group"><input type="hidden" class="' + tableId + name + '"/></div>';
            }
            continue;
        }
        html += '<div class="form-group"><div data-input="">' +
            '<label class="control-label col-sm-3" style="padding-left:0px;padding-right:0px">' + $.i18n(i18nPrefix + name) + ':' +
            '<span class="required" style="color:red;width:8px;display:inline-block;margin:0 5px 0 10px;">' +
            requiredHtml + '</span></label><div class="col-sm-8" style="padding-left:0;padding-right:0;"><div class="ng-scope" id="' + tableId + '-comContent-' + name + '">';
        if (comType == "select" || comType == "ajaxSelect") {
            html += '<select id="edit-' + tableId + '-' + name + '" name="' + name + '" style="width: 100%;"></select>';
        } else {
            var laydateHtml = "";
            if (vali.date) {
                var choose = "laydateCallbackModel&|" + tableId + "&|" + name;
                laydateHtml = "onclick='laydate({istime: true, format: \"" + vali.dateFormat + "\",choose:\"" + choose + "\"})'";
            }
            html += '<input type="text" id="edit-' + tableId + '-' + name + '" name="' + name + '"' + disabledHtml + ' placeholder="' + $.i18n(i18nPrefix + name + ".help") +
                '" class="form-control input-sm layer-date"' + laydateHtml + '>';
        }
        html += '</div></div></div></div>';
        itemHtmlArr.push(html);
    }
    var itemHtmlArrLen = itemHtmlArr.length;
    var halfFlag = itemHtmlArr && itemHtmlArrLen > 50 ? true : false,//是否分左右栏，暂取消：itemHtmlArr&&itemHtmlArrLen>12
        bigger = halfFlag ? "modal-lg" : "",
        halfLen = halfFlag ? Math.ceil(itemHtmlArrLen / 2) : 0,
        totalHtml = "", itemHtmlArrTotal = "";
    itemHtmlArrTotal += halfFlag ? '<div class="col-sm-6">' : "";
    for (var i = 0; i < itemHtmlArrLen; i++) {
        itemHtmlArrTotal += itemHtmlArr[i];
        if (halfFlag && (i + 1) == halfLen) {
            itemHtmlArrTotal += '</div><div class="col-sm-6">';
        }
    }
    itemHtmlArrTotal += halfFlag ? '</div>' : "";
    var style = ' style="font-size: 14px;padding: 4px 12px;margin-left:3.56px;float:left;" ';
    totalHtml += '<div class="modal fade modal-primary" id="' + tableId + '-' + type + '"  aria-hidden="true"><div class="modal-dialog ' + bigger + '">' +
        '<div class="modal-content"><form id="' + tableId + '-' + type + '-form" class="form-horizontal" onchange="formChangeModal()">' +
        '<div class="modal-header"><button type="button" class="close" onclick="removeModal(\'' + tableId + '\',\'' + type + '\')"><span aria-hidden="true">&times;</span></button>' +
        //<input type="hidden" id="'+tableId +'-editAddType" value="'+type+'" />
        '<h4 class="modal-title" id="' + tableId + '-header"></h4></div>' +
        '<div class="ng-scope" style="padding-top:15px;">' + tableKeyHtml + itemHtmlArrTotal +
        '</div><div class="modal-footer " style="background-color:#FFFFFF;">';
    if ((type == "edit" && permissions[0] == 0) && isEmptyObject(customComps)) {
        totalHtml += '<div  class="btn primary f-p-tips" ' + style + ' onclick="skip2DetailModalG(\'' + tableId +
            '\')"><i class="fa fa-list-alt"></i>' + '<div class="f-t-tips">' + $.i18n("details") + '</div></div>';
    }
    totalHtml += '<button type="submit" class="btn btn-primary">' + $.i18n("save") + '</button>'
        + '<a class="btn btn-danger" onclick="removeModal(\'' + tableId + '\',\'' + type + '\')">' + $.i18n("cancel") + '</a></div>';
    $("body").append(totalHtml);
    fillModalContent(tableId, type, number);
}

// function fillEditModalForm(tableId, type, number){
//  	var $table = $("#"+tableId),
// 		$modal = $("#modal-"+tableId );
// 	var tableLocal = $("#"+tableId).data(KEY_TABLE_ITEMS),
// 	   	tableItems = tableLocal.trs,
// 	   	tableKey = tableLocal.tableKey,
// 	   	i18nPrefix = tableLocal.i18nPrefix,
// 	   	data = $("#"+tableId).data("queryData"),
// 		dataRow = number && data[number] ? data[number] : {},
// 		isEdit = type=="edit",
// 		$editModal = $("#"+ tableId +"-edit");
// 	for(var i=0, itemsLen = tableItems.length;i<itemsLen;i++){
// 		var queryItem = tableItems[i],
// 			name = queryItem.name,
// 			comType = queryItem.comType,
// 			comData = queryItem.comData,
// 			selector = "#"+ tableId +"-edit [name=\""+ name + "\"]",
// 			hideEdit = queryItem.hideEdit,
//              disabled = queryItem.disabled,
// 			hideEditFlag = hideEdit && (hideEdit=="A"||(hideEdit=="E" && type=="edit")||(hideEdit=="N" && type=="new")),
//              disabledFlag = disabled && (disabled=="A"||(disabled=="E" && type=="edit")||(disabled=="N" && type=="new"));
//          if(hideEditFlag){
// 			if(name == tableKey && type == "edit"){
// 				$editModal.find('[name='+ tableKey +']').val(dataRow[tableKey]);
// 				$editModal.find("#"+ tableId +"-tableKey-"+ tableKey).val(dataRow[tableKey]);
// 			}
// 			continue;
// 		}
//
// 		var placeholder = $.i18n(i18nPrefix + name + ".help"),
// 			columnVal = dataRow && type=="edit"?dataRow[name]:undefined;
// 		columnVal = (columnVal && queryItem.ratio)?(columnVal/queryItem.ratio):columnVal;
// 		if(comType== "select"){
// 			if( comData && comData.data ){
// 				select2BaseImpl( comData, selector, placeholder );
// 				$(selector).val(columnVal).trigger("change");
// 				comData.selectE && comData.selectE();
// 			}
// 		}else if(comType == "ajaxSelect"){
// 			select2DataImpl(queryItem.comDataS2, selector, placeholder, dataRow[tableKey]);
// 			var colText = queryItem.comDataS2.editInit ? initEditS2Text(queryItem.comDataS2.url, columnVal, dataRow[tableKey]) : columnVal;
// 			$(selector).append("<option value='"+ columnVal +"'>"+ colText + "</option>");
// 			$(selector).val(columnVal).trigger("change");
// 		}else{
// 			isEdit && $(selector).val(columnVal);
// 		}
//
//          if(disabledFlag){
//              $editModal.find('[name='+ name +']').attr("disabled","disabled");
//              continue;
//          }
// 	}
// 	formChangeFlag = false;
// }

//初始化modal内容和数据
function fillModalContent(tableId, type, number) {
    var $table = $("#" + tableId),
        $modal = $("#" + tableId + "-" + type),
        local = $table.data(KEY_TABLE_ITEMS),
        data = $table.data("queryData"),
        trs = local.trs,
        tableKey = local.tableKey,
        i18nPrefix = local.i18nPrefix,
        dataRow = number && data[number] ? data[number] : {};
    for (var i = 0, itemsLen = trs.length; i < itemsLen; i++) {
        var queryItem = trs[i],
            name = queryItem.name,
            comType = queryItem.comType,
            comData = queryItem.comData,
            selector = "#" + tableId + "-" + type + " [name=\"" + name + "\"]",
            // hideEdit = queryItem.hideEdit,
            disabled = queryItem.disabled,
            // hideEditFlag = hideEdit && (hideEdit=="A"||(hideEdit=="E" && type=="edit")||(hideEdit=="N" && type=="new")),
            disabledFlag = disabled && (disabled === "A" || (disabled === "E" && type === "edit") || (disabled === "N" && type === "new")),
            placeholder = $.i18n(i18nPrefix + name + ".help"),
            columnVal = undefined;
        if (type === "new" && queryItem.addDef) {
            columnVal = queryItem.addDef;
        } else if (type === "edit" && dataRow) {
            columnVal = dataRow[name];
            columnVal = (columnVal && queryItem.ratio) ? (columnVal / queryItem.ratio) : columnVal;
        }

        if ($(selector).length === 0) {
            continue;
        }
        if (comType === "select") {
            select2BaseImpl(comData, selector, placeholder);
            $(selector).val(columnVal).trigger("change");
            comData.selectE && comData.selectE();
        } else if (comType === "ajaxSelect") {
            select2DataImpl(queryItem.comDataS2, selector, placeholder, dataRow[tableKey]);
            var colText = queryItem.comDataS2.editInit ? initEditS2Text(queryItem.comDataS2.url, columnVal, dataRow[tableKey]) : columnVal;
            $(selector).append("<option value='" + columnVal + "'>" + colText + "</option>");
            $(selector).val(columnVal).trigger("change");
        } else {
            $(selector).val(columnVal);
        }
        disabledFlag && $modal.find('[name=' + name + ']').attr("disabled", "disabled");
    }

    if ($modal.find('[name=' + tableKey + ']').val() === undefined) {
        $modal.find('.' + tableId + tableKey).val(dataRow[tableKey]);
    }
    formChangeFlag = false;
}

//初始化批量编辑modal内容和数据
function fillBatchEditModalContent(tableId) {
    var $table = $("#" + tableId),
        // $modal = $("#"+tableId +"-batchEdit"),
        local = $table.data(KEY_TABLE_ITEMS),
        trs = local.trs,
        i18nPrefix = local.i18nPrefix;
    for (var i = 0, itemsLen = trs.length; i < itemsLen; i++) {
        var queryItem = trs[i],
            name = queryItem.name,
            comType = queryItem.comType,
            comData = queryItem.comData,
            selector = "#" + tableId + "-batchEdit [name=\"" + name + "\"]",
            // columnVal = "-",
            placeholder = $.i18n(i18nPrefix + name + ".help");
        if ($(selector).length === 0) {
            continue;
        }
        if (comType === "select") {
            select2BaseImpl(comData, selector, placeholder);
            // $(selector).append("<option value='"+ columnVal +"'>"+ columnVal + "</option>");
            $(selector).val(undefined).trigger("change");
            // comData.selectE && comData.selectE();
        } else if (comType === "ajaxSelect") {
            select2DataImpl(queryItem.comDataS2, selector, placeholder);
            // $(selector).append("<option value='"+ columnVal +"'>"+ columnVal + "</option>");
            $(selector).val(undefined).trigger("change");
        } else {
            // $(selector).val(columnVal);
        }
    }
    formChangeFlag = false;
}

function initEditS2Text(url, value, tableKeyVal) {
    var params = {
        url: url,
        async: false,
        data: {editInit: value, tableKey: tableKeyVal},
        success: function (data) {
            if (data && data.data && data.data.items && data.data.items.length > 0) {
                if (data.data.items[0].id == value) {
                    return data.data.items[0].text;
                }
            }
            return undefined;
        }
    };
    var result = doTableAjax(params)
    return result ? result : $.i18n("label.tips.notFoundMatchedData") + value;
}

function showDialogModel(tableId, type) {
    var $editModal = $("body"),
        $header = $("#" + tableId + "-header");
    type = type || "detail";
    if (type === 'edit') {
        $header.removeClass("text-success").addClass("text-primary").html("<i class=\"fa fa-edit\"></i> " + $.i18n("edit")).val("edit");
    } else if (type === 'new') {
        $header.removeClass("text-primary").addClass("text-success").html("<i class=\"fa fa-plus\"></i> " + $.i18n("new")).val("new");
    }
    type !== "details" && initEditFormValidator(tableId, type);
    $editModal = $('#' + tableId + "-" + type).modal({backdrop: 'static'});
    setTimeout(function () {
        $editModal.find("span.error").remove();
        $editModal.find("input.error").removeClass("error");
    }, 200);
}

function removeModal(tableId, type, isSave) {
    var closeModal = function () {
        $("#" + tableId + "-" + type).modal('hide');
        setTimeout(function () {
            $("#" + tableId + "-" + type).remove();
            $(".modal-backdrop").remove();
        }, 500);
    }
    if (type != "detail" && !isSave && formChangeFlag) {
        layer.confirm($.i18n("frame.from.tips.confirmCancel"), function (idx) {
            layer.close(idx);
            closeModal();
            formChangeFlag = false;// reset flag
        });
    } else {
        closeModal();
        formChangeFlag = false;// reset flag
    }
}

function removeModalBetweenSkip(tableId, type) {
    $("#" + tableId + "-" + type).modal('hide');
    setTimeout(function () {
        $("#" + tableId + "-" + type).remove();
    }, 500);
}

function skip2EditModalG(tableId) {
    removeModalBetweenSkip(tableId, "detail");
    viewEditOrAdd(event, tableId, "edit");
}

function skip2DetailModalG(tableId) {
    removeModalBetweenSkip(tableId, "edit");
    viewDetail(tableId);
}

var formChangeFlag = false;
function formChangeModal() {
    formChangeFlag = true;
}

function toolDelete(tableId) {
    var urlPrefix = $("#" + tableId).data(KEY_TABLE_ITEMS).initParams.urlPrefix,
        params = {
            url: window.PATH + urlPrefix + "delete.ajax",
            data: {idList: deleteRowsList(tableId)},
            success: function (resp) {
                queryTableDataModel(tableId);
            }
        };
    layer.confirm($.i18n("frame.from.tips.confirmDel"), function () {
        doTableAjax(params)
    });
}

function toolSave(tableId, type) {
    var urlPrefix = $("#" + tableId).data("tableParams").initParams.urlPrefix,
        params = {
            url: window.PATH + urlPrefix + "save.ajax",
            data: getSubmitData({tableId: tableId, type: type}),
            success: function (resp) {
                queryTableDataModel(tableId);
                removeModal(tableId, type, true);
            }
        };
    doTableAjax(params);
}

function getSubmitData(params) {
    var tableId = params.tableId,
        type = params.type || "new",//|| $("#modal-"+tableId+"-type").val()
        $formId = $("#" + (params.formId || (tableId + "-" + type))),
        tableLocal = $("#" + tableId).data(KEY_TABLE_ITEMS),
        tableItems = tableLocal.trs,
        tableKey = tableLocal.tableKey,
        tableKeyVal = params.tableKeyVal || $formId.find("." + tableId + tableKey).val(),
        idList = $formId.find("[name=idList]").data("data-submit"),
        result = {};
    for (var i = 0, itemsLen = tableItems.length; i < itemsLen; i++) {
        var item = tableItems[i],
            name = item.name,
            hideEdit = item.hideEdit,
            batchEdit = item.batchEdit,
            numberFlag = item.vali &&
                (item.vali.integer || item.vali.number || item.vali.decimals || item.vali.digits),
            ratio = parseInt(item.ratio),
            // $inputContainer = $formId.find(".slideFlag-"+name),
            inputVal = $formId.find("[name=" + name + "]").val();
        //可以直接判断dom是否存在
        if ((type === "edit" && (hideEdit === "A" || hideEdit === "E")) ||
            (type === "new" && (hideEdit === "A" || hideEdit === "N")) ||
            (type === "batchEdit" && (!batchEdit || inputVal === "" || inputVal === undefined || inputVal === null))) {//$inputContainer.is(":hidden")
            continue;
        }
        if (inputVal === undefined || inputVal === null || inputVal === "") {//清空值
            inputVal = "";
            if (numberFlag) {
                inputVal = 0;
            }
        } else {
            if (ratio && !isNaN(ratio)) {
                inputVal = inputVal * ratio;
            }
        }
        result[name] = inputVal;
    }
    //提交仅支持new和edit两种
    if (type !== "new") {
        type = "edit";
    }
    if (type === "edit" && (result[tableKey] === undefined || result[tableKey] === "")) {
        result[tableKey] = tableKeyVal;
    }
    if (idList) {
        result.idList = idList;
    }
    result.actionName = $.i18n(type);
    return result;
}

function deleteRowsList(tableId) {
    var checkedsubList = $("input[name*='" + tableId + "-rowItems']:checked");
    var deleteIds = [];
    for (var i = 0; i < checkedsubList.length; i++) {
        var arr = checkedsubList[i].value.split("-|-");
        deleteIds[i] = arr[0];
    }
    return deleteIds;
}

function initEditFormValidator(tableId, type, submitFunction) {
    var tableItems = $("#" + tableId).data(KEY_TABLE_ITEMS).trs,
        fieldObj = createValidator(tableItems, type);
    // 初始化编辑框验证表单
    $('#' + tableId + "-" + type + "-form").bootstrapValidator({
        excluded: [':disabled'],//不能过滤hidden，与select2控件相关有冲突
        live: 'disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        submitHandler: function (validator, form, submitButton) {
            toolSave(tableId, type);
        },
        fields: fieldObj
    });
}

//外部使用
function initFormValidators(params) {
    var data = {
        tableId: params.tableId || "",
        formId: params.formId || (tableId + "-edit-form"),
        fields: params.fields || {},
        submit: params.submit,
        type: params.type || "new"
    };
    var fieldObj = createValidator(data.fields);
    $('#' + data.formId).bootstrapValidator({
        excluded: [':disabled', ':hidden'],
        live: 'disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        submitHandler: function (validator, form, submitButton) {
            data.submit ? data.submit(data.tableId) : toolSave(data.tableId, data.type);
        },
        fields: fieldObj
    });
}

//注意java integer类型的范围，最大值10位 2147483647
//type位batchEdit时，所有字段非必填
function createValidator(colsArr, type) {
    var itemLen = colsArr.length, fields = {},
        languageObj = (window.LANGUAGE && window.LANGUAGE == "zh_CN") ? tableValidator_zh_CN : tableValidator_en_US;
    for (var i = 0; i < itemLen; i++) {
        var item = colsArr[i],
            name = item.name,
            vali = item.vali,
            hideEdit = item.hideEdit;

        var validator = {};
        validator.htmlChar = {};
        validator.htmlChar.message = languageObj.htmlChar;

        if (!(vali && vali.required === false) && type !== "batchEdit") {
            validator.notEmpty = {};
            validator.notEmpty.message = languageObj.notEmpty;
        }
        if (vali) {
            if (vali.emailAddress) {
                validator.emailAddress = {};
                validator.emailAddress.message = languageObj.emailAddress;
            }
            if (vali.uri) {
                validator.uri = {};
                validator.uri.message = languageObj.uri;
            }
            if (vali.date) {
                var dateFormat = vali.dateFormat ? vali.dateFormat : "YYYY-MM-DD hh:mm:ss";
                validator.date = {};
                validator.date.message = languageObj.date;
                validator.date.format = dateFormat;
            }
            if (vali.stringLength) {
                var min = vali.stringLength[0] ? vali.stringLength[0] : 0,
                    max = vali.stringLength[1] ? vali.stringLength[1] : vali.stringLength;
                if (min || max) {
                    var stringLength = {};
                    stringLength.max = max;
                    stringLength.min = min;
                    stringLength.message = languageObj.stringLength.replace("{0}", min).replace("{1}", max);
                    validator.stringLength = stringLength;
                }
            }
            if (vali.between) {
                var between = {};
                if (isArray(vali.between) && vali.between.length == 2) {
                    between.min = vali.between[0];
                    between.max = vali.between[1];
                } else {
                    between.min = 0;
                    between.max = vali.between[0] || vali.between || 0;
                }
                between.message = languageObj.between.replace("{0}", between.min).replace("{1}", between.max);
                validator.between = between;
            }
            if (vali.greaterThan) {
                var greaterThan = {};
                greaterThan.value = vali.greaterThan;
                greaterThan.inclusive = true;
                greaterThan.message = languageObj.greaterThan.replace("{0}", vali.greaterThan);
                validator.greaterThan = greater;
            }
            if (vali.lessThan) {
                var lessThan = {};
                lessThan.value = vali.lessThan;
                lessThan.inclusive = true;
                lessThan.message = languageObj.lessThan.replace("{0}", vali.lessThan);
                validator.lessThan = lessThan;
            }
            if (vali.between || vali.numeric || vali.greaterThan || vali.lessThan) {
                validator.numeric = {};
                validator.numeric.message = languageObj.numeric;
            }
            if (vali.digits) {
                validator.digits = {};
                validator.digits.message = languageObj.digits;
            }
            if (vali.integer) {
                validator.integer = {};
                validator.integer.message = languageObj.integer;
            }
            if (vali.creditCard) {
                validator.creditCard = {};
                validator.creditCard.message = languageObj.creditCard;
            }
            if (vali.remote) {
            }
            if (vali.regexp) {
                validator.regexp = {};
                validator.regexp.regexp = vali.regexp;
                validator.regexp.message = languageObj.regexp;
            }
            if (vali.decimals) {
                validator.decimals = {};
                validator.decimals.message = languageObj.decimals.replace("{0}", vali.decimals);
                validator.decimals.digits = vali.decimals;
            }
            if (vali.authNum) {
                validator.authNum = {};
                var remain = vali.authNum[0] ? vali.authNum[0] : 0;
                var total = vali.authNum[1] ? vali.authNum[1] : 0;
                validator.authNum.message = languageObj.authNum.replace("{0}", remain).replace("{1}", total);
                validator.authNum.remain = remain;
                validator.authNum.sum = total;
            }
            if (vali.authUrlFormat) {
                validator.authUrlFormat = {};
                validator.authUrlFormat.message = languageObj.authUrlFormat;
            }
        }
        if (validator && !isEmptyObject(validator)) {
            var field = {};
            field.message = "default error message.";
            field.validators = validator;
            fields[name] = field;
        }
    }
    return fields;
}
//日期回调 eval执行，有用到
function laydateCallbackModel(tableId, fieldName) {
    var $editModal = $("#" + tableId + "-edit-form"),
        $batchEditModal = $("#" + tableId + "-batchEdit-form");
    $editModal.length > 0 && $editModal.data("bootstrapValidator").resetForm().validateField(fieldName);
    $batchEditModal.length > 0 && $batchEditModal.data("bootstrapValidator").resetForm().validateField(fieldName);
}

function doTableAjax(param) {
    var loadInx = layer.load(2);
    var result = "";
    $.ajax({
        url: param.url,
        type: param.type || "post",
        async: param.async === undefined ? true : param.async,
        timeout: param.timeout || 20000, // 超时时间设置，单位毫秒
        complete: param.complete || function (XMLHttpRequest, status) { // 请求完成后最终执行参数
            tableajaxComplete(XMLHttpRequest, status, loadInx);
        },// 请求完成后最终执行参数
        data: param.data || {},
        contentType: param.contentType, // 设置请求头信息
        dataType: param.dataType || "json",
        success: function (res) {
            try {
                if (res.state != 0) {
                    layer.msg.error("error:" + res.message);
                } else {
                    if (param.success)
                        result = param.success(res);
                    res.message && layer.msg.success(res.message);
                }
                //layer.close(loadInx);
            } catch (e) {
                //layer.close(loadInx);
            }
        },
        error: function (res) {
            var msg = ( res && res.responseJSON ) ? res.responseJSON.message : res.message;
            layer.msg.error("error:" + msg);
            layer.close(loadInx);
        }
    });
    return result;
}

var tableIsDown = false;
var tableIsDraggle = false;
var tableStartLeft = 9999;
var tableResizeWidth = 0;
var tableStartColumnName = "";
function thOnMouseDownModel(tableId, columnName) {
    if (!tableIsDraggle)return;
    var $table = $("#" + tableId),
        $body = $("body"),
        $drpLine = $("#datagrid-resize-proxy");
    var top = $table.offset().top,
        left = event.clientX,
        height = $table.height();
    tableStartLeft = left;
    tableStartColumnName = columnName;
    tableIsDown = true;
    $drpLine.attr("style", "display: block; height: " + height + "px; left: " + left + "px; top: " + top + "px;");// show().css()
    // 按下 禁止选择文本
    $body.css({"-moz-user-select": "none", "-webkit-user-select": "none", "user-select": "none"});
}

function thOnMouseMoveModel(tableId) {
    tableIsDraggle = event.offsetX > event.target.offsetWidth - 4 && event.target.localName == "th";
    if (event.target.localName == "th") {
        event.target.style.cursor = event.offsetX > event.target.offsetWidth - 4 ? 'col-resize' : 'default';
    }
    if (tableIsDown) {
        var $drpLine = $("#datagrid-resize-proxy");
        var th_width = $("#th-" + tableId + "-" + tableStartColumnName).width() - 7;
        tableResizeWidth = event.clientX - tableStartLeft + th_width;
        if (tableResizeWidth > 40) {
            $drpLine.css("left", event.clientX + 4);// 避免挡住
        }
    }
}

function thOnMouseUpModel(tableId) {
    if (!tableIsDown) return;
    if (tableResizeWidth < 40) {
        tableResizeWidth = 40
    }

    var tableItems = $("#" + tableId).data(KEY_TABLE_ITEMS),
        items = tableItems.trs,
        len = items.length;
    for (var i = 0; i < len; i++) {
        var name = items[i].name;
        if (name == tableStartColumnName) {
            items[i].width = tableResizeWidth;
            tableItems.trs = items;
            setLocalStorageModel(tableId, "tableParams", tableItems);
            createTabEntityById(tableId);
        }
    }
    var $body = $("body");
    var $drpLine = $("#datagrid-resize-proxy");
    $drpLine.hide();
    // 抬起 恢复选择文本
    $body.css({"-moz-user-select": "text", "-webkit-user-select": "text", "user-select": "text"});
    tableIsDown = false;
    tableIsDraggle = false;
    tableStartLeft = 9999;
    tableResizeWidth = 0;
    tableStartColumnName = "";
}
	   