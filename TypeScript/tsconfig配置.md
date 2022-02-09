# tsconfig.json配置
常见的一些问题

## 文件路径书写
比如`include,exclude,paths`等设置文件范围时，格式应该怎么写？
```json
{
    "include": [
    "src/**/*",
    "src/**",
    "src/*"
  ],
}
```

路径含义：
- `/**` 表示任意层级的子目录。
- `/*` 表示第一层级下的任意子目录或文件。
- `/**/*` 就是任意层级下的文件。

但是`exclude`为什么直接写`node_modules`呢？
```json
{
    "exclude": ["node_modules", "**/*.spec.ts"]
}
```
TODO

## 2. paths
路径别名，路径简写。与`webpack-alias`的含义一样，需要与之一一对应。

## 3. 常用配置