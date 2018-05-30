
## define
webpack是js应用程序的静态模块打包器module bundler，静态指在app运行前预编译

## 核心概念
- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

### 入口
构建依赖图的起点
```
//单个入口
module.exports = {
  entry: './path/to/my/entry/file.js'
};
//多个入口
module.exports = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```
CommonsChunkPlugin ？
### 输出
```
module.exports =  {
  output: {
    filename: '输出文件的文件名',
    path: '输出目录的绝对路径'
  }
};
```
如果创建多个chunk（例如多个入口，或CommonsChunkPlugin这样的插件），应该使用`占位符`以区分。
```
fileName: [name].js
```














# 实践

### webpack如何向多个目录输出多个文件

#### a
谢谢你的解答，想了一下午，想出了个解决办法
首先在定义entry的时候可以，
entry = {
"/demo/button": "demo/button/index.jsx"),
"/demo/grid": "demo/grid/index.jsx")
}
然后输出的时候，就能建到指定目录下去了
#### b
https://segmentfault.com/q/1010000003991927/a-1020000004088485

var entry = {};
glob.sync(__dirname+'/dev/**/*.js').forEach(function(name){
    var n = name.slice(name.lastIndexOf('dev/')+4,name.length-3);
    entry[n] = name;
});
return entry;


### require的运行机制
1. 模块的代码仅执行一次，exports的内容被缓存在require.cache中，
``` javascript
// a.js
var obj = {
    counter: 3
}
function incCounter() {
    obj.counter++;
}
module.exports = {
  counter: obj.counter,
  obj: obj,
  incCounter: incCounter,
};
// b.js
var exports = require('./a');
var counter = require('./a').counter;
var obj = require('./a').obj;
var incCounter = require('./a').incCounter;

console.log(counter);  // 3
console.log(obj.counter); // 3
incCounter();
exports.counter = 10;
console.log(counter); // 10
console.log(obj.counter); // 4
//解释：区分exports.counter和exports.obj.counter;
//1. exports输出后会缓存，后续的所有操作都会影响后面的require
//1. exports.counter是值类型（数字），不会受到obj.counter值的影响
//2. exports.obj为引用类型（对象）,修改会保存
//4. 手动修改exports.counter，修改会保存
```


查看require实现的源码

webpack打包后this的指向问题

var a = {
  geta: function(){
    return 11;
  },
  getb: function(){
    return this.geta() + 2;
  }
}
