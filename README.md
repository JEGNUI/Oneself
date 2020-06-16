
## Disclaimer：

* **Any unlocking and decryption analysis scripts involved in the Script project released by JEGNUI are only used for resource sharing and learning research. Legality, accuracy, completeness, and validity cannot be guaranteed. Please judge according to the situation itself.**

* Any user who uses the script indirectly, Including but not limited to building a VPS or spreading if a certain behavior violates the country and laws or relevant regulations, **JEGNUI is not responsible for any privacy leak or other consequences caused by it.**

* **Do not use any content of the Script project for commercial or illegal purposes，otherwise, all consequences are at your own risk.**

* If any unit or individual believes that a script of the project may be suspected of infringing its rights, it shall promptly notify and **provide proof of identity, proof of ownership,** we will delete the relevant script after receiving the certification file.

* **JEGNUI is not responsible for any scripting issues, including but not limited to any loss or damage caused by any script error.**

* You must completely remove the above from your computer or mobile phone within **24 hours** of downloading.

* Anyone who views this project in any way or any script that uses the Script project directly or indirectly should read this statement carefully. And JEGNUI reserves the right to change or supplement this disclaimer at any time. **Once you use and reproduce any related scripts or rules of the Script project, you are deemed to have accepted this disclaimer.**

---

# 脚本自动更新&Lenovo打卡  [@yichahucha](https://github.com/yichahucha/surge/tree/master)

## 微博AD
```properties
[rewrite_local]
^https?://(sdk|wb)app\.uve\.weibo\.com(/interface/sdk/sdkad.php|/wbapplua/wbpullad.lua) url script-response-body wb_launch.js
^https?://m?api\.weibo\.c(n|om)/2/(statuses/(unread|extend|positives/get|(friends|video)(/|_)timeline)|stories/(video_stream|home_list)|(groups|fangle)/timeline|profile/statuses|comments/build_comments|photo/recommend_list|service/picfeed|searchall|cardlist|page|!/photos/pic_recommend_status) url script-response-body wb_ad.js
[mitm]
hostname = api.weibo.cn, mapi.weibo.com, *.uve.weibo.com
```
# elm & qyxj & testflight [@songyangzz](https://github.com/songyangzz/QuantumultX/tree/master)

## qyxj

```properties
[MITM]
commerce-i18n-api.faceu.mobi,commerce-api.faceu.mobi

[rewrite_local]
^https://commerce-.*api.faceu.mobi/commerce/v1/subscription/user_info url script-response-body WC/qyxj.js

[task_local]
1 0 * * * mgtv.js
```

# all in one 签到[@sazs34](https://github.com/sazs34/TaskConfig/blob/master/all_in_one.md)

多合一签到脚本

# JD多合一 [@NobyDa](https://github.com/NobyDa/Script/tree/master/JD-DailyBonus)

[QX](https://github.com/NobyDa/Script/tree/master/QuantumultX)

[Surge](https://github.com/NobyDa/Script/tree/master/Surge)

# XXYS  Zhihu  smzdm AD[@primovist](https://github.com/primovist/ScriptsForSurge/blob/master/Scripts)

```properties
[rewrite_local]
https:\/\/.*\.xiaoxiao.*\.com\/(vod\/reqplay\/|ucp/index|getGlobalData) url script-response-body WC/xxys.js

MITM = *.xiao*.com

```
# DouYin & Wechat  [@Choler](https://github.com/Choler/Surge/tree/master/Script)

# 有道云  [@Alex0510](https://github.com/Alex0510/surge/tree/master/Script)

```properties
[MITM]
note.youdao.com

[rewrite_local]
https://note.youdao.com/yws/(mapi/payment|api/self) url script-response-body WC/ydybj.js

```
# 签到小王子 [@chavyleung](https://github.com/chavyleung/scripts/edit/master)
