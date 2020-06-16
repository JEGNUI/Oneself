# 百度签到

> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可

> 目前支持签到: 贴吧、知道 (2 合 1)

> 之前已经获取过贴吧 cookie 的话，不需要再次获取 (通用)

> 2020.1.3: 屏蔽文库签到, 原因: 实际签不上

> 2020.1.11 QuanX 在`190`版本开始, 获取 Cookie 方式需要从`script-response-body`改为`script-request-header`

## 配置 (Surge)

```properties
[MITM]
tieba.baidu.com

[Script]
http-request ^https?:\/\/tieba\.baidu\.com\/?.? script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/tieba/tieba.cookie.js
cron "10 0 0 * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/tieba/tieba.js
```

## 配置 (QuanX)

```properties
[MITM]
tieba.baidu.com

[rewrite_local]
# 189及以前版本
^https?:\/\/tieba\.baidu\.com\/?.? url script-response-body tieba.cookie.js
# 190及以后版本
^https?:\/\/tieba\.baidu\.com\/?.? url script-request-header tieba.cookie.js

[task_local]
1 0 * * * tieba.js
```

## 说明

1. 先在浏览器登录 `(先登录! 先登录! 先登录!)`
2. 先把`tieba.baidu.com`加到`[MITM]`
3. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`tieba.cookie.js`和`tieba.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
4. 再用浏览器访问一下: https://tieba.baidu.com 或者 https://tieba.baidu.com/index/
5. 系统提示: `获取Cookie: 成功`
6. 最后就可以把第 1 条脚本注释掉了

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:00:10`执行一次.
