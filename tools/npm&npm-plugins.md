
## npm plugins
### npm-run-all
可以以平行或按顺序的方式运行多个npm脚本，https://www.npmjs.com/package/npm-run-all

npm-run-all提供三种命令
- npm-run-all：基本命令，运行
- run-s: 顺序运行的缩写。`npm-run-all --sequential`
- run-p: 平行运行的缩写。`npm-run-all --parallel`

### node-sass
本地编译scss，sass文件,https://www.npmjs.com/package/node-sass
```
node-sass [options] <input> [output] 
// or
cat <input> | node-sass > output
```

### postcss-cli
postcss是转换css的JS插件组。postcss-cli是postcss的一个命令行工具；
https://www.npmjs.com/package/postcss；
https://github.com/postcss/postcss-cli

### clean-css-cli
clean-css的命令行工具，优化css。https://www.npmjs.com/package/clean-css-cli