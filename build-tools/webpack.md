
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


### CommonJS模块的私有变量如何运作？
错误代码：在模块中定义global对象，在其他模块中取出
```
  // A.js
  module.exports = {
    a: 'xxxx',
    b: 'zzzzz'
  }
  //B.js
  var global = require('A');
  global.a = 'mmmm';
```
原因：module.exports输出数据，而require输入时是exports输出数据的拷贝，也就是clone的副本？？？？

```
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
function getCounter(){
  return counter;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
  getCounter: getCounter
};
// 这个模块：在多个模块内加载和多次运行后，counter的值是不变的，getCounter()是持续递增的，类似于闭包的私有变量。除非清楚缓存重新加载
```
但是，我们可以返回函数，通过函数动态获取私有变量的值。例如getCounter。

理解的关键点：module本身和module.exports是不同的概念。module本质就是一个闭包，module的代码只执行一次，然后require加载的是module.exports输出数据的副本（待考证），所以require每次引入的数据是恒定不变的。但是module本身的私有变量是可能改变的，如上例。

```
// test.js
var obj = {
    key1: 1111,
    key2: 2222
}

module.exports = {
  getData: function(){
    return obj;
  },
  setData: function(val){
    obj = val;
  }
}

// 类似的
function(){
  var obj = {
    key1: 1111,
    key2: 2222
}

return  {
  getData: function(){
    return obj;
  },
  setData: function(val){
    obj = val;
  }
}
}

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
