# weibo超话   @[NavePnow](https://github.com/NavePnow/Profiles/tree/master/Scripts/weibo)
**By [NavePnow](https://github.com/NavePnow)**
**inspired by [Nobyda](https://t.me/nubida)**

<img src="https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/IMG_1189.JPG" height="40%" width="40%">

使用[教程](https://nave.work/微博超话自动签到脚本.html)


# Surge
Remove weibo ads
```properties
[Script]
http-response ^https?://(sdk|wb)app\.uve\.weibo\.com(/interface/sdk/sdkad.php|/wbapplua/wbpullad.lua) requires-body=1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/wb_launch.js
http-response ^https?://m?api\.weibo\.c(n|om)/2/(statuses/(unread|extend|positives/get|(friends|video)(/|_)(mix)?timeline)|stories/(video_stream|home_list)|(groups|fangle)/timeline|profile/statuses|comments/build_comments|photo/recommend_list|service/picfeed|searchall|cardlist|page|!/photos/pic_recommend_status) requires-body=1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/wb_ad.js
[MITM]
hostname = api.weibo.cn, mapi.weibo.com, *.uve.weibo.com
```
