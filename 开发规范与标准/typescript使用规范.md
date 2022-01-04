## 类型划分
1. 全局类型：通常用于给外部依赖添加类型，定义在根目录的`global.d.ts`中
1. 数据模型modal：基于数据库的数据模型，多用于接口数据。定义在`src/interface`中，以功能模块划分
2. 接口数据interface：定义在`src/services`内并export。当返回数据实体类型与modal一致，直接使用modal，否则基于modal包装
3. 组件类型component：定义在组件内并export

```ts
// 组件类型
export type ComponentProps = {...}
const ComponentX = (props: ComponentProps) => {...}
export default ComponentX
```

## why not：typings+modal.d.ts的全局类型？
通常来说typings中不会定义内部类型，通常用于给外部依赖加类型定义来辅助使用，常见的用法有：给less,svg等文件类型加上类型，给外部依赖入JQuery加类型等

另外，由于我们使用enum枚举类型来定义某个字段的所有可能的值，而enum同时具备类型和值的特性，是无法再typings的全局类型中定义，因为typings中的类型只在编码阶段提供类型检测，不参与运行时，如果定义enum，编码阶段正常，而运行时则报错undefined

