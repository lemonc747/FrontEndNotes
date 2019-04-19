# antd-pro采坑记

## dva-model中中止fetch请求，并停止执行代码的方案
问题描述：accessToken失效时，我们通过`request.js`中的统一接口拦截并跳转到登录页，以重新获取token。但是`const response = yield call();`请求并没有终止，其中response.data的值为`无效的accessToken`字符串，而不是我们想要的数据，并且后续的步骤继续执行，导致`state.namespce.list = undefined`,从而导致渲染报错。

简单来说，我们虽然拦截并跳转到登录页，但请求后续的步骤并没有中断，空数据可能导致异常。

解决方案：https://github.com/dvajs/dva/issues/1778，https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController/AbortController。采用`AbortController`API

这种解决方案并没有用。依然没有中止`const response = yield call();`，此时`response = undefined`，所以需要检查response的值。这和检查检查`response.data.list`没有本质的区别
``` js
  *fetchServerSort({ payload }, { call, put }) {
    const response = yield call(fetchServerSort, payload);
    // console.log('fetch-sort-response', response);
    yield put({
      type: 'saveServerSort',
      payload: response.data,
    });
  },

  // 情况1：response正常
  response = { data: { list: [], pageSize: 10, ... }};
  // 情况2：由于fetch中止，response返回为空
  response = undefined;

  // 此时：payload: response.data, 报错... data of undefined
  // 但是：报错会导致执行中止，并且也跳转到了登陆页
  // 总之：不用在每个yield call中单独操作，先就这样吧
  // todo：等待更好的解决方案
```

最终：我们既用了`abortController`抛出异常，也在reducers中判断了response是否为undefined，以及response.code的值

## alert提示信息
提示信息要在异步请求操作结束后，展示成功或失败信息

解决方案：在model js中直接调用`alert, message, notification`，

异步请求结果状态判断：通过`response.code`的值判断，也就是说不能通过`HTTP.STATUS`的值判断，不能做统一的处理，因为提示消息有差异性，只能在每个请求中单独处理

## tagSelect支持单个选中。。。。。


## 动态的路由权限配置
由于路由和权限是在`route.config.js`中配置，如果要从后端获取，我们采用另一种思路，在`basicLayout`布局中处理（当然其他布局就在对应的布局中处理）
```js
  // 源代码中，获取authority，控制children组件的显示
  const routerConfig = this.getRouterAuthority(pathname, routes);
  return(
    ...
    <Authorized authority={routerConfig} noMatch={<Exception403 />}>
      {children}
    </Authorized>
    ...
  )
```
在此处判断我们自己设置的权限即可

## memoizeOne
用户缓存一次计算结果，若下次进入参数不变，则直接取缓存结果，不重复计算，减少消耗。
```js
/**
 * memoizeOne: 记录数据结果
 * @gya20190416 为何要使用memoizeOne？因为BasicLayout是很多页面的布局组件，也就是父组件。
 * 每次切换页面页面都会触发BasiLyout组件的render，都会触发getMenuData的复杂计算，造成大量重复消耗。
 * 
 */
// memoizeOne只能记录一次结果，所有路由切换时鉴权的getMenuAuthority的方法是没有用的
this.getMenuAuthority = memoizeOne(this.getMenuAuthority, isEqual);
```

## 在react组件中无法使用memoizeOne？？（目前在组件外使用变量替代闭包）


## Select组件中，使用map生成option，且key值为number时，会被自动转成string，导致值不匹配
解决方案：设置Option的value属性。当option没有value属性时，key会作为value，但key可能必须要是string。此时只能额外指定value属性，value不会被转化类型

```js
const valus = [1, 2];
const options = [{ id: 1, name: 'val1' }, { id: 2, name: 'val2' }, { id: 3, name: 'val3' }];
// 在react组件中
// 直接这样设置Select.Option是
<Select value={value} mode='multiple'>
  <Select.Option key={1}>test1</Select.Option>
  <Select.Option key={2}>test2</Select.Option>
  <Select.Option key={3}>3</Select.Option>
</Select>)}
// 或者
<Select value={value} mode='multiple'>
  {{options.map((item) => <Select.Option key={item.id}>{item.name}</Select.Option>)}}
</Select>)}
// 此时，Select.Option的key值变成了字符串'1','2''3',而不是1，2，3

// 正解：
<Select value={value} mode='multiple'>
  <Select.Option key={1} value={1}>test1</Select.Option>
  <Select.Option key={2} value={2}>test2</Select.Option>
  <Select.Option key={3} value={3}>3</Select.Option>
</Select>)}
```


## Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application
组件已销毁，然后调用了组件的setState方法

## antd-pro的组件渲染

- 全局state : 在整个会话中保持，在关闭或手动刷新页面时重置
    - userLayout：无状态
    - BasicLayout：在同一布局的页面切换时保持，在切换不同布局的组件页面时重置（例如登录页面和普通页面的切换）
        - pages/components：在同一页面保持

- 静态变量：文件只导入一次，所以再整个会话中保持
- 组件内的静态变量：在组件`Mount`和`Unmount`时重置

BUG：`an't perform a React state update on an unmounted component`就是因为在整个文件的静态变量保存了组件相关的代码`this.setState`，而在切换页面之后，组件已经完成了装载和重载（`Mount`和`Unmount`），故而this的指向还是曾经的组件，不是当前的组件，导致上述错误

解决方案：将静态变量放在组件内，变成组件的内部变量

## 权限控制
使用umiJS控制权限，以及antd-pro中额外添加的内容
### 1. 静态配置 router.config.js
这个是antd-pro自行添加并解析的内容，参考官网。

这个是用来控制菜单栏目显示，但是实际上并没有控制访问权限。也就是说，你只要知道隐藏路由的正确访问路径，你就可以查看页面

### 2. src/app.js
这是umiJS的运行时配置，可以根据服务端获取数据，动态配置路由

### 3. 最终到布局中真正控制访问
```js
<Authorized authority={routerConfig} noMatch={<Exception403 />}>
  {children}
</Authorized>
```
真正控制访问的还是在布局中判断现有权限是否合法。`src/models/login.js`在用户登录成功后，我们给了用户一个指定的权限名称`setAuthority('account')`,`routerConfig`是一个数组，
若这个数组包含给定的权限`account`，则可以访问，否则显示指定的组件`<Exception403 />`

## 路由

### 1. browserHistory or hashHistory

问题描述：新版管理员平台部署到腾讯云，并通过API网关访问时，根目录`.../root/`访问正常，然后在项目内部页面间跳转`.../root/a/b`正常；但若直接从子页面`.../root/a/b`访问，或在这个页面刷新，就会出现`404`

原因：单页应用只有一个`index.html`页面，其他页面都不是单独的HTML文件，所以访问不到。原因是`前端路由`，真实的html才可以访问。如果是`后端路由`，后端判断URL并返回指定的html

1. hashHistory：使用如 https://cdn.com/#/users/123 这样的 URL，取井号后面的字符作为路径。
2. browserHistory 则直接使用 https://cdn.com/users/123 这样的 URL。
3. 使用 hashHistory 时浏览器访问到的始终都是根目录下 index.html。
3. 使用 browserHistory 则需要`后端路由`的跳转。处理应用启动最初的 / 这样的请求应该没问题，但当用户来回跳转并在 /users/123 刷新时，服务器就会收到来自 /users/123 的请求，这时你需要配置服务器能处理这个 URL 返回正确的 index.html。如果你能控制服务端，我们推荐使用 browserHistory。