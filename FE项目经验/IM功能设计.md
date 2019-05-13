
## 集群和命名空间联动选取
功能描述：集群和命名空间都是多选，一个集群对应多个命名空间。编辑时只允许增加，不允许移除已有的数据

```js
// 最终数据库的存储
[
  {
    "clusterId":"cls-bmmqf1aw",
    "clusterName":"二期民生警务",
    "namespaces":[
      {
        "namespaceId":"namespace-6ymbrgzv","namespaceName":"msjw-test"
      },
      {
        "namespaceId":"namespace-qab4o7wv",
        "namespaceName":"二期民生警务_default"
      }
    ],
  },
  ...
]

// 集群：objectArray
const clusters = [
  {id: 'cluster1', name: 'name1' },
  {id: 'cluster2', name: 'name2' },
  ...];

// 命名空间 
const namespaces = {
  cluster1: [
    {namespaceId: 's1', namespaceName: 'n1'},
    {namespaceId: 's2', namespaceName: 'n2'},
    ...
  ],
  cluster2: [...],
  ...
}

```