# WPS

> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可

## 配置 (Surge)

```properties
[MITM]
hostname = zt.wps.cn

[Script]
http-request ^https:\/\/zt.wps.cn\/2018\/docer_check_in\/api\/act_list script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wps/wps.cookie.js
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wps/wps.js
```

## 配置 (QuanX)

```properties
[MITM]
hostname = 110.43.90.61, zt.wps.cn

[rewrite_local]
^https:\/\/zt.wps.cn\/2018\/docer_check_in\/api\/act_list url script-request-header wps.cookie.js

[task_local]
1 0 * * * wps.js
```
