# 美团

> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可

> QuanX 需要: v1.0.6-build195 及以后版本 (TestFlight)

## 配置 (Surge)

```properties
[MITM]
hostname = i.meituan.com

[Script]
http-request ^https:\/\/i.meituan.com\/evolve\/signin\/signpost\/ script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/meituan/meituan.cookie.js, requires-body=true
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/meituan/meituan.js
```

## 配置 (QuanX)

```properties
[MITM]
i.meituan.com

[rewrite_local]

# [商店版] QuanX v1.0.6-build194 及更早版本
# 不支持

# [TestFlight] QuanX v1.0.6-build195 及以后版本
^https:\/\/i.meituan.com\/evolve\/signin\/signpost\/ url script-request-body meituan.cookie.js

[task_local]
1 0 * * * meituan.js
```

## 说明

1. 先把`i.meituan.com`加到`[MITM]`
2. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`meituan.cookie.js`和`meituan.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
3. 打开 APP , 然后手动签到 1 次, 系统提示: `获取Cookie: 成功` (`首页` > `红包签到`)
4. 把获取 Cookie 的脚本注释掉
5. 运行一次脚本, 如果提示重复签到, 那就算成功了!

