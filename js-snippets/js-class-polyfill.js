/**
 * 用Object.create()实现类的继承
 */
//shape- superclass
function Shape(){
    this.x = 0;
    this.y =0;
}
Shape.prototype.move = function (x, y){
    this.x += x;
    this.y += y;
}
// Rectangle subclass
function Rectangle (){
    Shape.call(this);
}
// 子类续承父类
// 因为使用“.prototype =...”后,constructor会改变为“=...”的那个
// constructor，所以要重新指定.constructor 为自身。
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;


/**
 * 将Object转换为Map
 * new Map()构造函数接受一个可迭代的entires，借助Object.entries方法可以很容易的将Object转换为Map
 */
var obj = {foo:"bar", baz:22};
var map = new Map(Object.entries(obj));
