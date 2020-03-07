## 配置[@onewayticket255](https://github.com/onewayticket255/Surge-Script)

```properties
[MITM]
*.zhihu.com

[Script]
# 知乎去广告 (By onewayticket255)
^https://api.zhihu.com/moments\?(action|feed_type) url script-response-body Zhihu/ad-feed.js

^https://api.zhihu.com/topstory/recommend url script-response-body Zhihu/ad-recommend.js

^https://api.zhihu.com/.*/questions url script-response-body Zhihu/ad-answer.js

^https://api.zhihu.com/.*/questions url script-response-body Zhihu/answer.js（new）

^https://api.zhihu.com/market/header url script-response-body Zhihu/ad-market.js

```
# Zhihu  ad.js[@primovist](https://github.com/primovist/ScriptsForSurge/blob/master/Scripts)

```properties
[MITM]
*.zhihu.com

[Script]

^https://api.zhihu.com/moments\?(action|feed_type) url script-response-body Zhihu/ad.js

```
# all
```properties
[MITM]
api.zhihu.com

[Script]
^https:\/\/api\.zhihu\.com\/answers\/.*\/comments\/featured-comment url reject-img
^https:\/\/api\.zhihu\.com\/appview\/api\/v4\/answers\/.*\/recommendations url reject-img
^https:\/\/api\.zhihu\.com\/(moments\?(action|feed_type)|topstory\/recommend|v\d\/questions|market\/header|people\/) url script-response-body zhuhu/all.js

```
