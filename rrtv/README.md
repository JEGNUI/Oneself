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

## unclock配置 (解锁原画)

```properties
[MITM]
api.rr.tv

[rewrite_local]
^https:\/\/api\.rr\.tv(\/user\/privilege\/list|\/ad\/getAll|\/rrtv-video\/v4plus\/season\/detail) url script-response-body rrtv.js

[task_local]
1 0 * * * rrtv.js

作者：@XYXShawn
地址：https://github.com/XYXShawn/JS/tree/master
```

