## ArrayBuffer
简单来说，用于存储二进制数据，类似于数组，每一个item是一个byte字节

1字节Byte=8比特bit

```ts
// 存储8个byte的数组
const buffer = new ArrayBuffer(8);
// ArrayBuffer本身无法操作，只能看到字节长度
console.log(buffer.byteLength); // 8




```

## ArrayBuffer的视图

ArrayBuffer需要转化为视图才能操作。一个buffer可以有多个视图，但只有一个数据源，即多个视图的数据是同步的

```ts
// 以Int16Array为例
// Int16Array表示数组的每个item，都是16比特，即2个字节
const arr16 = new Int16Array(buffer)
// 所以转换后，arr16的长度是4
console.log(arr16.length) // 4

// 向每个item中添加一个数字1
for (let i = 0; i < arr16.length; i++) {
  arr16[i] = i;
}
// 那么，arr16中的数据我们可以理解成4个16比特的数字 (真实存储的不是这个格式，只是为了便于理解)
[0000000000000000, 0000000000000001, 0000000000000010, 0000000000000011]

// NOTE: 未知问题，顺序好像是反的，可能是【字节序的原因】
// 所以可以理解为
[0000000000000011, 0000000000000010, 0000000000000001, 0000000000000000]

// =====证明多个视图共享数据
// 用同一个buffer，创建一个32比特的视图
const arr32 = new Int32Array(buffer)
// 想一想他的length，每个item的值？

// 每个item32Byte，4字节，所有length是2
console.log(arr32.length) // 2
// 他的item可以理解为
[00000000000000110000000000000010, 00000000000000010000000000000000]
// 将二进制转换为十进制，他的两个值分别是
console.log(arr32[0]) // 65536
console.log(arr32[1]) // 196610

```