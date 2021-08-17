## typescript
1. tsconfig.json
2. eslint
3. 

## tsconfig.json配置


### target & module & moduleResolution

1. target：生成代码的js语言版本。就是TypeScript文件编译后生成的javascript文件里的语法应该遵循哪个JavaScript的版本。可选项为："ES5"， "ES6"/ "ES2015"， "ES2016"， "ES2017"或 "ESNext"
2. module：生成代码的module标准。可选项为："None"， "CommonJS"， "AMD"， "System"， "UMD"， "ES6"或 "ES2015"。

moduleResolution： 编译器计算引入模块指向时，采用的策略。两种策略：Classic和Node
1. Classic：默认策略，现在主要用于向后兼容


### sourceMap
