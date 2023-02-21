## Base64
Base64 是一种基于 64 个可打印字符来表示二进制数据的表示方法，

Base64每个单位为6比特（bit），2^6=64，用64个字符来表示6比特的二进制数据，所以称为Base64

64个可打印字符为：A~Z, a~z, 0~9, 还有两个可打印符号在不同的系统中而不同，26+26+10+2-64

Base64 编码表
1. 码值为0~63
2. 0~25：A~Z，26个大写字母
3. 26~51：a~z，16个小写字母
4. 51~61：0~9，10个数字
5. 62~63：两个系统相关的字符，通常是`+ /`

## ASCII

## js的二进制操作 （应该是位运算符）

## Base64编码过程

转换过程：字符串 =》 ASCII码 =》 二进制 =》Base64码
1. 字符串>ASCII码：String.prototype.charCodeAt方法获取字符的ascii码
2. ASCII码>二进制：& 0xff 转二进制

算法: 每3个字符串，每个字符串8bit，转换成4个Base64字符，每个6bit，即取8和6的最小公倍数；；
注意，最后不足三个字符串时，todo

举例
```ts
// 假如我们要编码一个4个字符串
const input = 'abca';
// 每次取三个
// const loopStr1 = 'a';
// const loopStr2 = 'b';
// const loopStr3 = 'c';
// 取得每个字符串的ascii码，然后转二进制
const binary1 = input.charCodeAt(0)
const binary2 = input.charCodeAt(1)
const binary3 = input.charCodeAt(2)
// 
```

## btoa与atob函数

### btoa
binary to ASCII，即Base64的编码过程。

btoa() 方法可以将一个二进制字符串编码为 Base64 编码的 ASCII 字符串。
- 注：将字符串中的每一个字节都视为一个二进制数据字节，什么意思？

https://zhuanlan.zhihu.com/p/148364711
todo：不理解：=================================
ASCII码大家基本都知道，这里讲下binary是什么。

binary 是JS字符集的另外一个子集，它类似于 ASCII 字符集，但是字符的码点(charCode)不再限制到 127， 它包含了255 以内的字符。binary string设计的目的不是用于代表字符， 而是代表二进制数据。由 binary string 代表的二进制数据大小是原始数据的两倍，然而这对于最终用户是不可见的， 因为JavaScript strings 的长度是以2字节为单位进行计算的。比如， “Hello world” 这个字符串属于 ASCII 子集, 而 ÀÈÌÒÙ 不属于ASCII码[2]，但属于binary。

所以btoa和atob其实还涉及了编码问题，我们只需要找出相同编码进行替换即可。在node.js环境中，提供了一个 Buffer 类，用于操作二进制及Base64转码。而在Python环境中，有一个 Latin1 编码[3]与JS的binary相同，因此可以构造代码了


### atob
ASCII to binary，用于将ASCII码解析成binary数据，即Base64的解码过程