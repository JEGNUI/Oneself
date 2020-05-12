# 电信营业厅

> 2020.5.6 更新签到脚本 (正则和 rewrite 类型都有变化, 需要重取 Cookie)

## 配置 (Surge)

```properties
[MITM]
wapside.189.cn:9001

[Script]
http-request ^https:\/\/wapside.189.cn:9001\/api\/home\/sign script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10000/10000.cookie.js, requires-body=true
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10000/10000.js
```

## 配置 (QuanX)

```properties
[MITM]
wapside.189.cn

[rewrite_local]
# 190及以后版本
^https:\/\/wapside.189.cn:9001\/api\/home\/sign url script-request-body 10000.cookie.js

[task_local]
1 0 * * * 10000.js
```

## 说明

> 先在登录成功后, 再打开获取 Cookie 的脚本

1. 先配置`[MITM]`
   - Surge: wapside.189.cn:9001
   - QuanX: wapside.189.cn
2. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`10000.cookie.js`和`10000.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
3. 打开 APP 手动签到一次: 访问下右下角 `我` > `签到` (头像下面)
4. 系统提示: `获取Cookie: 成功`
5. 最后就可以把第 1 条脚本注释掉了

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:00:10`执行一次.
