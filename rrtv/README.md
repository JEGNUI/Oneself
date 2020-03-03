# 人人视频

> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可

> 2020.1.11 QuanX 在`190`版本开始, 获取 Cookie 方式需要从`script-response-body`改为`script-request-header`

> 2020.1.31 增加自动领取每日福利 (无需重新获取 Cookie, 直接更新脚本即可!)

## 配置 (Surge)

```properties
[MITM]
*.rr.tv

[Script]
http-request ^https:\/\/api\.rr\.tv\/user\/profile script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/rrtv/rrtv.cookie.js
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/rrtv/rrtv.js
```

## 配置 (QuanX)

```properties
[MITM]
*.rr.tv

[rewrite_local]
# 189及以前版本
^https:\/\/api\.rr\.tv\/user\/profile url script-response-body rrtv.cookie.js
# 190及以后版本
^https:\/\/api\.rr\.tv\/user\/profile url script-request-header rrtv.cookie.js

[task_local]
1 0 * * * rrtv.js
```

## 说明

1. 先把`*.rr.tv`加到`[MITM]`
2. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`rrtv.cookie.js`和`rrtv.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
3. 打开 APP, 访问下`个人中心`
4. 系统提示: `获取Cookie: 成功` （如果不提示获取成功, 尝试杀进程再进个人中心）
5. 最后就可以把第 1 条脚本注释掉了

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:00:10`执行一次.

rrtv unclock
^https?:\/\/api\.rr\.tv(\/user\/privilege\/list|\/ad\/getAll) url script-response-body rrtv.js

 MITM = api.rr.tv
