## dataTable API @EouTech 2017
[author: gya](https://emeralddreamland.github.io/)

#### MultiTableTeTempl一些构成思路
- 国际化
    - 列名称：      i18nPrefix + name
    - 列编辑提示：    i18nPrefix + name +".help"
    - 选择数组：     i18nPrefix + name +".comData"
    - 带色彩类的数组：    i18nPrefix + name +".dataPlus"
    
- table结构
    - 由tableId衍生的各部位ID
    - 请求url：path + list/delete/add...   
    - 把固定的部分从“/x.ajax”改成“x.ajax”，这样可以在页面请求时拼接其他字符到x上面 所以自定义请求部分需要带上“/”
    - datagrid-resize-proxy，调整列宽时显示的悬浮线条

- 主体结构
    1. 检查&初始化参数
    2. 支持的所有加载表格的方式
    3. 加载工具栏&事件
    4. 加载表格主体&事件

- 待优化点
    - 事件委托 1.表格主体的事件委托 表格主体的事件委托到一次加载的主体部分，不随刷新改变。
    - 工具栏的事件委托
    - 分页事件委托 事件委托可以让数据````部分集中处理 2.逐步支持所有部分的定制 1.工具栏
    - 在详情前，删除后，搜索后放置三个区域，我们可以添加自定义按钮，并添加事件
    - 写工具类 5.批量操作，参考之前的系统
    - 所有操作的数据实时获取，包括详情，编辑，新增等 提供获取行ID方法，然后所有的数据实时查询

#### 程序入口-初始化表格
###### 列举初始化&加载表格的所有允许方式
0. CheckAndInitStorage： 检查参数完整性，格式化参数，初始化或更新参数localStorage  
    初始化时，非展示界面仅检查更新localStorage,在点击tab标签时，通过tableId加载table
1. InitTableMoudle:  
    兼容旧版本的加载方式——把旧版本的参数转换成新版，进而调用新版本方法；
2. InitTableModuleNew： 
    新版参数创建表格——params直接初始化table 3.InitTableModuleWithId： 通过tableId加载表格
3. checkLocalStorage:     
    1. 使用tableId检查localStorage完整性  
    检查和保存参数到localStorage和$table.data()，分别为持久数据和即时数据  
    暂不初始化表格。通常因为在页面初始化时，该表格不可见，无需加载；  
    2. 说明：  
        1. jquery.data()即时数据:    存储在DOM上的即时性数据，刷新等操作会销毁数据;
        2. localStorage持久数据：    存储在浏览器的localStorage，清除缓存会销毁数据
        3. 更新localStorage的条件：  
        !旧存储数据 || !(新旧数据都没有version || 新旧版本都有version且version相同)  
        4. 表格的version的值一定要保持递增，因为不同用户存储的版本可能不同
4. switchTabAndTools:     
    点击tab标签，创建或刷新table


#### 表格API
    /*
     * 格式化参数/设置默认参数
     *      初始化所有必要的参数，减少内部的频繁验证，并更新本地存储
     *
     * 默认参数：
     *      列默认显示 show:true； 默认必填 required:true； 默认不排序,主键排序
     *         if(sort)->sort 宽度默认100 width:100 key键默认disabled："E" 默认日期格式
     *         "YYYY-MM-DD hh:mm:ss"
      *
      *  格式化参数tableItems：
      *      参数名:                类型              含义
      *      trs:                array           字段配置参数的数组集合
      *          name:           str
      *          width:          num
      *          ...etc,和表格参数一致
      *      localStrg:          obj
      *          version         str             版本号，用于识别更新
      *          pageSize        num/str         单页条数
      *          sorts           array           排序参数（格式化）
      *          showCols        array           显示列
      *          resetCols       array           初始显示列
      *          customComps     array           自定义按钮
      *          urlPrefix       str             window.PATH + tableItems.initParams.urlPrefix
      *      其他参数保留：更新了trs，增加了localStrg
     */

#### 添加菜单栏目
######  添加新页面 
    包括如下几个方面
    1. resource表新菜单数据
    2. angularJS路由(controler +childPage +JS引入)
    3. JSP页面编写
    4. java数据查询
    
    
#### 地区管理
**国家来源于country表数据库，中国省和城市来源于tbChinaCity表，国际化信息来源于国际化文件**
- 国家：country.国家简写，eg:country.cn=中国
- 省.城市：cn.省.城市，eg: cn.guangdong.shenzhen=广东.深圳
- 省：cn.region.省，eg:cn.region.guangdong=广东
- 城市：cn.city.城市，eg:cn.city.shenzhen=深圳
- 同音字：
    - 山西和陕西：按照英文的区分方式，陕西写作shaanxi
    - 城市不做区分：如苏州和宿州都是suzhou，福州和抚州都是fuzhou。不依靠拼音区分，而是靠与省会组合
    
    
    
    /*****************************
     测试新参数
     queryParams
    
     version		str 参数版本,用于对比localStorage版本，判断是否更新
     tableKey	str	表格KeyID
     i18nPrefix	str	国际化前缀，点号结束（非点号时补上点号）
     pageSize
     sorts	排序
     customComps	obj 表格的各个组件部分。是否定制
     存在定制时，会取消原有的构建和函数
     1.
     search  obj
     2.
     detail
     3.
     add 	obj 定制的新增模态框
     定制与接口函数的平衡
     新增事件要素：
     1.按钮本身的点击事件；2.表单校验：name属性即可，这部分可共用；3.提交事件：4.关闭？
     //click	function(value?){ }	新增按钮事件
    
     customLevel:？ 不需要这个，设置默认函数即可
     1.完全定制：与原本的新增事件无关联，执行event即可
     2.html界面定制：
    
     event:	function	default:function(){	}
    
     validator:{
    				formId:	表单ID
    				formSubmit: 提交表单
    				callback: 提交完成的回调
    			}
     3.
     edit
     eg:
     customComps:{
    				add:{
    					click:customAddModal,
    
    				},
    				edit:{
    					click:customEditModal,
    					skip2DetailModal:...
    				},
    				detail:{
    					click:...
    					skip2EditModal:...
    				}
    				// click 点击生成界面的函数； skip2...Modal编辑和详情相互跳转的函数；
    				//这两个函数一般不会同时存在，因为自定义界面
    
    				custom:[  ->数组，多个自定义按钮
    					{name : "name" -> 用于组成id和识别, 国际化字段
    					 location: 1/2/3 ->约定的几个位置的标识
    					 color: color ->图标的颜色
    					 icon : "fa-..." ->fontAwesome字体图标类
    					 click   : 点击事件
    					 associated: true/false  是否需要选中行才显示，默认关联;
    					},
    					{},...]
    			},
    
    
    
     initParams	obj 初始化表格的参数
     tableId
     toolsId
     urlPrefix
     permissions
     //page ,page就不用设置，默认进入就是1
     //pageSize ,可能会有特殊需求   放到一级目录
     trs	arr	各个字段的详细配置
     1.搜索
     advQry：搜索标识，&查询方式 	[LIKE]
     *数组形式，即可以支持多种搜索形式——以后再说
     *LIKE必须带前或后或前后*星号，否则视为EQ
     [EQ,LIKE,IN,GTE,LTE,DURING]
     [相等，模糊，内部之一（多选），大于，小于，范围（需要两个输入框）]
     EQ: 相等
     LIKE: LIKE必须带前或后或前后*星号，否则视为EQ
     IN：内部之一，主要用于多选
     GTE:
     LTE:
    
     2.qryData object 搜索数据 尚未应用
     type
     data
     dataS2
    
     qryType: 输入框组件
     默认采用：新增编辑的组件（在初始时赋值），data也是一样
     select， ajaxSelect, date,
     qryData: 默认取comData
     *嵌套选项的格式：[{text:"", children:[{id:"", text:""},...]},...]
    
     qryDataS2: 默认取comDataS2
     qryDateFormat :默认取vali.dateFormat
     qryDef: 查询默认值
    
     2.新增编辑
     comType:
     ajaxSelect		ajax请求远程数据
     select
    
     comData:
     1.兼容之前的格式： 二维数组  ！注意:typeof 数组 结果是 object，所以不能直接这样判断
     将这种格式初始化object的形式 { data: ....}
     2. object ： {}
     data:
     selectE:
     formatResult:
     formatSelection:
    
    
     comDataS2:{
    			url:
    			formatResult:
    			formatSelection:
    			selectCallback:
    			wifiAreaFM
    			selectE
    			editInit: 编辑时是否需要初始化select2的文本，即remote s2需要查询一次value对应的需要显示的文本
    			queryParams: select2查询额外添加参数的function或object
    		}
    
     3.详情
     detailFormat
    
     //组装，非原生
     localStrg obj 需要本地保存的信息(永久保存，用户的设置，或其他)
     初始化即设置到localStorage
     version:
     pageSize:
     showCols	obj 各字段是否显示，放到一个obj下面，使用会更方便（这个可以后面评估是否修改?） "[1,2,3,2,3]"列名数组
     sorts	arr 默认排序 order:'[["keyID",2]]'/0？1升序2降序	让排序可以前台设置
    
    
     数据保存：
     localStorage:
     version/tableKey/showFlag/order。key值为tableId，
     jquery data():
     queryParams
     使用data()存储数据就可以直接存储function，而不是function的名称字符串。
    
     *******************************************************************************************/
    
    /************************	升级版2.0	begin***************************
     tableItems增加一级子菜单：
     ..., initParams:{tableId:"tableId", toolsId:"tableToolsId", urlPrefix: url, permissions: permi , page: "1"},...
     包含其他可扩展的参数等...
     -同时增加了更新localstorage的标识：
     version:"",...
     位于tableItems的一级子菜单
     //检查并存储storage
     CheckAndInitStorage(vswTableParams);
     //默认点击tab键刷新，或者手动调用（例如：展示的第一个页面就是表格页面，则需要直接调用）
     InitTableModuleNew(params)
     InitTableModuleWithId(tableId)
     /************************	升级版2.0	end***************************/
    
    
    /**************************************************		table页面模板：固定版 ***********************************/
    /********************	table参数示例  *******************/
    var tableItems = {version: "n", tableKey: "", i18nPrefix:"db.x.",trs:[
    	{name:"", show:false, width:"100", hideEdit:"E/N/A",advQry:["LIKE"], comType:"select", comData:"二维数组", valFormat:"FunctionName", ratio:1000},
    	//......
    ]}
    var requestUrl = "/.../";//以斜杠结尾  *****!!!!!!!!!!!!!
    var permission = ['0','0','0','0'];
    InitTableMoudle("tableId", "tableToolId", requestUrl, tableItems, permission, "1");
    
    
    
    //TIPS:
    //1.resetTime目前没有生效
    //2.i18nPrefix以点号结束
    //3.requestUrl主请求以斜杠结束，其他子页面请求在主请求后面加字符串。之所有这么做，是因为一个ctrl的请求前面部分是固定的，当页面有多个子页面时，可以通过"/a/b/"+"save.ajax","/a/b/dev"+"save.ajax"区分请求
    
    //其他拓展API***************************
    //1.表格的格式化
    var table_valFormat = function(){}
    //2.拓展详情界面
    var tableId_expandDetails = function(){}
    
    /******** 表格的常用处理 *********************/
    //1.如果表格中图标需要居中
    var simPDevNew_status_valFormat = function(value){
    	var tips = matchComdata2Alias("db.tbSimPDev.status.comData", value);
    	return "<div style='width:100%;text-align:center;'><div style='width:20px;margin:0px auto;'><i class='img-fmt simp-dev-sta-"
    		+ value+"'></i><i class='f-tips'>" + tips+"</i></div></div>";
    }
    
    /***********************	参数说明
     *tableKey	*{S}表格Key字段
     *i18nPrefix	*{S}国际化字段前缀，可配置：
     title：i18+name; help: title+".help"; comData:title+".comdata"
     *trs		*{L}表格列的详细配置
     *expandDetail	*{S}拓展详情界面的方法名
     *order		*{s} 默认排序    order:'[["keyID",2]]'   0？1升序2降序
    
    
     //X类型：I:数字,S:字符串,F:浮点小数类型; D:时间;	B:boolean, O:对象, L数组
    
     *字段名		*{X类型}含义						*default
     *name		*{S}数据库字段名，key键
     *width		*{I}表格列宽度，单位PX				*120px
     *show		*{B}列表默认是否显示该列			*true
     *
     *required	*{B}该字段是否必填					*true
     *hideEdit	*{S}编辑和新增时是否隐藏，参数:N:新增时隐藏,E:编辑时隐藏,A:全部隐藏			*默认不隐藏
     *disabled	*{S}编辑和新增是否不可更改，参数同上
     *comType	*{S}组件类型，参数：
     *
     *				新增了几种方式
     1 select：选择框，与comData配合
    
     2 comType=="duringDate" 时间段搜索
    
     3 comType=="ajaxSelect"，
    
    
     *comData	*{二维数组}用来和comType选择框搭配使用，		*默认是配置在国际化文件中的数据，i18nprefix+name+".comData"
     *advQry		*{未定，只有不为空}是否把该字段添加到搜索框
     参数:EQ:等于查询,LIKE:模糊查询,GTE:范围查询
     *vali		*{O}表格验证，参数：
     *字段名			*对应validator字段		含义
     1 required:true/false			notEmpty		是否是必需字段
     2 emailAddress: true/false		emailAddress	邮箱格式
     3 uri							uri				链接格式
     3 date							date			日期格式
     dateFormat日期格式，默认："YYYY-MM-DD hh:mm:ss"
     4 stringLength					stringLength	字符串长度
     数组：[1,100]，最小长度为1，最大长度为100
     整数：100，表示最小0最大100
     5 between						between			数值的最大值，逻辑与stringLength一致
     6 greaterThan					greaterThan		数值必需大于该值
     7 lessThan						lessThan		数值必需小于该值
     8 numeric						numeric			数值类型
     numeric，between，greaterThan，lessThan都默认会验证numeric数值类型
    
     9 digits						digits			整数（0，正整数，负整数）
     10 integer						integer			自然数（0，正整数）
     11 creditCard					creditCard		信用卡格式
     12 decimals						自定义验证期	小数点后几位
     *valForamt	*{S}目前只支持function，传递的是方法名
     //valFormat只用于格式化表格样式，comData既用于选择框，次之可格式化表格样式
     //优先用valFormat格式化表格显示，如果没有再用comData格式化表格显示
     *ratio		*{I}数值的倍率，显示除ratio，存储乘以ratio
     *tip		*{B}是否显示提示（特别是文本过长，显示不全时）
     *sort		*{B}是否可排序，来源：对于表外的自定义字段，无法排序查询，所以需要设置sort:false
     *
    
    
     /*************************************
    
    
     /****************************** 控件容器模板 *********************************************
     * NOTICE:
     * 		1.TAB页面设置类属性： 用于切换tab页面
     * 			tab按钮ID:flag-tabs-btn 工具栏ID: flag-tools； tab页面ID：flag-tabs
     <div class="row" >
     <div class="col-lg-12 col-sm-8 col-xs-12">  //这里根据容器大小改变
     <div class="widget">
     <div class="widget-header">
     <div class="widget-caption">
     title
     </div>
     </div>
     <div class=" widget-body">
     body
     </div>
     </div>
     </div>
     </div>
     /*********************************  多Tab页面基本模板 ***************************************
    
     <body>
     <div class="bs-example">
     <div class="row">
     <div class="col-xs-12 col-md-12">
     <div class="widget no-margin-bottom">
     <div class="widget-body no-padding">
     <div id="searchable_wrapper">
     <div class="tabbable">
     <ul class="nav nav-tabs">
     <!-- tab标签组 -->
     <li class="flag-tabs-btn active" id="【ModelName】Btn1">
     <a data-toggle="tab" href="javaScript:void(0)" onclick="switchTabAndTools('【ModelName】Tab1','')"><i class="fa fa-th font14"></i><spring:message code="label.common.outlineInfo"/></a>
     </li>
     <li class="flag-tabs-btn tab-blue" id="【ModelName】Btn2">
     <a data-toggle="tab" href="javaScript:void(0)" onclick="switchTabAndTools('【ModelName】Tab2','【ModelName】Tool2')"><i class="fa fa-list font14"></i><spring:message code="label.common.outlineInfo"/></a>
     </li>
     <li class="flag-tabs-btn tab-blue" id="【ModelName】Btn3">
     <a data-toggle="tab" href="javaScript:void(0)" onclick="switchTabAndTools('【ModelName】Tab3','【ModelName】Tool3')"><i class="fa fa-list font14"></i><spring:message code="label.common.outlineInfo"/></a>
     </li>
     <!-- tab2-工具按钮组 -->
     <li class="head-tools-r navbar-right flag-tools" style="display:none;"  id="【ModelName】Tool2"></li>
     <li class="head-tools-r navbar-right flag-tools" style="display:none;"  id="【ModelName】Tool3"></li>
     </ul>
     <!-- tab页面组 -->
     <div class="tab-content no-padding tabs-flat " style="border-radius:0;">
     <div id="【ModelName】Tab1" class="flag-tabs tab-pane  in active summary-tab"></div>
     <div id="【ModelName】Tab2" class="flag-tabs tab-pane" style="border-radius:0;"></div>
     <div id="【ModelName】Tab3" class="flag-tabs tab-pane" style="border-radius:0;"></div>
     </div>
     </div>
     </div>
     </div>
     </div>
     </div>
     </div>
     </div>
     <script>
     </script>
     </body>
     *****************************************************************************/
    
    
    
    
    
    
    /******************************************  含表格的静态页面：根据需求修改	begin @author gya  *********************************/
    
    
    /******************************************  含表格的静态页面：根据需求修改	end @author gya  *********************************/
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
        
        
        
         
    

         