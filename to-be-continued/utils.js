   /**
    * replace函数
     * 使用参数依次替换字符串中的%s，没有对应参数返回''
     * it only does '%s', and return '' when arguments are undefined
     * eg：sprintf("tableName: %s, tableId: %s, tableKey: %s", "uuwifi", "uuwifiTab")
     *      return: "tableName: uuwifi, tableId: %uuwifiTab, tableKey: "
     */
    var sprintf = function(str) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace(/%s/g, function() {
            var arg = args[i++];

            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        if (flag) {
            return str;
        }
        return '';
    };