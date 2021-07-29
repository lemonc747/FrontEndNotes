var common = require('../utils/common'),
    C = require('./const');

/**
 * this.data:
 * 
 * name             type        description
 * _options         object      初始化时的options对象, NOTICE: 可用属性以_options为准则
 * properties       object      定义defineProperties属性的对象
 * TEMPLATE         const       每个组件的模板常量
 * 
 * TIPS：
 * 1. 组件类型type，与构造函数同名，统一为小写
 * 
 * 
 */
var Component = function(options, child_ptions){        
    this._options = Object.assign({}, child_ptions, typeof options === 'object' && options);
    this._super_init();
    window.test = this;
}

Component.prototype = { 
    constructor: Component,

    /*********************** private methods ************************/
    _super_init: function(){
        this.key = common.guid();
        this._super_defineProperties();
    },

    _super_defineProperties: function(){
        var that = this,
            $comp = $("#"+this.key),
            options = this._options,
            _value = {};
        this.properties = {};
        var commonProperties = {
            // component id 
            key: {
                enumerable: true,
                get: function(){
                    console.log("component.key:"+_value.key);
                    return _value.key;
                },
                set: function(val){
                    _value.key = val;
                }
            },
            // component type
            type: {
                enumerable: true,
                get: function(){
                    return _value.type;
                },
                set: function(val){
                    _value.type = val;
                }
            },

            label: {
                enumerable: true,
                get:function(){
                    return _value.label;
                },
                set: function(val){
                    //attribute dom
                    if(!that._isAttrBoxInit()){
                        var $label = $(C.TEMPLATE_ATTRS.label);
                        $label.appendTo($(C.BOX.attribute));
                        $label.find("."+C.PH.label).val(val).on("keyup", function(e){
                            var result = $(this).val();
                            that.properties.label = result;
                        });
                    }
                    //component dom
                    $comp.find("."+C.PH.label).text(val);
                    _value.label = val;
                }
            },
            desc: {
                enumerable: true,
                get:function(){
                    return _value.desc;
                },
                set: function(val){
                    if(!that._isAttrBoxInit()){
                        var $desc = $(C.TEMPLATE_ATTRS.desc);
                        $desc.appendTo($(C.BOX.attribute));
                        $desc.find("."+C.PH.desc).val(val).on("keyup", function(e){
                            var result = $(this).val();
                            that.properties.desc = result;
                        });
                    }
                    $comp.find("."+C.PH.desc).text(val);
                    _value.desc = val;
                }
            },

            placeholder: {
                enumerable: true,
                get:function(){
                    return _value.placeholder;
                },
                set: function(val){
                    if(!that._isAttrBoxInit()){
                        var $placeholder = $(C.TEMPLATE_ATTRS.placeholder);
                        $placeholder.appendTo($(C.BOX.attribute));
                        $placeholder.find("."+C.PH.placeholder).val(val).on("keyup", function(e){
                            var result = $(this).val();
                            that.properties.placeholder = result;
                        });
                    }
                    //component dom
                    $comp.find("."+C.PH.placeholder).attr("placeholder",val);
                    _value.placeholder = val;
                }
            },

            disabled:{
                enumerable: true,
                get:function(){
                    return _value.disabled;
                },
                set: function(val){
                    //disabled, readOnly, required
                    if(!that._isAttrBoxInit()){
                        var $container = $(C.BOX.attribute),
                            $disabledSet = $container.find('.'+C.BOX.disabledSet);
                        if($disabledSet.length<1){
                            $disabledSet = $(C.TEMPLATE_ATTRS.disabledSet);
                            $disabledSet.appendTo($container);
                        }

                        $disabledSet.find("."+C.PH.disabled).prop("checked", val).on("click", function(e){
                            var result = $(this).prop("checked");
                            that.properties.disabled = result;
                        });
                    }
                    _value.disabled = val;
                }
            },

            readonly:{
                enumerable: true,
                get:function(){
                    return _value.readonly;
                },
                set: function(val){
                    //disabled, readOnly, required
                    if(!that._isAttrBoxInit()){
                        var $container = $(C.BOX.attribute),
                            $disabledSet = $container.find('.'+C.BOX.disabledSet);
                        if($disabledSet.length<1){
                            $disabledSet = $(C.TEMPLATE_ATTRS.disabledSet);
                            $disabledSet.appendTo($container);
                        }

                        $disabledSet.find("."+C.PH.readonly).prop("checked", val).on("click", function(e){
                            var result = $(this).prop("checked");
                            that.properties.readonly = result;
                        });
                    }
                    _value.readonly = val;
                }
            },

            required:{
                enumerable: true,
                get:function(){
                    return _value.required;
                },
                set: function(val){
                    //disabled, readOnly, required
                    if(!that._isAttrBoxInit()){
                        var $container = $(C.BOX.attribute),
                            $disabledSet = $container.find('.'+C.BOX.disabledSet);
                        if($disabledSet.length<1){
                            $disabledSet = $(C.TEMPLATE_ATTRS.disabledSet);
                            $disabledSet.appendTo($container);
                        }

                        $disabledSet.find("."+C.PH.required).prop("checked", val).on("click", function(e){
                            console.log("component required clicked!");
                            var result = $(this).prop("checked");
                            that.properties.required = result;
                        });
                    }
                    _value.required = val;
                }
            },
        };
        //遍历有效的属性
        for(var item in options){
            if(commonProperties[item]){
                Object.defineProperty(this.properties, item, commonProperties[item]);
            }
        }
    },

    /**
     * 组件样式(style)和组件属性(attribute)的一个区别：
     * - style是固定的，所有组件公共样式选项，事件监听一次
     * - attribute由组件不同而不同，每次选中或初始化重新绘制，并重新绑定事件
     */
    _super_defineStyle: function(){
        this.style = {};
        var myStyle = this.style,
            STYLE   = C.BOX_STYLE,
            //$comp = $("#"+this.key),
            $viewBox = $comp.find("."+C.CLS.viewBox),
            //$style = $(C.BOX_STYLE),
            _value = {},
            commonStyle = {
                textAlign:{
                    enumerable: true,
                    set: function(val){
                        // // 初始化style dom： 放到监听事件中
                        // var $textAlign = $s.find(STYLE.textAlign[0]);
                        // $textAlign.find("button").removeClass("btn-primary").addClass('btn-default');
                        // $textAlign.find("button[data-value="+myStyle.textAlign+"]")
                        //     .removeClass("btn-default").addClass("btn-primary");
                    
                        $viewBox.css(STYLE.textAlign[1], val);
                        _value.textAlign = val;
                    }
                },
                verticalAlign:{
                    enumerable: true,
                    set: function(val){
                        $viewBox.css(STYLE.verticalAlign[1], val);
                        _value.verticalAlign = val;
                    }
                },
                fontFamily:{
                    enumerable: true,
                    set: function(val){
                        $viewBox.css(STYLE.fontFamily[1], val);
                        _value.fontFamily = val;
                    }
                },
                fontSize:{
                    enumerable: true,
                    set: function(val){
                        $viewBox.css(STYLE.fontSize[1], val+myStyle.fontSizeUnit);
                        _value.fontSize = val;
                    }
                },
                fontSizeUnit:{
                    enumerable: true,
                    set: function(val){
                        $viewBox.css(STYLE.fontSizeUnit[1], myStyle.fontSize+val);
                        _value.fontSizeUnit = val;
                    }
                },
            };
        
        Object.defineProperties(this.style, commonStyle);

        // // set style dom
        // var $textAlign = $s.find("."+STYLE.textAlign),
        //     $verticalAlign = $s.find("."+STYLE.verticalAlign),;
        // $textAlign.find("button").removeClass("btn-primary").addClass('btn-default');
        // $textAlign.find("button[data-value="+myStyle.textAlign+"]").addClass("btn-primary");
        // $verticalAlign.find("button").removeClass("btn-primary").addClass('btn-default');
        // $verticalAlign.find("button[data-value="+myStyle.verticalAlign+"]").addClass("btn-primary");

    },

    /**
     * isInit=true: 标识“组件属性+样式区域”初始化完成
     * isInit=false: 返回是否初始化完成
     */
    _isAttrBoxInit :function(isInit){
        if(isInit){
            $(C.BOX.attribute).data("key", this.key);
            return true;
        }else{
            var key = $(C.BOX.attribute).data("key");
            return this.key && key && this.key === key;
        }
    },

    /*********************** public methods ************************/

    formatOptionsToData: function(){

    },

    formatDataToOptions: function(){

    },

    setAllStyle: function(){

    },

    /**
     * entry1: create component
     * 
     * 1. create component instance
     * 2. create component dom
     * 3. create attribute dom
     * 4. update style dom
     * 5. watch attribute & style
     */
    load: function(){
        // 1. create component instance
        var key = this.key,
            key_attr = $(C.BOX.attribute).data("key"),
            component = document.querySelector("#"+key);
        if(!key || !component){
            component = this.createComponent();
        }
        // 2. component-attribute
        this.loadProperties(this._options);
    },

    /**
     * entry2: selcted
     * 
     * selected component: update attributes form
     */
    selected: function(){
        // 1. create component instance
        var key = this.key,
            key_attr = $(C.BOX.attribute).data("key"),
            component = document.querySelector("#"+key);
        if(!key || !component){
            component = this.createComponent();
        }

        if(!key_attr || key_attr!== key){
            this.loadProperties(this.properties);
        }
    },

    /**
     * load component attributes, create attributes-C.BOX
     */
    loadProperties: function(options){
        $(C.BOX.attribute).empty();
        for(var item in options){
            this.properties[item] = options[item];
        }
        //last step: mark selected component-key
        $(C.BOX.attribute).data("key", this.key);
        this._selectedStyle();
    },

    _selectedStyle: function(){
        var comp = $("#"+this.key);
        $(C.BOX.main).find("."+C.CLS.component).removeClass(C.CLS.selected);
        comp.addClass(C.CLS.selected);
        comp.find("."+C.CLS.remove).show();
        comp.find("."+C.CLS.drag).show();
        //?
        $("#sidebar-nav-tabs2").find('li').eq(0).addClass("active").siblings().removeClass("active");
        $(C.BOX.attributeParent).addClass(C.CLS.active).siblings().removeClass(C.CLS.active);
    },


    /**
     * 
     */
    renderStyleForm: function(){

    },

    initStyle: function(isInit){

        var $s  = $(C.BOX.style),
            STYLE   = Object.create(C.BOX_STYLE),
            myStyle   = this.style,
            flag    = !isInit && !!value;
        // init styleObj
        if(!isInit && myStyle){
            for(var item in STYLE){
                myStyle[item] = STYLE[item][1];//myStyle[item] || STYLE[item][1];
            }
        }
        // set style dom
        var $textAlign = $s.find("."+STYLE.textAlign),
            $verticalAlign = $s.find("."+STYLE.verticalAlign);
        $textAlign.find("button").removeClass("btn-primary").addClass('btn-default');
        $textAlign.find("button[data-value="+myStyle.textAlign+"]").addClass("btn-primary");
        $verticalAlign.find("button").removeClass("btn-primary").addClass('btn-default');
        $verticalAlign.find("button[data-value="+myStyle.verticalAlign+"]").addClass("btn-primary");

    },

    _initStyle: function(style){
        
    },

    /**
     * entry3:
     * 可单独创建组件的preview-dom
     */
    createComponent: function(){
        var preview = this.TEMPLATE.preview;
        var divBox = $("<div>").append("<div class='viewBox'>"+preview+"</div>")
            .addClass("divBox").addClass(C.CLS.selected).attr("id",key);
        // save data
        this.key = key;
        divBox.data("instance", this);
        //divBox.css({"border":"1px dashed black","position":"relative"});
        //setInputDisabled(divBox);
        var deleteBtn = $("<i>").addClass("fa fa-trash-o").attr("aria-hidden",true).addClass("selectTagRemove")
                .css({"position":"absolute","color":"red","right": "10px","top":"5px","font-size":"15px"});
        var dragBtn = $("<i>").addClass("fa fa-arrows").attr("aria-hidden",true).addClass("dragHandle")
                .css({"position":"absolute","font-weight":"bold",'color':'black',"right": "32px","top":"7px","font-size":"15px"});
        deleteBtn.appendTo(divBox);
        dragBtn.appendTo(divBox);
        deleteBtn.click(function () {
            var that = this;
            layer.confirm('确定移除该组件?', function(index){
                $(that).parent().remove();
                layer.close(index);
            });
        });
        divBox.appendTo($(C.BOX.main));
        return divBox;
    },

    /**
     * 手机预览：组件包含所有功能
     */
    renderPreview: function(){

    }

}




module.exports = Component;