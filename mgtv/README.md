# 芒果 TV

> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可

## 配置 (Surge)

```properties
[MITM]
credits.bz.mgtv.com

[Script]
http-request ^https:\/\/credits.bz.mgtv.com\/user\/creditsTake script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/mgtv/mgtv.cookie.js
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/mgtv/mgtv.js
```

## 配置 (QuanX)

```properties
[MITM]
credits.bz.mgtv.com

[rewrite_local]
^https:\/\/credits.bz.mgtv.com\/user\/creditsTake url script-request-header mgtv.cookie.js

[task_local]
1 0 * * * mgtv.js
```

## 说明

1. 先把`credits.bz.mgtv.com`加到`[MITM]`
2. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`mgtv.cookie.js`和`mgtv.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
3. 打开 APP 然后手动签到 1 次, 系统提示: `获取Cookie: 成功`
4. 最后就可以把第 1 条脚本注释掉了
5. 运行一次脚本, 如果提示重复签到, 那就算成功了!

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:00:10`执行一次.

## 感谢

[@chavyleung](https://github.com/chavyleung/scripts/tree/master/mgtv)
