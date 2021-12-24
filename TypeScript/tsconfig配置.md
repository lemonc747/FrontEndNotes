# tsconfig.json配置
常见的一些问题

## 文件范围设置
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