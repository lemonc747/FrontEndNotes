
## 表格参数
beta版，不完整，不一定准确

### 一级配置项

属性名 | 类型 | 含义
---|---|---
version | String or int | 版本号：控制缓存
tableKey | String | 表格主键
i18nPrefix | String | 国际化字段主键
batchEdit | boolean | 是否允许批量编辑
customComps | object | 自定义按钮配置
initParams | object | 部分初始化参数配置
trs | Array | 表格：字段详细配置

### 次级配置项
#### customComps: 自定义按钮
说明：一般不用配置这一项，使用默认的按钮组即可

属性：增删改查+自定义按钮
属性名 | 类型 | 含义
---|---|---
detail | object | 详情按钮配置
add | object | 新增按钮配置
edit | object | 编辑按钮配置
delete | object | 删除按钮配置
custom | !Array | 多个自定义按钮的数组

增删改查按钮配置：
- click：点击事件
- skip2EditModal：跳转到编辑页面按钮

每个custom按钮的配置项：
属性名 | 类型 | 取值范围 | 含义
---|---|---|---
location | int | 1 2 3 | 按钮的位置
color | String | success primary...| beyond标识颜色的类名
icon | String | fontawesome | fontswesome类名
click | function | | 按钮点击事件
name|String|需要在国际化中配置|按钮名称


#### initParams：部分初始化参数配置
说明：这些参数后续可能调整
属性名 | 类型 | 含义
---|---|---
tableId | String | | 表格容器id
toolsId | String | | 工具栏容器id
urlPrefix | String | | ajax请求前缀
permissions | Array | [0,1,0,1] 0表示允许，1表示禁止，4项顺序为查增改删 | 增删改查权限

#### trs[index]: 表格字段，每列配置
属性名 | 类型 | 含义 | 取值范围 | 默认值
---|---|---|---|---
name | String | 数据库字段名| | 
width | int | 列宽，单位PX | | 80
show | boolean | 默认是否显示该列 | true false | true
vali | Object | 校验提交数据 | | {}
hideEdit | Stirng | 新增编辑是否隐藏 | N(新增隐藏)E(编辑隐藏)A都隐藏()|默认不隐藏
disabled| String|新增编辑是否disabled|参数同hideEdit|默认不disabled
advQry|String|是否可搜索 | LIKE DURING区间 IN多选其一 ...| 默认不搜索
comType | String |组件类型| select ajaxSelect | 默认为普通输入框
comData | Array二维数组 | comType=select时，数据源| 可取自国际化信息，可自己配置| 默认取国际化数据：i18nprefix+name+".comData"
comS2Data| Object | comType=ajaxSelect时，数据配置 |
valFormat|Function | 格式化函数，可选参数:value(数据值)rowData(该行数据Obj)|
ratio|int |倍率，value除ratio=显示值||
batchEdit|boolean|该字段是否批量编辑，前提一级目录batchEdit=true| true false |
order| boolean | 是否可排序 | true false | false

### 三级配置项
#### trs[index].vali 
每个配置项相互独立，不要添加矛盾的配置进去
属性名 | 类型 | 含义 | 取值范围 | 默认值
---|---|---|---|---
required|boolean|是否必填|true false | true
integer| boolean|自然数（0，正整数）|低于数据库限制|无限制
digits|boolean|整数（0，正整数，负整数）|低于数据库限制|无限制
numeric|boolean|数值类型|numeric，between，greaterThan，lessThan都默认会验证numeric数值类型|无限制
stringLength|int|字符串长度限制|低于数据库限制|无限制
between|int|数值范围限制|低于数据库限制|无限制
decimals|int|小数点最大位数|通常跟ratio关联|无限制，但小数数据库会报错
emailAddress|boolean|是否要求邮件格式||false
uri|boolean|是否要求链接格式||false
date|boolean|是否要求日期格式||false

#### trs[index].comDataS2
属性名 | 类型 | 含义  
---|---|---
url|String|请求链接，只需要写链接后缀即可
formatResult|Function|格式化结果函数
formatSelection|Function|格式化选项函数
selectCallback|Function|选中回调
wifiAreaFM|boolean|地区格式化的快捷方式
editInit|boolean|编辑时是否需要初始化select2的文本，即remote s2需要查询一次value对应的需要显示的文本
queryParams|Object|select2查询额外添加参数的function或object

### TIPS
1. i18nPrefix以点号结束
2. requestUrl主请求以斜杠结束，其他子页面请求在主请求后面加字符串。之所有这么做，是因为一个ctrl的请求前面部分是固定的，当页面有多个子页面时，可以通过"/a/b/"+"save.ajax","/a/b/dev"+"save.ajax"区分请求
3. 通常有三种初始化方式，1：InitTableModuleNew直接绘制表格，2：CheckAndInitStorage检查并存储localStorage，3：InitTableModuleWithId根据容器id绘制表格。

### 地区管理
**国家来源于country表数据库，中国省和城市来源于tbChinaCity表，国际化信息来源于国际化文件**
- 国家：country.国家简写，eg:country.cn=中国
- 省.城市：cn.省.城市，eg: cn.guangdong.shenzhen=广东.深圳
- 省：cn.region.省，eg:cn.region.guangdong=广东
- 城市：cn.city.城市，eg:cn.city.shenzhen=深圳 ###同音字的原因，停用该组国际化字段
- 同音字：
    - 山西和陕西：按照英文的区分方式，陕西写作shaanxi
    - 城市不做区分：如苏州和宿州都是suzhou，福州和抚州都是fuzhou。不依靠拼音区分，而是靠与省会组合查询。
    也就是说，不能单独有城市拼音判断城市，而是需要有省的前提。









## 后续的改动和拓展
-  hide: E 编辑  N 新增  V 显示  A 全部  >> string or array （可拓展）
（hideEdit: A N E保留，兼容）
disabled 也可以类比改动
- 自定义按钮可以批量操作了 >> batch:true
- comData的值也支持对象了，可以传入selectE函数
- 

- 支持中文校验 zh:boolean
- 支持自定义校验 valid:{test:fun, msg:xxx}