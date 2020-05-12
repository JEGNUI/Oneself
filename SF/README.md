# 顺丰速运

> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可

> 2020.1.22 据实测顺丰的 Cookie 只能存活 1 天不到，大家先弃坑

> 2020.3.15 恢复顺丰签到 (更新脚本、更新配置、重取 Cookie) (QuanX&Surge、商店&TF 都支持)

> 2020.3.20 修复多余的登录失败提示问题 & 修复没有 \$done() 问题

> 2020.3.30 增加 27 周年签到 (增加 1 条`mitm`和 1 条`rewrite`)

> 2020.5.6 移除 27 周年签到 (活动结束)

## 配置 (Surge)

```properties
[MITM]
hostname = sf-integral-sign-in.weixinjia.net, mcs-mimp-web.sf-express.com

[Script]
http-request ^https:\/\/sf-integral-sign-in.weixinjia.net\/app\/index script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/sfexpress/sfexpress.cookie.js
http-request ^https:\/\/mcs-mimp-web.sf-express.com\/mcs-mimp\/share\/(.*?)Redirect script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/sfexpress/sfexpress.cookie.js
cron "*/10 * * * * *" script-path=scripts/sfexpress.js
```

## 配置 (QuanX)

```properties
[MITM]
hostname = sf-integral-sign-in.weixinjia.net, mcs-mimp-web.sf-express.com

[rewrite_local]
# [商店版]
^https:\/\/sf-integral-sign-in.weixinjia.net\/app\/index url script-request-header sfexpress.cookie.js
^https:\/\/mcs-mimp-web.sf-express.com\/mcs-mimp\/share\/(.*?)Redirect url script-request-header sfexpress.cookie.js

# [TF版]
^https:\/\/sf-integral-sign-in.weixinjia.net\/app\/index url script-request-header https://raw.githubusercontent.com/chavyleung/scripts/master/sfexpress/sfexpress.cookie.js
^https:\/\/mcs-mimp-web.sf-express.com\/mcs-mimp\/share\/(.*?)Redirect url script-request-header https://raw.githubusercontent.com/chavyleung/scripts/master/sfexpress/sfexpress.cookie.js

[task_local]
1 0 * * * sfexpress.js
```

## 说明

1. 先把`sf-integral-sign-in.weixinjia.net`加到`[MITM]`
2. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`sfexpress.cookie.js`和`sfexpress.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
3. 打开 APP, 访问下`我的顺丰` > `去签到` (访问下`去签到`的页面即可, 不用点`签到`), 系统提示: `获取Cookie: 成功`
4. 打开 APP, 访问下`27周年庆`, 系统提示: `获取Cookie: 成功 (27周年)`
5. 最后就可以把第 1 条脚本注释掉了

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:00:10`执行一次.
