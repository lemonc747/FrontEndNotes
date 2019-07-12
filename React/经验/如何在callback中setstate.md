# 如何在回调中更新state
在回调中更新state，存在以下问题
1. callback时，组件已销毁，此时调用this.setState报警告
2. 组件销毁时，app依然持有此组件的引用，有内存泄露的风险