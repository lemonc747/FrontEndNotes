### CSRF/XSRF 跨站请求伪造


#### location.href可能引发xsrf
我见到的常见的有防护有：

- 给变量前加"/"或者只有"/"开头的才跳转
- 替换变量中的":"
- 替换"http://"
- 匹配域名白名单

- 另外，使用location.pathname不会出错
``` js
  // 使用location.pathname防止XSRF攻击
  // http://localhost:5566/index.html?access_token=e6f5f17534f74db89c1048f4d3888888#
  const loginPage = 'login.html';
  // wrong way
  window.location.href = loginPage;
  // correct way
  window.location.pathname = loginPage
  // result => http://localhost:5566/login.html?access_token=e6f5f17534f74db89c1048f4d3888888#
```
