### flowChart语法
1. 在Markdown中，一段流程图语法以 ``` 开头，以 ``` 结尾。
2. 另起一行，书写graph XX
    - TB - top bottom（自上而下）
    - BT - bottom top（自下而上）
    - RL - right left（从右到左）
    - LR - left right（从左到右）
3. 流程方向：Start --> Stop，从箭头开始到箭头尾
4. 节点：id，
5. 中括号--带文本的节点：id1[This is the text in the box]
6. 小括号--带圆角文本的节点：id1(This is the text in the box)
7. 双小括号--圆形文本的节点：id1((This is the text in the circle))
8. 不对称文本：id1>This is the text in the box]
9. 大括号--菱形节点：id1{This is the text in the box}
10. --> 带箭头的link：A-->B
11. --- 开放式link：A --- B
12. 文本链接：A-- This is the text ---B
    - 文本链接2：A---|text|B
    - 带箭头和文本链接：A-->|text|B
13. 点型链接：A-.->B;
14. 粗箭头：A ==> B
15. 子流程图：
```
// 放在主流程图内的子流程图
subgraph title
    graph definition
end
```
16. 自定义样式：
```
graph LR
    id1(Start)-->id2(Stop)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px
    style id2 fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5
```