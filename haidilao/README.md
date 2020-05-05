# 海底捞

> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可

> 感谢[@danchaw](https://github.com/danchaw) PR
## 配置 (Surge)

```properties
[MITM]
activity-1.m.duiba.com.cn

[Script]
http-request ^https:\/\/activity-1\.m\.duiba\.com\.cn\/signactivity\/doSign$ requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/haidilao/hdl.js
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/haidilao/hdl.js
```

## 配置 (QuanX)

```properties
[MITM]
activity-1.m.duiba.com.cn

[rewrite_local]

# [商店版]
^https:\/\/activity-1\.m\.duiba\.com\.cn\/signactivity\/doSign$ url script-request-body hdl.js

# [TestFlight]
^https:\/\/activity-1\.m\.duiba\.com\.cn\/signactivity\/doSign$ url script-request-body https://raw.githubusercontent.com/chavyleung/scripts/master/haidilao/hdl.js

[task_local]

# [商店版]
1 0 * * * hdl.js

# [TestFlight]
1 0 * * * https://raw.githubusercontent.com/chavyleung/scripts/master/haidilao/hdl.js
```

## 说明

1. 先把`activity-1.m.duiba.com.cn`加到`[MITM]`
2. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`hdl.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
3. 打开 APP[海底捞](https://apps.apple.com/cn/app/%E6%B5%B7%E5%BA%95%E6%8D%9E/id553115181) 然后手动签到 1 次, 系统提示: `获取Cookie: 成功`
4. 最后就可以把第 1 条脚本注释掉了
5. 运行一次脚本, 如果提示重复签到, 那就算成功了!

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:00:10`执行一次.
