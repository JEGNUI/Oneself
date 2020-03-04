# 什么值得买[@chavyleung](https://github.com/chavyleung/scripts/tree/master/smzdm)

> 2020.1.11 QuanX 在`190`版本开始, 获取 Cookie 方式需要从`script-response-body`改为`script-request-header`

# 注意！注意！注意！

目前不完美:

1. ~~签到后系统提示“签到结果: 未知”~~ (Fixed)
2. 签到后手机 APP 上显示未签到（但实际上你用 pc 浏览器登录是会显示已经签到的）

上述问题待跟进

## 配置

```properties
[MITM]
*.smzdm.com

[rewrite_local]
# 189及以前版本
^https:\/\/www\.smzdm\.com\/?.? url script-response-body smzdm.cookie.js
# 190及以后版本
^https:\/\/www\.smzdm\.com\/?.? url script-request-header smzdm.cookie.js

[task_local]
1 0 * * * smzdm.js
```
