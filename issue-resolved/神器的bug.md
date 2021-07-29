## 现象
``` js
    const toggleModule = (data) => {
      // fix-bug@SP20190103: layui中的radio无法识别value为数字，修改为字符串; 反之提交时应该转换为数字，由于后端做了处理这里忽略了
      if (data && typeof data.enabled === 'number') {
        data.enabled = String(data.enabled);
      }
      const resetData = {
        id: '',
        path: '',
        url: '',
        enabled: '1',
        test: 22,
      };
      const $module = $('#editModule');
      
      $('#editModuleBackdrop').toggle();
      $module.toggleClass('showModule');
      form.val('editRouteForm', data || resetData);
    };
```
此处的form是layui的表单API，传入的`data`直接调用`val`赋值无法重绘表单，通过`JSON`转一次之后可以。很有可能是引用的问题。
``` js
  // ...
  const newData = JSON.parse(JSON.stringify(data));
  form.val('editRouteForm', newData || resetData);
```

## 原因待确认