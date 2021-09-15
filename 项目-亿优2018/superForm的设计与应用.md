### 组件类
面向对象，以类的方式组织组件。基类有公共属性和方法，组件类继承并拓展。

### data

this.data
- key: guid
- type: 类型
- properties: 属性
    - label: this.selfDomStrObj.name,
    - desc: "请设置对表单的描述",
    - placeholder: "请输入提示语",
    - more...
- style: 样式
    - textAlign: 文本对齐
    - fontColor:字体颜色
    - more...

私有属性
- propertiesTemp: 定义属性的模板
- template: 模板

### child.defaultData

var template:
- type: 
- preview:
- template: 
- properties:
    - key: 
        - template:
        - set: function(val) || 
        - get: function()
        - bind: 
- style: {}

定义属性的方式有两种：
|-|type|description|default|
|:---:|:---:|:---:|:---:|
|公共属性|string/number|继承公共属性，赋予新的默认值|-|
|属性|object|组件私有属性|-|

定义私有属性的格式：
```js
properties:{
property:{
    value: "默认值",
    get: function(val){
        // val：set函数设置的值，在这里可以做自定义处理
        // return： 自定义处理val; 
        // return可选，无return默认返回val
    },
    set: function(component, val){
        // component: 表示该组件实例，对组件做自定义处理
        // val：赋值的原始值，同样可以做自定义处理
        // return: val; 
        // return必须，否则无法设置值
        // 通常做数据和视图的绑定处理，在设置val的同事更新视图
    },
    bindSetting:function($setting, component){
        //$setting: 组件属性设置区域的dom jq对象
        //component: 组件实例
        //通常定义设置区域的绑定事件
    },
    loadSetting: function($setting, val){
        //$setting: 组件属性设置区域的dom jq对象
        //val: 加载数据时该属性的值
        //通常用于更新设置区域的视图和value
    }
}

}

tips 1: 当属性时组合值时，要全部修改该值，才能触发set函数；
// 
// 例如：number的range属性为数组，range= [0,200]
// 如果在监听中修改range[0] = 10不会触发set函数
// 如果var newRa = range;range[0]=10; property = newRa;这样才能触发

```

### this.data.properties
组件属性由于结合公共属性和自有属性，情况会复杂一些

定义每个property的组成
- key: property name
- 

### value与视图绑定（以属性为例）
- 视图有两个：
  - compView：组件
  - formView: 设置组件的form
- 数据：
  - compValue: 组件的数据
  - formValue: 设置组件的form表单的值
- 事件：
  - formEvent: 设置组件的form的绑定事件

目前的处理方案：
1. (init) => formView => formValue => formEvent
2. formEvent => compValue
3. compValue => compView

简单来说：设置form绑定了component的value，value绑定了自身的view。

### 职责
A.基类
- properties：属性

A: 基类
- init: 初始化基础数据
    - this.data.key
    - this.data.type
    - this.template
- defineFields: 定义
    - defineBaseProperties: 公共属性
    - defineStyles： 公共样式
- bindEvents: 初始化绑定事件
    - bindProperties
    - bindStyles
- load: 加载数据
    - loadProperties
    - loadStyle

B: 组件类
- template: 提供模板
- data： 提供数据
    - defaultData: 样板数据
    - data： 数据回流
- defineOwnProperty: 定义组件特有的属性
- renderDom：绘制组件

tips:
1. 子类避免直接操作数据，而是调用父类方法。例如：`var a = this.data.properties.name`改为`var a = this.getProperty("name")`

###  API
- data
    - getData: 返回数据集合
    - getKey: 返回key
    - getDom: 返回组件dom
- render: 渲染数据
- definedOwnPropertyModel: 接口，定义特有属性

### tips

1. this.data.properties和this.data.style采用Object.defineProperties定义属性，所以只能遍历赋值，不能整体替换
```javascript
// wrong way
var data = {label:111,placeholder:222};
this.data.properties = data;//new data
// right way
for(var item in data){
    this.data.properties[item] = data[item];
}

```
2. 所有的参数输入，都要使用副本，防止污染源数据


### todo
1. 样式的默认值需要填充吗？点击选中后，样式值为空的的部分，style区域没有显示默认值

### test
template：
{
    "key": "b4edd19f-be2f-4986-bd2a-d3dbcc267827",
    "val": {
        "typeNum": "1",
        "styleObj": {},
        "viewStyleObj": {},
        "type": "TEXTAREA",
        "label": "文本域",
        "decs": "请设置对表单的描述",
        "placeholder": "请输入提示语",
        "disable": false,
        "readonly": false,
        "required": false,
        "minnumber": 0,
        "maxnumber": 200
    }
},


``` javascript 
// test

_getOwnPropeties(ownProperties){
    // common
    var commonProperties = {
        label: {
            value: "请输入标题",
            template:     
                '<div class="form-group col-md-12" style="margin-top: 10px">'+
                    '<label class="col-md-12 control-label">表单项名称</label>'+
                    '<div class="col-md-12">'+
                        '<input type="text" class="form-control '+attrPH.label+'" placeholder="请输入表单项名称">'+
                    '</div>'+
                '</div>',
            set: function(component, val){
                component.$self.find("."+attrPH.label).text(val);
            },
            bindSetting:function($setting, component){
                $setting.find("."+attrPH.label).on("keyup", function(e){
                    component.data.properties.label = $(this).val();
                });
            },
            loadSetting: function($setting, val){
                $setting.find("."+attrPH.label).val(val);
            }
        },
        desc: {
            value: "请输入标题",
            template: 
                '<div class="form-group col-md-12">'+
                    '<label class="col-md-12 control-label">表单项描述</label>'+
                    '<div class="col-md-12">'+
                        '<input type="text" class="form-control '+attrPH.desc+'" placeholder="请输入对表单项的描述">'+
                    '</div>'+
                '</div>',
            set: function(component, val){
                component.$self.find("."+attrPH.desc).text(val);
            },
            bindSetting:function($setting, component){
                $setting.find("."+attrPH.desc).on("keyup", function(e){
                    component.data.properties.desc = $(this).val();
                });
            },
            loadSetting: function($setting, val){
                $setting.find("."+attrPH.desc).val(val);
            }
        },
        placeholder: {
            value: "请输入标题",
            template: 
                ['<div class="form-group col-md-12">',
                    '<label class="col-md-12 control-label">表单项输入提示</label>',
                    '<div class="col-md-12">',
                        '<input type="text" class="form-control '+attrPH.placeholder+'" placeholder="请输入提示语">',
                    '</div>',
                '</div>'].join(''),
            //get: undefined,
            set: function(component, val){
                component.$self.find("."+attrPH.placeholder).attr("placeholder",val);
            },
            bindSetting:function($setting, component){
                $setting.find("."+attrPH.placeholder).on("keyup", function(e){
                    component.data.properties.placeholder = $(this).val();
                });
            },
            loadSetting: function($setting, val){
                $setting.find("."+attrPH.placeholder).val(val);
            }
        },
        disabled: {
            value: "请输入标题",
            template: 
                ['<div class="col-md-12">',
                    '<div class="checkbox">',
                        '<label>',
                            '<input type="checkbox" class="'+attrPH.disabled+'"> 禁用',
                        '</label>',
                    '</div>',
                '</div>'].join(''),
            bindSetting:function($setting, component){
                $setting.find("."+attrPH.disabled).on("click", function(e){
                    component.data.properties.disabled = $(this).prop("checked");
                });
            },
            loadSetting: function($setting, val){
                $setting.find("."+attrPH.disabled).prop("checked", val);
            }
        },
        readonly: {
            value: "请输入标题",
            template: 
                ['<div class="col-md-12">',
                    '<div class="checkbox">',
                        '<label>',
                            '<input type="checkbox" class="'+attrPH.readonly+'"> 禁用',
                        '</label>',
                    '</div>',
                '</div>'].join(''),
            bindSetting:function($setting, component){
                $setting.find("."+attrPH.readonly).on("click", function(e){
                    component.data.properties.readonly = $(this).prop("checked");
                });
            },
            loadSetting: function($setting, val){
                $setting.find("."+attrPH.readonly).prop("checked", val);
            }
        },
        required: {
            value: "请输入标题",
            template: 
                ['<div class="col-md-12">',
                    '<div class="checkbox">',
                        '<label>',
                            '<input type="checkbox" class="'+attrPH.required+'"> 禁用',
                        '</label>',
                    '</div>',
                '</div>'].join(''),
            bindSetting:function($setting, component){
                $setting.find("."+attrPH.required).on("click", function(e){
                    component.data.properties.required = $(this).prop("checked");
                });
            },
            loadSetting: function($setting, val){
                $setting.find("."+attrPH.required).prop("checked", val);
            }
        }
    }










    // 参照ownProperties，整合commonProperties中已有的属性
    // 仅添加ownProperties中有的字段
    // ownProperties.key为string时，表示value值，其他内容为默认，copy commonP中的其他内容
    for(var item in ownProperties){
        var property = ownProperties[item];
        if(typeof property !== 'object'){
            ownProperties[item] = commonProperties[item];
            ownProperties[item].value = property;
        }
    }
    this.const.properties = myproperties;
}


_loadAndBindPropertiesSetting(){
    // var _value = {};
    var myproperties = this.const.properties;
    // var descriptors = {};
    for(var item in myproperties){
        var property = myproperties[item];
        var $setting = $(property.template).appendTo($(boxs.attribute));
        property.loadSetting && property.bindAndLoad($setting, val);
        property.bindSetting && property.bindAndLoad($setting, this);

    }
}
_loadProperties(){
    //遍历data的值
}

//定义属性
_defineProperties(){
    var _value = {};
    var myproperties = this.const.properties;
    var descriptors = {};
    for(var item in myproperties){
        var property = myproperties[item];
        descriptors[item] = {
            enumerable: true,
            get: function(){
                var result = property.get && property.get instanceof 'function'
                    && property.get();
                return result || _value[item];
            },
            set: function(val){
                var result = property.set && property.set instanceof 'function'
                    && property.set(value);
                _value[item] = result || val;
            }
        }
    }
}







```


## es6

### 1.class & extend