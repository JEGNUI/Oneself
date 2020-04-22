# 活动抽奖 [@zZPiglet](https://github.com/zZPiglet/Task)

/*
微信小程序"活动抽奖"自动签到，支持 Quantumult X（理论上也支持 Surge，未尝试）。
请先按下述方法进行配置，进入"活动抽奖"，手动签到一次或点击"已签到"，若弹出"首次写入活动抽奖 Token 成功"即可正常食用，其他提示或无提示请发送日志信息至 issue。
到 cron 设定时间自动签到时，若弹出"活动抽奖 - 签到成功"即完成签到，其他提示或无提示请发送日志信息至 issue。

注意⚠️：此脚本用于在 2020.03.19 及之后需获取过 token 的用户，且需要更换 rewrite 及 hostname。
注意⚠️：非手动完成签到、抽奖、完成任务，请自行评估封号危险，此脚本仅用于学习交流，对其余事件概不负责。

⚠️免责声明：
1. 此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2. 由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人均对此不负责。
3. 请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4. 此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5. 本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6. 如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7. 所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。

Author: zZPiglet

----------
更新日志：
- 2020/03/26：
修复日志显示，新增获取所有任务奖励，参与幸运大礼，部分自动开奖（瓜分现金红包、各类无用优惠券）。
由于开奖部分每类接口不统一，若出现非瓜分现金红包、优惠券类的中奖，可抓包开奖过程反馈至 issue，后续进行更新补充。
过程：进微信小程序 -> 打开 Thor（或可导入 Thor 查看记录的抓包软件）-> 使用默认的全局抓包 -> 点小程序里的"我的-中奖纪录-中奖的条目-开奖" -> 关 Thor -> 导出此次抓包所有记录（或自行排除敏感信息后的记录） -> 提交issue

已知 bug：中奖得券不通知，暂未找到错误点，大佬可帮忙指正。关键参数：datainfo.couponCnt

- 2020/03/23：
新增自动参与首页抽奖、进行参与 3 个首页抽奖后的随即兑换、领取参与 5 个首页抽奖后的每日任务奖励。
----------

咕咕咕：
其余开奖
触发分享得幸运币（随缘碰到，忘了抓包。有哪位小伙伴碰到了可以帮忙抓个包反馈至 issue。）
设置延迟
多账号


## 配置 (Surge)

```properties
[Script]
cron "1 0 * * *" script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/WeChatLottery/WeChatLottery_new.js
http-request ^https:\/\/api-hdcj\.9w9\.com\/v1\/sign script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/WeChatLottery/WeChatLottery_new.js

```
## 配置 (QuanX)

```properties
[task_local]
1 0 * * * WeChatLottery_new.js
or remote
1 0 * * * https://raw.githubusercontent.com/zZPiglet/Task/master/WeChatLottery/WeChatLottery_new.js

[rewrite_local]
^https:\/\/api-hdcj\.9w9\.com\/v1\/sign url script-request-header WeChatLottery_new.js
or remote
^https:\/\/api-hdcj\.9w9\.com\/v1\/sign url script-request-header https://raw.githubusercontent.com/zZPiglet/Task/master/WeChatLottery/WeChatLottery_new.js

```
All app:
[mitm]
hostname = api-hdcj.9w9.com

获取完 Token 后可不注释 rewrite / mitm，Token 更新时会弹窗。若因 mitm 导致该小程序网络不稳定，可注释掉 mtim。
*/
