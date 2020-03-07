# 什么值得买[@chavyleung](https://github.com/chavyleung/scripts/tree/master/smzdm)

> 2020.1.11 QuanX 在`190`版本开始, 获取 Cookie 方式需要从`script-response-body`改为`script-request-header`

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
# ad[@primovist](https://github.com/primovist/ScriptsForSurge/tree/master/Scripts)

```properties
[MITM]
*.smzdm.com

[rewrite_local]
^https?:\/\/(h(aojia|omepage)|(articl|baik)e|s)-api\.smzdm\.com\/(home|sou)  ad.js

```
