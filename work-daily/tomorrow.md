惰性求值

es6



## 函数参数为对象时
引用类型，关联原对象
```javascript
var a = {a:{aa:111},b:{bb:222}}
var b = function(g){
    var x = g.a; 
    return function(){console.log(x.aa)}
}(a);

b();// 111
a.a.aa = 333
b();// 333
```

### 函数下的私有变量，
``` js
    _defineProperties(){
        var _value = {};
        var myproperties = this.const.properties;
        debugger;
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
                    console.log("properties.set =>"+item);
                }
            }
        }
        Object.defineProperties(this.data.properties, descriptors);
    }

```
set和get中的item，最后全部是一样的，是myproperties的最后一个属性。
因为item不是即时计算的，而是属于私有变量