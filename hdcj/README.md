# 活动抽奖 [@zZPiglet](https://github.com/zZPiglet/Task/tree/master/WeChatLottery)

微信小程序"活动抽奖"自动签到，支持 Quantumult X（理论上也支持 Surge，未尝试）。

请先按下述方法进行配置，进入"活动抽奖"，手动签到一次或点击"已签到"，若弹出"首次写入活动抽奖 Token 成功"即可正常食用，其他提示或无提示请发送日志信息至 issue。

到 cron 设定时间自动签到时，若弹出"活动抽奖 - 签到成功"即完成签到，其他提示或无提示请发送日志信息至 issue。

Author: t.me/makexp

Modified by zZPiglet

## 配置 (Surge)

```properties
[Script]
cron "1 0 * * *" script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/WeChatLottery/WeChatLottery_lite.js
http-request ^https:\/\/new\.api\.hdcj\.9w9\.com\/api\/sign\/sign requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/WeChatLottery/WeChatLottery_lite.js,script-update-interval=0

```
## 配置 (QuanX)

```properties
Quantumult X (TestFlight 190+):
[task_local]
1 0 * * * WeChatLottery_lite.js
or remote
1 0 * * * https://raw.githubusercontent.com/zZPiglet/Task/master/WeChatLottery/WeChatLottery_lite.js

[rewrite_local]
^https:\/\/new\.api\.hdcj\.9w9\.com\/api\/sign\/sign url script-request-body WeChatLottery_lite.js
or remote
^https:\/\/new\.api\.hdcj\.9w9\.com\/api\/sign\/sign url script-request-body https://raw.githubusercontent.com/zZPiglet/Task/master/WeChatLottery/WeChatLottery_lite.js

```
All app:
[mitm]
hostname = new.api.hdcj.9w9.com

获取完 Token 后可不注释 rewrite / mitm，Token 更新时会弹窗。若因 mitm 导致该小程序网络不稳定，可注释掉 mtim。
