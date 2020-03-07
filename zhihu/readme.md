## 配置[@onewayticket255](https://github.com/onewayticket255/Surge-Script)

```properties
[MITM]
*.zhihu.com

[Script]
# 知乎去广告 (By onewayticket255)
^https://api.zhihu.com/moments\?(action|feed_type) url script-response-body Zhihu/ad-feed.js

^https://api.zhihu.com/topstory/recommend url script-response-body Zhihu/ad-recommend.js

^https://api.zhihu.com/.*/questions url script-response-body Zhihu/ad-answer.js

^https://api.zhihu.com/market/header url script-response-body Zhihu/ad-market.js

```
