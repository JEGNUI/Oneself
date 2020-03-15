# WPS

> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可

> 2020.3.15 增加小程序签到

## 配置 (Surge)

```properties
[MITM]
hostname = zt.wps.cn

[Script]
http-request ^https:\/\/zt.wps.cn\/2018\/docer_check_in\/api\/act_list script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wps/wps.cookie.js
http-request ^https:\/\/zt.wps.cn\/2018\/clock_in\/api\/sign_up script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wps/wps.cookie.js
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wps/wps.js
```

## 配置 (QuanX)

```properties
[MITM]
hostname = 110.43.90.61, zt.wps.cn

[rewrite_local]
^https:\/\/zt.wps.cn\/2018\/docer_check_in\/api\/act_list url script-request-header wps.cookie.js
^https:\/\/zt.wps.cn\/2018\/clock_in\/api\/sign_up url script-request-header wps.cookie.js

[task_local]
1 0 * * * wps.js
```

## 说明

1. 配置`[MITM]`
   - Surge: zt.wps.cn
   - QuanX: 110.43.90.61, zt.wps.cn
2. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`wps.cookie.js`和`wps.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
3. 打开 APP , 进入签到页面, 系统提示: `获取Cookie: 成功 (APP)` (不用手动签到)
4. 打开 `我的WPS会员` 小程序 , 进入签到页面并手动签到, 系统提示: `获取Cookie: 成功 (小程序)` (手动签到)
5. 最后就可以把两条获取 Cookie 的脚本注释掉了
6. 运行一次脚本, 如果提示重复签到, 那就算成功了!

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:00:10`执行一次.

