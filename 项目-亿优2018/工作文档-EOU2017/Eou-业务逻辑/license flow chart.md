
#### license verify 流程图

两条线：
- 是否允许访问
- 是否可以读取Lic文件
```
graph TB
    start(step1: index page) ==>isDev{ISEOUDVLPER?开发环境?}
    isDev-->|true|end1( access )
    isDev-->|false|checkLic{Check Lic}
    checkLic-->|true|checkLicKV(Check Lic Key-Val)
    checkLic-->|false|end2( 401.jsp)
    checkLicKV-->|true|Z(access)
    checkLicKV-->|false|J(401.jsp)

    N(step2: access)-->|true|O(verifyLicFile)
    O-->|bVerify=true|P(getLicInfo)
    O-->|bVerify=false|Q(getDefaultInfo)
```