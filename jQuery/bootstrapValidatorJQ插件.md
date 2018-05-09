bootStrapValidator ：JQUERY表单验证插件
--------------------------------
###概览
BootstrapValidator 是最好的用于验证表单的jQuery插件，设计来配合bootstrap3使用。
“就让比赛开始吧！”
###API文档
官网 http://bv.doc.javake.cn/
之前写的就像是API的翻译，想想没什么用就删掉了，现在想结合源码和自己的实践随便写点内容。
###源码相关
####引入
```
$(form).bootstrapValidator(options);
var bootstrapValidator =$(form).data('bootstrapValidator');
调用API的两种方式：
1.bootstrapValidator.methodName(parameters);
2.$(form).bootstrapValidator(methodName, parameters);
```
也可以链式调用，因为函数返回自身。
bootstrpvalidator插件就是一个JQuery插件：
```
$.fn.bootstrapValidator = function(option, params) {
        return this.each(function() {
            var $this   = $(this),
                data    = $this.data('bootstrapValidator'),
                options = 'object' == typeof option && option;
            if (!data) {
                data = new BootstrapValidator(this, options);
                $this.data('bootstrapValidator', data);
            }
            if ('string' == typeof option) {
                data[option](params);
            }
        });
    };
```
所以$(form).bootstrapValidator(options); 创建了一个BootstrapValidator对象，并将对象存储在该form元素上（实际上先尝试从form元素上取数据，没有数据才创建，类似单例模式）。
另外\$(form).bootstrapValidator第一参数是String时，实际上调用了BootstrapValidator的函数，也就是上面的第二种方式。
####拓展自定义验证器
自定义验证器实际上在继续在Jquery插件上拓展插件，和bootstrapValidator插件本身类似。
插件内部定义了一个validators对象容器，$.fn.bootstrapValidator.validators = {};所有验证器都添加到了这个容器中，例如：
```
;(function($) {
    $.fn.bootstrapValidator.validators.validatorName= {
        };
}(window.jQuery));
```
我们以同样的方式定义即可。








。
。
。

####以下为删除部分

- step1：导入依赖文件
1.既然BootstrapValidator插件需要jQuery和Bootstrap3,你必须导入需要的css和js文件。
2.导入BootstrapValidator插件文件
```
<link rel="stylesheet" href="/path/to/bootstrap/css/bootstrap.css"/>
			<link rel="stylesheet" href="/path/to/dist/css/bootstrapValidator.min.css"/>
			<script type="text/javascript" src="/path/to/jquery/jquery-1.10.2.min.js"></script>
			<script type="text/javascript" src="/path/to/bootstrap/js/bootstrap.min.js"></script>
```
```
<script type="text/javascript" src="/path/to/dist/js/bootstrapValidator.min.js"></script>
```
- step2： 编写表单
既然validator依赖与Bootstrap3，那么表单必须使用Bootstrap的类来编写.
	- Tip1：如果表单不是通过Bootstrap构建（即元素包含表单项且关联的label没有form-group类），可能会看到错误Uncaught RangeError: Maximum call stack size exceeded
	- tip2:不要使用表单的属性来设置表单的name和id属性（如submit，reset，length等），可能会引起冲突

- step3：调用插件
参见4.API
###设置（属性与成员）
- bootstrapValidator成员概览
```
$(formSelector).bootstrapValidator({
		excluded: [':disabled', ':hidden', ':not(:visible)'],
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		live: 'enabled',
		message: 'This value is not valid',
		submitButtons: 'button[type="submit"]',
		submitHandler: null,
		trigger: null,
		fields: ...
	});
```
等效的HTML属性（可相互替代）：
| Option  |Equivalent HTML attribute | Default|
| ------ |:--------:| -----|
|excluded|data-bv-excluded|[':disabled', ':hidden', ':not(:visible)']|
|feedbackIcons|data-bv-feedbackicons-valid,		data-bv-feedbackicons-invalid,		data-bv-feedbackicons-validating|{valid: null,invalid: null,validating: null}|
|live|data-bv-live|'enabled'|
||||
||||
||||
||||
||||
||||


尚未整理


live	data-bv-live	'enabled'
	message	data-bv-message	'This value is not valid'
	submitButtons	data-bv-submitbuttons	'[type="submit"]'
	submitHandler	n/a	null
	threshold	data-bv-threshold	null
	trigger	data-bv-trigger	null
	fields	n/a	null


	1.excluded:排除。排除不验证的表单
		默认：disabled，hidden，invisible这三种状态的标签不会被验证 例如：[':disabled', ':hidden', ':not(:visible)']
		支持三种格式：string array function 
	
	2.feedbackIcons  反馈图标
		版本v3.1.0之后支持该特性。支持Glyphicons(bootstrap内置)和FontAwesome(需要自行导入FontAwesome CSS)。默认图表是未设置的。
		两个相关常见问题：
		1.当使用来自 BootsWatch的自定义Bootstrps主题时，图标不显示。参见http://bv.doc.javake.cn/settings/
		2.反馈图标显示的位置不合适，例如当使用selector时，或者使用bootstrap picker等控件时。
			你可以通过调整css样式来调整feedbackIcon的位置：
			.form-horizontal .has-feedback .form-control-feedback {
				top: 0;	right: -15px; }等
	
	3.live  实时验证
		支持三个值：
		enabled : 表单值改变时立即验证
		disabled: 禁止实时验证。只在提交后显示错误信息
		submitted: 表单提交过后，开启实时验证？不懂
	
	4.message 默认公用的错误提示信息，你可以为每一个值单独设置提示信息
	5.submitButtons : 提交按钮选择器，当表单输入验证不通过时，按钮不可用disabled
	6.submitHandler: 自定义提交handler
		submitHandler: function(validator, form, submitButton) {}
		参数：validator，类型为BootstrapValidator，BootstrapValidator的实例
				form；类型为jQuery对象; 当前表单的
				submitButton；类型为jQuery对象；被点击的提交按钮的
	5.threshold
	6.trigger 触发验证的事件类型（keyup, blur...)
		前提是【实时校验】为enabled;
		可以同时绑定多个事件，用空格分隔，例如 trigger="focus blur";
	7.fields
		表单域概览：
		
		使用name属性标识，或者使用选择器
		表单项的属性：
		1.enabled： true/false,是否启用该验证项
		2.message
		3.container：显示错误信息的容器，用css选择器指定。
		4.selector: 当不能用name属性定义表单项时，可以使用css.选择器（类名，id或属性等）指定表单项。
		
4.API
	起始：
		方式一：
			var bootstrapValidator = $(form).data('bootstrapValidator');//获取实例
			bootstrapValidator.methodName(parameters)//调用方法
		方式二：
			$(form).bootstrapValidator(methodName, parameters);
		两种方式都可以链式调用（即方法return的都是实例自身）
	API:
	defaultSubmit：
		使用默认submission提交表单，在提交表单时不执行任何验证；一般使用在自定义提交handler中；eg:validator.defaultSubmit();
	disableSubmitButtons
		启用/禁用提交按钮；disableSubmitButtns(disabled)；	
		参数：disabled:	boolean	 :true/false;
	enableFieldValidators: 
		启用/禁用给定表单域的所有验证器； enableFieldValidators(field, enabled)；
		参数：field:	String:		表单元素的name属性
	getFieldElements(field)
		通过给定的name检索表单元素，返回代表表单域的jQuery元素对象数组或null
		field： String: 表单元素的name属性
	isValid()
	验证该表单域，如果所有表单元素有效返回true，否则返回false
	resetForm(resetFormData)或resetForm（）
	重置表单，隐藏所有的错误信息和反馈图标，所有表单元素被标记成未验证。
	resetFormData： boolean: true/false
	updateElementStatus($field, status, validatorName)
	更新给定表单元素的验证结果
		$field: jQuery:  表单元素； status: String: 可以是NOT_VALIDATED, VALIDATING, INVALID或VALID，；validatorName: String: 验证器名称，如果为null，为所有表单元素更新验证结果
		update(field, status, validatorName)
		同上，只不过参数是表单元素的name属性
		一般插件不会重新验证已通过的表单元素，需要重新验证时我们可以将表单元素更新为未验证状态
		validate()
		手动验证表单，当我们想通过其他方式触发验证时（例如连接或其他按钮）而不是点击提交按钮，可以用到这个方法
		validateField(field)同上