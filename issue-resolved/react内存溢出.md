### 记一次react内存溢出bug
通过react-cli生成的项目，在执行npm run build时已经报错
```
<--- Last few GCs --->

[13784:000000000031ADC0]   173126 ms: Mark-sweep 1408.5 (1695.7) -> 1408.5 (1639.2) MB, 1225.0 / 5.6 ms  last resort GC in
old space requested
...
Security context: 000001211ED25879 <JSObject>
    1: setFileTime [F:\PCBlog\node_modules\_watchpack@1.6.0@watchpack\lib\DirectoryWatcher.js:~86] [pc=0000005D76441C5F](this=000003CC90B1A8F1 <DirectoryWatcher map = 00000078CE7B9151>,filePath=00000199AD5D0AC1 <String[189]: F:\PCBlog\node_modules\_babel-helper-call-delegate@6.24.1@babel-helper-call-delegate\node_modules\babel-helper-hoist-variables\node_modules\babel-types\node_modules\lodash...

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
 1: node_module_register
```

### 原因分析
1. 代码内死循环
2. node内存设置偏小