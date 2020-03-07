/*
京东多合一签到脚本

更新于: 2020.3.6 22:00 v77
有效接口: 21

该脚本同时兼容: QuantumultX, Surge, Loon, JSBox, Node.js
如使用JSBox 或 Nodejs, 请自行抓取Cookie填入脚本Key处.

JSbox, Node.js 抓取Cookie 说明:

开启抓包app后, Safari浏览器登录 https://bean.m.jd.com 点击签到并且出现签到日历后, 返回抓包app搜索关键字 functionId=signBean 复制请求头Cookie填入脚本即可. 
注: 如果复制的Cookie开头为"Cookie: "请把它删除后填入

~~~~~~~~~~~~~~~~
Quantumult X, Surge, Loon 说明：

初次使用时, 打开Safari浏览器登录 https://bean.m.jd.com 点击签到获取cookie, 请注意, 仅可网页获取!!!
如果通知获得cookie成功, 则可以使用此签到脚本。
由于cookie的有效性(经测试网页Cookie有效周期最长31天)，如果脚本将来弹出cookie无效的通知，则需要重复上述步骤。

签到脚本将在每天的凌晨0:05执行。您可以修改执行时间, 因部分接口京豆限量领取, 建议调整为凌晨签到.
注: 京东金融游戏大厅接口因京东服务器负载问题可能无法签到, 可调整签到时间避免签到人数过多导致失败.

问题反馈: @NobyDa_bot
TG频道: @NobyDa

如果转载, 请注明出处.
~~~~~~~~~~~~~~~~

Surge 4.0 或 Loon 2.1+ :

[Script]
# 京东多合一签到
cron "5 0 * * *" script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js

# 获取京东Cookie.
http-request https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js

~~~~~~~~~~~~~~~~

QX 1.0.5+ :

[task_local]
# 京东多合一签到
# 注意此为本地路径, 请根据实际情况自行调整
5 0 * * * JD_DailyBonus.js

[rewrite_local]
# 获取京东Cookie. 
# 注意此为本地路径, 请根据实际情况自行调整.
https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean url script-request-header JD_DailyBonus.js

~~~~~~~~~~~~~~~~
QX 或 Surge 或 Loon MITM = api.m.jd.com
~~~~~~~~~~~~~~~~
*/

var log = true; //是否开启日志, false则关闭
var stop = 0; //自定义延迟签到,单位毫秒,(如填200则每个接口延迟0.2秒执行),默认无延迟
var $nobyda = nobyda();

//  填此处↓↓↓
var Key = ''; //如果使用JSBox或Node.js, 单引号内自行填写您抓取的Cookie.

var KEY = Key?Key:$nobyda.read("CookieJD")
async function all() {//签到模块相互独立,您可注释某一行以禁用某个接口.
  await JingDongBean(stop); //京东京豆
  await JingRongBean(stop); //金融京豆
  await JingRongSteel(stop); //金融钢镚
  await JingDongTurn(stop); //京东转盘
  await JRDoubleSign(stop); //金融双签
  await JDGroceryStore(stop); //京东超市
  await JingDongClocks(stop); //京东钟表馆
  await JingDongPet(stop); //京东宠物馆
  await JDFlashSale(stop); //京东闪购
  await JingDongBook(stop); //京东图书
  await JDSecondhand(stop); //京东拍拍二手
  await JingDMakeup(stop); //京东美妆馆
  await JingDongWomen(stop); //京东女装馆
  await JingDongCash(stop); //京东现金红包
  await JingDongShoes(stop); //京东鞋靴馆
  //await JingRSeeAds(stop); //金融看广告
  await JingRongGame(stop); //金融游戏大厅
  await JingDongLive(stop); //京东智能生活馆
  await JingDongClean(stop); //京东清洁馆
  await JDPersonalCare(stop); //京东个人护理馆
  await JingDongPrize(stop); //京东抽大奖
  await JingDongShake(stop); //京东摇一摇

  await TotalSteel(); //总钢镚查询
  await TotalCash(); //总红包查询
  await TotalBean(); //总京豆查询
  await notify(); //通知模块
}

var merge = {
  JDBean:  {success:0,fail:0,bean:0,steel:0,notify:''},
  JDTurn:  {success:0,fail:0,bean:0,steel:0,notify:''},
  JRBean:  {success:0,fail:0,bean:0,steel:0,notify:''},
  JRDSign: {success:0,fail:0,bean:0,steel:0,notify:''},
  JDGStore:{success:0,fail:0,bean:0,steel:0,notify:''},
  JDClocks:{success:0,fail:0,bean:0,steel:0,notify:''},
  JDPet:   {success:0,fail:0,bean:0,steel:0,notify:''},
  JDFSale: {success:0,fail:0,bean:0,steel:0,notify:''},
  JDBook:  {success:0,fail:0,bean:0,steel:0,notify:''},
  JDShand: {success:0,fail:0,bean:0,steel:0,notify:''},
  JDMakeup:{success:0,fail:0,bean:0,steel:0,notify:''},
  JDWomen: {success:0,fail:0,bean:0,steel:0,notify:''},
  JDShoes: {success:0,fail:0,bean:0,steel:0,notify:''},
  JRGame:  {success:0,fail:0,bean:0,steel:0,notify:''},
  JRSeeAds:{success:0,fail:0,bean:0,steel:0,notify:''},
  JDLive:  {success:0,fail:0,bean:0,steel:0,notify:''},
  JDCare:  {success:0,fail:0,bean:0,steel:0,notify:''},
  JDClean: {success:0,fail:0,bean:0,steel:0,notify:''},
  JDPrize: {success:0,fail:0,bean:0,steel:0,notify:'',key:0},
  JRSteel: {success:0,fail:0,bean:0,steel:0,notify:'',TSteel:0},
  JDCash:  {success:0,fail:0,bean:0,steel:0,notify:'',Cash:0,TCash:0},
  JDShake: {success:0,fail:0,bean:0,steel:0,notify:'',Qbear:0}
}

if ($nobyda.isRequest) {
  GetCookie()
  $nobyda.done()
} else {
  all()
  $nobyda.done()
}

function notify() {

  return new Promise(resolve => {
    try {
      var bean = 0;
      var steel = 0;
      var success = 0;
      var fail = 0;
      var notify = '';
      for (var i in merge) {
        bean += Number(merge[i].bean)
        steel += Number(merge[i].steel)
        success += Number(merge[i].success)
        fail += Number(merge[i].fail)
        notify += merge[i].notify ? "\n" + merge[i].notify : ""
      }
      var beans = merge.JDShake.Qbear ? merge.JDShake.Qbear + "京豆, " : ""
      var Steel = merge.JRSteel.TSteel ? merge.JRSteel.TSteel + "钢镚, " : ""
      var Cash = merge.JDCash.TCash ? merge.JDCash.TCash + "红包" : ""
      var bsc = beans ? "\n" : Steel ? "\n" : Cash ? "\n" : "获取失败\n"
      var Tbean = bean ? bean + "京豆, " : ""
      var TSteel = steel ? steel + "钢镚, " : ""
      var TCash = merge.JDCash.Cash ? merge.JDCash.Cash + "红包" : ""
      var Tbsc = Tbean ? "\n" : TSteel ? "\n" : TCash ? "\n" : "获取失败\n"
      var one = "【京东签到】:  成功" + success + "个, 失败: " + fail + "个\n"
      var two = "【签到总计】:  " + Tbean + TSteel + TCash + Tbsc
      var three = "【账号总计】:  " + beans + Steel + Cash + bsc
      var four = "【左滑 '查看' 以显示签到详情】\n"
      if (log) console.log("\n" + one + two + three + four + notify)
      $nobyda.notify("", "", one + two + three + four + notify);
      resolve('done')
    } catch (eor) {
      $nobyda.notify("通知模块 " + eor.name + "‼️", JSON.stringify(eor), eor.message)
      resolve('done')
    }
  });
}

function JingDongBean(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDBUrl = {
      url: 'https://api.m.jd.com/client.action?functionId=signBeanIndex&appid=ld',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      }
    };

    $nobyda.get(JDBUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JDBean.notify = "京东商城-京豆: 签到接口请求失败 ‼️‼️"
          merge.JDBean.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (cc.code == 3) {
            if (log) console.log("京东商城-京豆Cookie失效response: \n" + data)
            merge.JDBean.notify = "京东商城-京豆: 失败, 原因: Cookie失效‼️"
            merge.JDBean.fail = 1
          } else {
            if (data.match(/跳转至拼图/)) {
              merge.JDBean.notify = "京东商城-京豆: 失败, 原因: 需要拼图验证 ⚠️"
              merge.JDBean.fail = 1
            } else {
              if (cc.data.status == 1) {
                if (log) console.log("京东商城-京豆签到成功response: \n" + data)
                if (data.match(/dailyAward/)) {
                  merge.JDBean.notify = "京东商城-京豆: 成功, 明细: " + cc.data.dailyAward.beanAward.beanCount + "京豆 🐶"
                  merge.JDBean.bean = cc.data.dailyAward.beanAward.beanCount
                  merge.JDBean.success = 1
                } else {
                  if (data.match(/continuityAward/)) {
                    merge.JDBean.notify = "京东商城-京豆: 成功, 明细: " + cc.data.continuityAward.beanAward.beanCount + "京豆 🐶"
                    merge.JDBean.bean = cc.data.continuityAward.beanAward.beanCount
                    merge.JDBean.success = 1
                  } else {
                    if (data.match(/新人签到/)) {
                      const regex = /beanCount\":\"(\d+)\".+今天/;
                      const quantity = regex.exec(data)[1];
                      merge.JDBean.notify = "京东商城-京豆: 成功, 明细: " + quantity + "京豆 🐶"
                      merge.JDBean.bean = quantity
                      merge.JDBean.success = 1
                    } else {
                      merge.JDBean.notify = "京东商城-京豆: 失败, 原因: 未知 ⚠️"
                      merge.JDBean.fail = 1
                    }
                  }
                }
              } else {
                if (log) console.log("京东商城-京豆签到失败response: \n" + data)
                if (data.match(/(已签到|新人签到)/)) {
                  merge.JDBean.notify = "京东商城-京豆: 失败, 原因: 已签过 ⚠️"
                  merge.JDBean.fail = 1
                } else {
                  merge.JDBean.notify = "京东商城-京豆: 失败, 原因: 未知 ⚠️"
                  merge.JDBean.fail = 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东商城-京豆" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JingDongTurn(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDTUrl = {
      url: 'https://api.m.jd.com/client.action?functionId=lotteryDraw&body=%7B%22actId%22%3A%22jgpqtzjhvaoym%22%2C%22appSource%22%3A%22jdhome%22%2C%22lotteryCode%22%3A%224wwzdq7wkqx2usx4g5i2nu5ho4auto4qxylblkxacm7jqdsltsepmgpn3b2hgyd7hiawzpccizuck%22%7D&appid=ld',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      }
    };

    $nobyda.get(JDTUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JDTurn.notify += merge.JDTurn.notify ? "\n京东商城-转盘: 签到接口请求失败 ‼️‼️ (多次)" : "京东商城-转盘: 签到接口请求失败 ‼️‼️"
          merge.JDTurn.fail += 1
        } else {
          const cc = JSON.parse(data)
          if (cc.code == 3) {
            if (log) console.log("京东转盘Cookie失效response: \n" + data)
            merge.JDTurn.notify = "京东商城-转盘: 失败, 原因: Cookie失效‼️"
            merge.JDTurn.fail = 1
          } else {
            if (data.match(/(\"T216\"|活动结束)/)) {
              merge.JDTurn.notify = "京东商城-转盘: 失败, 原因: 活动结束 ⚠️"
              merge.JDTurn.fail = 1
            } else {
              if (data.match(/(京豆|\"910582\")/)) {
                if (log) console.log("京东商城-转盘签到成功response: \n" + data)
                merge.JDTurn.notify += merge.JDTurn.notify ? "\n京东商城-转盘: 成功, 明细: " + cc.data.prizeSendNumber + "京豆 🐶 (多次)" : "京东商城-转盘: 成功, 明细: " + cc.data.prizeSendNumber + "京豆 🐶"
                merge.JDTurn.success += 1
                merge.JDTurn.bean += Number(cc.data.prizeSendNumber)
                if (cc.data.chances != "0") {
                  setTimeout(() => {
                    JingDongTurn(s)
                  }, 2000)
                }
              } else {
                if (log) console.log("京东商城-转盘签到失败response: \n" + data)
                if (data.match(/未中奖/)) {
                  merge.JDTurn.notify += merge.JDTurn.notify ? "\n京东商城-转盘: 成功, 状态: 未中奖 🐶 (多次)" : "京东商城-转盘: 成功, 状态: 未中奖 🐶"
                  merge.JDTurn.success += 1
                if (cc.data.chances != "0") {
                  setTimeout(() => {
                    JingDongTurn(s)
                  }, 2000)
                }
                } else if (data.match(/(T215|次数为0)/)) {
                  merge.JDTurn.notify = "京东商城-转盘: 失败, 原因: 已转过 ⚠️"
                  merge.JDTurn.fail = 1
                } else if (data.match(/(T210|密码)/)) {
                  merge.JDTurn.notify = "京东商城-转盘: 失败, 原因: 无支付密码 ⚠️"
                  merge.JDTurn.fail = 1
                } else {
                  merge.JDTurn.notify += merge.JDTurn.notify ? "\n京东商城-转盘: 失败, 原因: 未知 ⚠️ (多次)" : "京东商城-转盘: 失败, 原因: 未知 ⚠️"
                  merge.JDTurn.fail += 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东商城-转盘" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JingRongBean(s) {

  return new Promise(resolve => { setTimeout(() => {
    const login = {
      url: 'https://ms.jr.jd.com/gw/generic/zc/h5/m/signRecords',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
        Referer: "https://jddx.jd.com/m/money/index.html?from=sign",
      },
      body: "reqData=%7B%22bizLine%22%3A2%7D"
    };

    const JRBUrl = {
      url: 'https://ms.jr.jd.com/gw/generic/zc/h5/m/signRewardGift',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
        Referer: "https://jddx.jd.com/m/jddnew/money/index.html",
      },
      body: "reqData=%7B%22bizLine%22%3A2%2C%22signDate%22%3A%221%22%2C%22deviceInfo%22%3A%7B%22os%22%3A%22iOS%22%7D%2C%22clientType%22%3A%22sms%22%2C%22clientVersion%22%3A%2211.0%22%7D"
    };
    $nobyda.post(login, function(error, response, data) {
      try {
        if (error) {
          merge.JRBean.notify = "京东金融-京豆: 登录接口请求失败 ‼️‼️"
          merge.JRBean.fail = 1
          resolve('done')
        } else {
          setTimeout(function() {
            if (data.match(/\"login\":true/)) {
              if (log) console.log("京东金融-京豆登录成功response: \n" + data)
              $nobyda.post(JRBUrl, function(error, response, data) {
                try {
                  if (error) {
                    merge.JRBean.notify = "京东金融-京豆: 签到接口请求失败 ‼️‼️"
                    merge.JRBean.fail = 1
                  } else {
                    const c = JSON.parse(data)
                    if (data.match(/\"resultCode\":\"00000\"/)) {
                      if (log) console.log("京东金融-京豆签到成功response: \n" + data)
                      if (c.resultData.data.rewardAmount != "0") {
                        merge.JRBean.notify = "京东金融-京豆: 成功, 明细: " + c.resultData.data.rewardAmount + "京豆 🐶"
                        merge.JRBean.success = 1
                        merge.JRBean.bean = c.resultData.data.rewardAmount
                      } else {
                        merge.JRBean.notify = "京东金融-京豆: 成功, 明细: 无奖励 🐶"
                        merge.JRBean.success = 1
                      }
                    } else {
                      if (log) console.log("京东金融-京豆签到失败response: \n" + data)
                      if (data.match(/(发放失败|70111)/)) {
                        merge.JRBean.notify = "京东金融-京豆: 失败, 原因: 已签过 ⚠️"
                        merge.JRBean.fail = 1
                      } else {
                        if (data.match(/(\"resultCode\":3|请先登录)/)) {
                          merge.JRBean.notify = "京东金融-京豆: 失败, 原因: Cookie失效‼️"
                          merge.JRBean.fail = 1
                        } else {
                          merge.JRBean.notify = "京东金融-京豆: 失败, 原因: 未知 ⚠️"
                          merge.JRBean.fail = 1
                        }
                      }
                    }
                  }
                  resolve('done')
                } catch (eor) {
                  $nobyda.notify("京东金融-京豆" + eor.name + "‼️", JSON.stringify(eor), eor.message)
                  resolve('done')
                }
              })
            } else {
              if (log) console.log("京东金融-京豆登录失败response: \n" + data)
              if (data.match(/\"login\":false/)) {
                merge.JRBean.notify = "京东金融-京豆: 失败, 原因: Cookie失效‼️"
                merge.JRBean.fail = 1
              } else {
                merge.JRBean.notify = "京东金融-京豆: 登录接口需修正 ‼️‼️"
                merge.JRBean.fail = 1
              }
            }
          }, 200)
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东金融-京豆登录" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JingRongSteel(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JRSUrl = {
      url: 'https://ms.jr.jd.com/gw/generic/gry/h5/m/signIn',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "reqData=%7B%22channelSource%22%3A%22JRAPP%22%2C%22riskDeviceParam%22%3A%22%7B%7D%22%7D"
    };

    $nobyda.post(JRSUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JRSteel.notify = "京东金融-钢镚: 签到接口请求失败 ‼️‼️"
          merge.JRSteel.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (data.match(/\"resBusiCode\":0/)) {
            if (log) console.log("京东金融-钢镚签到成功response: \n" + data)
              const leng = "" + cc.resultData.resBusiData.actualTotalRewardsValue
              if (leng.length == 1) {
                merge.JRSteel.notify = "京东金融-钢镚: 成功, 明细: " + "0.0" + cc.resultData.resBusiData.actualTotalRewardsValue + "钢镚 💰"
                merge.JRSteel.success = 1
                merge.JRSteel.steel = "0.0" + cc.resultData.resBusiData.actualTotalRewardsValue
              } else {
                merge.JRSteel.notify = "京东金融-钢镚: 成功, 明细: " + "0." + cc.resultData.resBusiData.actualTotalRewardsValue + "钢镚 💰"
                merge.JRSteel.success = 1
                merge.JRSteel.steel = "0." + cc.resultData.resBusiData.actualTotalRewardsValue
              }
          } else {
            if (log) console.log("京东金融-钢镚签到失败response: \n" + data)
            if (data.match(/(已经领取|\"resBusiCode\":15)/)) {
              merge.JRSteel.notify = "京东金融-钢镚: 失败, 原因: 已签过 ⚠️"
              merge.JRSteel.fail = 1
            } else {
              if (data.match(/未实名/)) {
                merge.JRSteel.notify = "京东金融-钢镚: 失败, 原因: 账号未实名 ⚠️"
                merge.JRSteel.fail = 1
              } else {
                if (data.match(/(\"resultCode\":3|请先登录)/)) {
                  merge.JRSteel.notify = "京东金融-钢镚: 失败, 原因: Cookie失效‼️"
                  merge.JRSteel.fail = 1
                } else {
                  merge.JRSteel.notify = "京东金融-钢镚: 失败, 原因: 未知 ⚠️"
                  merge.JRSteel.fail = 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东金融-钢镚" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}


function JRDoubleSign(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JRDSUrl = {
      url: 'https://nu.jr.jd.com/gw/generic/jrm/h5/m/process?',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "reqData=%7B%22actCode%22%3A%22FBBFEC496C%22%2C%22type%22%3A3%2C%22riskDeviceParam%22%3A%22%22%7D"
    };

    $nobyda.post(JRDSUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JRDSign.notify = "京东金融-双签: 签到接口请求失败 ‼️‼️"
          merge.JRDSign.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (data.match(/京豆X/)) {
            if (log) console.log("京东金融-双签签到成功response: \n" + data)
              merge.JRDSign.notify = "京东金融-双签: 成功, 明细: " + cc.resultData.data.businessData.businessData.awardListVo[0].count + "京豆 🐶"
              merge.JRDSign.bean = cc.resultData.data.businessData.businessData.awardListVo[0].count
              merge.JRDSign.success = 1
          } else {
            if (log) console.log("京东金融-双签签到失败response: \n" + data)
            if (data.match(/已领取/)) {
              merge.JRDSign.notify = "京东金融-双签: 失败, 原因: 已签过 ⚠️"
              merge.JRDSign.fail = 1
            } else {
              if (data.match(/(不存在|已结束)/)) {
                merge.JRDSign.notify = "京东金融-双签: 失败, 原因: 活动已结束 ⚠️"
                merge.JRDSign.fail = 1
              } else {
                if (data.match(/未在/)) {
                  merge.JRDSign.notify = "京东金融-双签: 失败, 原因: 未在京东签到 ⚠️"
                  merge.JRDSign.fail = 1
                } else {
                  if (data.match(/(\"resultCode\":3|请先登录)/)) {
                    merge.JRDSign.notify = "京东金融-双签: 失败, 原因: Cookie失效‼️"
                    merge.JRDSign.fail = 1
                  } else if (cc.resultData.data.businessData.businessCode == "000sq" && cc.resultData.data.businessData.businessMsg == "成功") {
                    merge.JRDSign.notify = "京东金融-双签: 成功, 明细: 无奖励 🐶"
                    merge.JRDSign.success = 1
                  } else {
                    merge.JRDSign.notify = "京东金融-双签: 失败, 原因: 未知 ⚠️"
                    merge.JRDSign.fail = 1
                  }
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东金融-双签" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}


function JingDongShake(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDSh = {
      url: 'https://api.m.jd.com/client.action?appid=vip_h5&functionId=vvipclub_shaking',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      }
    };

    $nobyda.get(JDSh, function(error, response, data) {
      try {
        if (error) {
          merge.JDShake.notify += merge.JDShake.notify ? "\n京东商城-摇摇: 签到接口请求失败 ‼️‼️ (多次)\n" + error : "京东商城-摇摇: 签到接口请求失败 ‼️‼️\n" + error
          merge.JDShake.fail += 1
        } else {
          const cc = JSON.parse(data)
          if (data.match(/prize/)) {
            if (log) console.log("京东商城-摇一摇签到成功response: \n" + data)
            if (cc.data.prizeBean) {
              merge.JDShake.notify += merge.JDShake.notify ? "\n京东商城-摇摇: 成功, 明细: " + cc.data.prizeBean.count + "京豆 🐶 (多次)" : "京东商城-摇摇: 成功, 明细: " + cc.data.prizeBean.count + "京豆 🐶"
              merge.JDShake.bean += cc.data.prizeBean.count
              merge.JDShake.success += 1
            } else {
              if (cc.data.prizeCoupon) {
                merge.JDShake.notify += merge.JDShake.notify ? "\n京东商城-摇摇(多次): 获得满" + cc.data.prizeCoupon.quota + "减" + cc.data.prizeCoupon.discount + "优惠券→ " + cc.data.prizeCoupon.limitStr : "京东商城-摇摇: 获得满" + cc.data.prizeCoupon.quota + "减" + cc.data.prizeCoupon.discount + "优惠券→ " + cc.data.prizeCoupon.limitStr
                merge.JDShake.success += 1
              } else {
                merge.JDShake.notify += merge.JDShake.notify ? "\n京东商城-摇摇: 失败, 原因: 未知 ⚠️ (多次)" : "京东商城-摇摇: 失败, 原因: 未知 ⚠️"
                merge.JDShake.fail += 1
              }
            }
            if (cc.data.luckyBox.freeTimes != 0) {
              JingDongShake(s)
            }
          } else {
            if (log) console.log("京东商城-摇一摇签到失败response: \n" + data)
            if (data.match(/true/)) {
              merge.JDShake.notify += merge.JDShake.notify ? "\n京东商城-摇摇: 成功, 明细: 无奖励 🐶 (多次)" : "京东商城-摇摇: 成功, 明细: 无奖励 🐶"
              merge.JDShake.success += 1
              if (cc.data.luckyBox.freeTimes != 0) {
                JingDongShake(s)
              }
            } else {
              if (data.match(/(无免费|8000005)/)) {
                merge.JDShake.notify = "京东商城-摇摇: 失败, 原因: 已摇过 ⚠️"
                merge.JDShake.fail = 1
              } else if (data.match(/(未登录|101)/)) {
                merge.JDShake.notify = "京东商城-摇摇: 失败, 原因: Cookie失效‼️"
                merge.JDShake.fail = 1
              } else {
                merge.JDShake.notify += merge.JDShake.notify ? "\n京东商城-摇摇: 失败, 原因: 未知 ⚠️ (多次)" : "京东商城-摇摇: 失败, 原因: 未知 ⚠️"
                merge.JDShake.fail += 1
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东商城-摇摇" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JDGroceryStore(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDGSUrl = {
      url: 'https://api.m.jd.com/client.action?functionId=userSign',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "body=%7B%22params%22%3A%22%7B%5C%22enActK%5C%22%3A%5C%22caA6%2B%2FTo6Jfe%2FAKYm8gLQEchLXtYeB53heY9YzuzsZoaZs%2Fn4coLNw%3D%3D%5C%22%2C%5C%22isFloatLayer%5C%22%3Afalse%2C%5C%22signId%5C%22%3A%5C%22hEr1TO1FjXgaZs%2Fn4coLNw%3D%3D%5C%22%7D%22%7D&screen=750%2A1334&client=wh5&clientVersion=1.0.0&sid=0ac0caddd8a12bf58ea7a912a5c637cw&uuid=1fce88cd05c42fe2b054e846f11bdf33f016d676&area=19_1617_3643_8208"
    };

    $nobyda.post(JDGSUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JDGStore.notify = "京东商城-超市: 签到接口请求失败 ‼️‼️"
          merge.JDGStore.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (data.match(/签到成功/)) {
            if (log) console.log("京东商城-超市签到成功response: \n" + data)
            if (data.match(/(\"text\":\"\d+京豆\")/)) {
              beanQuantity = cc.awardList[0].text.match(/\d+/)
              merge.JDGStore.notify = "京东商城-超市: 成功, 明细: " + beanQuantity + "京豆 🐶"
              merge.JDGStore.bean = beanQuantity
              merge.JDGStore.success = 1
            } else {
              merge.JDGStore.notify = "京东商城-超市: 成功, 明细: 无京豆 🐶"
              merge.JDGStore.success = 1
            }
          } else {
            if (log) console.log("京东商城-超市签到失败response: \n" + data)
            if (data.match(/(已签到|已领取)/)) {
              merge.JDGStore.notify = "京东商城-超市: 失败, 原因: 已签过 ⚠️"
              merge.JDGStore.fail = 1
            } else {
              if (data.match(/(不存在|已结束)/)) {
                merge.JDGStore.notify = "京东商城-超市: 失败, 原因: 活动已结束 ⚠️"
                merge.JDGStore.fail = 1
              } else {
                if (cc.code == 3) {
                  merge.JDGStore.notify = "京东商城-超市: 失败, 原因: Cookie失效‼️"
                  merge.JDGStore.fail = 1
                } else {
                  merge.JDGStore.notify = "京东商城-超市: 失败, 原因: 未知 ⚠️"
                  merge.JDGStore.fail = 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东商城-超市" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JingDongClocks(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDCUrl = {
      url: 'https://api.m.jd.com/client.action?functionId=userSign',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "body=%7B%22params%22%3A%22%7B%5C%22enActK%5C%22%3A%5C%22LW67%2FHBJP72aMSByZLRaRqJGukOFKx9r4F87VrKBmogaZs%2Fn4coLNw%3D%3D%5C%22%2C%5C%22isFloatLayer%5C%22%3Atrue%2C%5C%22signId%5C%22%3A%5C%22g2kYL2MvMgkaZs%2Fn4coLNw%3D%3D%5C%22%7D%22%7D&client=wh5"
    };

    $nobyda.post(JDCUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JDClocks.notify = "京东商城-钟表: 签到接口请求失败 ‼️‼️"
          merge.JDClocks.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (data.match(/签到成功/)) {
            if (log) console.log("京东商城-钟表签到成功response: \n" + data)
            if (data.match(/(\"text\":\"\d+京豆\")/)) {
              beanQuantity = cc.awardList[0].text.match(/\d+/)
              merge.JDClocks.notify = "京东商城-钟表: 成功, 明细: " + beanQuantity + "京豆 🐶"
              merge.JDClocks.bean = beanQuantity
              merge.JDClocks.success = 1
            } else {
              merge.JDClocks.notify = "京东商城-钟表: 成功, 明细: 无京豆 🐶"
              merge.JDClocks.success = 1
            }
          } else {
            if (log) console.log("京东商城-钟表签到失败response: \n" + data)
            if (data.match(/(已签到|已领取)/)) {
              merge.JDClocks.notify = "京东商城-钟表: 失败, 原因: 已签过 ⚠️"
              merge.JDClocks.fail = 1
            } else {
              if (data.match(/(不存在|已结束)/)) {
                merge.JDClocks.notify = "京东商城-钟表: 失败, 原因: 活动已结束 ⚠️"
                merge.JDClocks.fail = 1
              } else {
                if (cc.code == 3) {
                  merge.JDClocks.notify = "京东商城-钟表: 失败, 原因: Cookie失效‼️"
                  merge.JDClocks.fail = 1
                } else {
                  merge.JDClocks.notify = "京东商城-钟表: 失败, 原因: 未知 ⚠️"
                  merge.JDClocks.fail = 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东商城-钟表" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JingDongPet(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDPETUrl = {
      url: 'https://api.m.jd.com/client.action?functionId=userSign',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "body=%7B%22params%22%3A%22%7B%5C%22enActK%5C%22%3A%5C%226DiDTHMDvpNyoP9JUaEkki%2FsREOeEAl8M8REPQ%2F2eA4aZs%2Fn4coLNw%3D%3D%5C%22%2C%5C%22isFloatLayer%5C%22%3Afalse%2C%5C%22signId%5C%22%3A%5C%22Nk2fZhdgf5UaZs%2Fn4coLNw%3D%3D%5C%22%7D%22%7D&client=wh5"
    };

    $nobyda.post(JDPETUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JDPet.notify = "京东商城-宠物: 签到接口请求失败 ‼️‼️"
          merge.JDPet.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (data.match(/签到成功/)) {
            if (log) console.log("京东商城-宠物签到成功response: \n" + data)
            if (data.match(/(\"text\":\"\d+京豆\")/)) {
              beanQuantity = cc.awardList[0].text.match(/\d+/)
              merge.JDPet.notify = "京东商城-宠物: 成功, 明细: " + beanQuantity + "京豆 🐶"
              merge.JDPet.bean = beanQuantity
              merge.JDPet.success = 1
            } else {
              merge.JDPet.notify = "京东商城-宠物: 成功, 明细: 无京豆 🐶"
              merge.JDPet.success = 1
            }
          } else {
            if (log) console.log("京东商城-宠物签到失败response: \n" + data)
            if (data.match(/(已签到|已领取)/)) {
              merge.JDPet.notify = "京东商城-宠物: 失败, 原因: 已签过 ⚠️"
              merge.JDPet.fail = 1
            } else {
              if (data.match(/(不存在|已结束)/)) {
                merge.JDPet.notify = "京东商城-宠物: 失败, 原因: 活动已结束 ⚠️"
                merge.JDPet.fail = 1
              } else {
                if (cc.code == 3) {
                  merge.JDPet.notify = "京东商城-宠物: 失败, 原因: Cookie失效‼️"
                  merge.JDPet.fail = 1
                } else {
                  merge.JDPet.notify = "京东商城-宠物: 失败, 原因: 未知 ⚠️"
                  merge.JDPet.fail = 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东商城-宠物" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JDFlashSale(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDPETUrl = {
      url: 'https://api.m.jd.com/client.action?functionId=partitionJdSgin',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "body=%7B%7D&client=apple&clientVersion=8.4.6&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&sign=141ab5f9af92126bb46d50f3e8af758a&st=1579305780511&sv=102"
    };

    $nobyda.post(JDPETUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JDFSale.notify = "京东商城-闪购: 签到接口请求失败 ‼️‼️"
          merge.JDFSale.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (cc.result.code == 0) {
            if (log) console.log("京东商城-闪购签到成功response: \n" + data)
            if (data.match(/(\"count\":\d+)/)) {
              merge.JDFSale.notify = "京东商城-闪购: 成功, 明细: " + cc.result.count + "京豆 🐶"
              merge.JDFSale.bean = cc.result.count
              merge.JDFSale.success = 1
            } else {
              merge.JDFSale.notify = "京东商城-闪购: 成功, 明细: 无京豆 🐶"
              merge.JDFSale.success = 1
            }
          } else {
            if (log) console.log("京东商城-闪购签到失败response: \n" + data)
            if (data.match(/(已签到|已领取|\"2005\")/)) {
              merge.JDFSale.notify = "京东商城-闪购: 失败, 原因: 已签过 ⚠️"
              merge.JDFSale.fail = 1
            } else {
              if (data.match(/(不存在|已结束|\"2008\")/)) {
                //merge.JDFSale.notify = "京东商城-闪购: 失败, 原因: 需瓜分 ⚠️"
                //merge.JDFSale.fail = 1
                FlashSaleDivide(s)
              } else {
                if (data.match(/(\"code\":\"3\"|\"1003\")/)) {
                  merge.JDFSale.notify = "京东商城-闪购: 失败, 原因: Cookie失效‼️"
                  merge.JDFSale.fail = 1
                } else {
                  merge.JDFSale.notify = "京东商城-闪购: 失败, 原因: 未知 ⚠️"
                  merge.JDFSale.fail = 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东商城-闪购" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function FlashSaleDivide(s) {

  return new Promise(resolve => { setTimeout(() => {
    const Url = {
      url: 'https://api.m.jd.com/client.action?functionId=partitionJdShare',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "body=%7B%7D&client=apple&clientVersion=8.5.0&d_brand=apple&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&sign=958ba0e805094b4b0f6216e86190ab51&st=1582042405636&sv=120&wifiBssid=unknown"
    };

    $nobyda.post(Url, function(error, response, data) {
      try {
        if (error) {
          merge.JDFSale.notify = "京东闪购-瓜分: 签到接口请求失败 ‼️‼️"
          merge.JDFSale.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (cc.result.code == 0) {
            if (log) console.log("京东闪购-瓜分签到成功response: \n" + data)
            if (data.match(/(\"jdBeanNum\":\d+)/)) {
              merge.JDFSale.notify = "京东闪购-瓜分: 成功, 明细: " + cc.result.jdBeanNum + "京豆 🐶"
              merge.JDFSale.bean = cc.result.jdBeanNum
              merge.JDFSale.success = 1
            } else {
              merge.JDFSale.notify = "京东闪购-瓜分: 成功, 明细: 无京豆 🐶"
              merge.JDFSale.success = 1
            }
          } else {
            if (log) console.log("京东闪购-瓜分签到失败response: \n" + data)
            if (data.match(/(已参与|已领取|\"2006\")/)) {
              merge.JDFSale.notify = "京东闪购-瓜分: 失败, 原因: 已瓜分 ⚠️"
              merge.JDFSale.fail = 1
            } else {
              if (data.match(/(不存在|已结束|未开始|\"2008\")/)) {
                merge.JDFSale.notify = "京东闪购-瓜分: 失败, 原因: 活动已结束 ⚠️"
                merge.JDFSale.fail = 1
              } else {
                if (data.match(/(\"code\":\"1003\"|未获取)/)) {
                  merge.JDFSale.notify = "京东闪购-瓜分: 失败, 原因: Cookie失效‼️"
                  merge.JDFSale.fail = 1
                } else {
                  merge.JDFSale.notify = "京东闪购-瓜分: 失败, 原因: 未知 ⚠️"
                  merge.JDFSale.fail = 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东闪购-瓜分" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JingDongBook(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDBookUrl = {
      url: 'https://api.m.jd.com/client.action?functionId=userSign',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "body=%7B%22riskParam%22%3A%7B%22eid%22%3A%22O5X6JYMZTXIEX4VBCBWEM5PTIZV6HXH7M3AI75EABM5GBZYVQKRGQJ5A2PPO5PSELSRMI72SYF4KTCB4NIU6AZQ3O6C3J7ZVEP3RVDFEBKVN2RER2GTQ%22%2C%22shshshfpb%22%3A%22v1%5C%2FzMYRjEWKgYe%2BUiNwEvaVlrHBQGVwqLx4CsS9PH1s0s0Vs9AWk%2B7vr9KSHh3BQd5NTukznDTZnd75xHzonHnw%3D%3D%22%2C%22pageClickKey%22%3A%22Babel_Sign%22%2C%22childActivityUrl%22%3A%22https%3A%5C%2F%5C%2Fpro.m.jd.com%5C%2Fmall%5C%2Factive%5C%2F3SC6rw5iBg66qrXPGmZMqFDwcyXi%5C%2Findex.html%3Fcu%3Dtrue%26utm_source%3Dwww.linkstars.com%26utm_medium%3Dtuiguang%26utm_campaign%3Dt_1000089893_157_0_184__cc59020469361878%26utm_term%3De04e88b40a3c4e24898da7fcee54a609%22%7D%2C%22url%22%3A%22https%3A%5C%2F%5C%2Fpro.m.jd.com%5C%2Fmall%5C%2Factive%5C%2F3SC6rw5iBg66qrXPGmZMqFDwcyXi%5C%2Findex.html%3Fcu%3Dtrue%26utm_source%3Dwww.linkstars.com%26utm_medium%3Dtuiguang%26utm_campaign%3Dt_1000089893_157_0_184__cc59020469361878%26utm_term%3De04e88b40a3c4e24898da7fcee54a609%22%2C%22params%22%3A%22%7B%5C%22enActK%5C%22%3A%5C%22ziJpxomssJzA0Lnt9V%2BVYoW5AbqAOQ6XiMQuejSm7msaZs%5C%2Fn4coLNw%3D%3D%5C%22%2C%5C%22isFloatLayer%5C%22%3Afalse%2C%5C%22ruleSrv%5C%22%3A%5C%2200416621_28128239_t1%5C%22%2C%5C%22signId%5C%22%3A%5C%22jw9BKb%5C%2Fb%2BfEaZs%5C%2Fn4coLNw%3D%3D%5C%22%7D%22%2C%22geo%22%3A%7B%22lng%22%3A%220.000000%22%2C%22lat%22%3A%220.000000%22%7D%7D&client=apple&clientVersion=8.4.6&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&sign=c1d6bdbb17d0d3f8199557265c6db92c&st=1579305128990&sv=121"
    };

    $nobyda.post(JDBookUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JDBook.notify = "京东商城-图书: 签到接口请求失败 ‼️‼️"
          merge.JDBook.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (data.match(/签到成功/)) {
            if (log) console.log("京东商城-图书签到成功response: \n" + data)
            if (data.match(/(\"text\":\"\d+京豆\")/)) {
              beanQuantity = cc.awardList[0].text.match(/\d+/)
              merge.JDBook.notify = "京东商城-图书: 成功, 明细: " + beanQuantity + "京豆 🐶"
              merge.JDBook.bean = beanQuantity
              merge.JDBook.success = 1
            } else {
              merge.JDBook.notify = "京东商城-图书: 成功, 明细: 无京豆 🐶"
              merge.JDBook.success = 1
            }
          } else {
            if (log) console.log("京东商城-图书签到失败response: \n" + data)
            if (data.match(/(已签到|已领取)/)) {
              merge.JDBook.notify = "京东商城-图书: 失败, 原因: 已签过 ⚠️"
              merge.JDBook.fail = 1
            } else {
              if (data.match(/(不存在|已结束)/)) {
                merge.JDBook.notify = "京东商城-图书: 失败, 原因: 活动已结束 ⚠️"
                merge.JDBook.fail = 1
              } else {
                if (cc.code == 3) {
                  merge.JDBook.notify = "京东商城-图书: 失败, 原因: Cookie失效‼️"
                  merge.JDBook.fail = 1
                } else if (cc.code == "600") {
                  merge.JDBook.notify = "京东商城-图书: 失败, 原因: 认证失败 ⚠️"
                  merge.JDBook.fail = 1
                } else {
                  merge.JDBook.notify = "京东商城-图书: 失败, 原因: 未知 ⚠️"
                  merge.JDBook.fail = 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东商城-图书" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JDSecondhand(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDSDUrl = {
      url: 'https://api.m.jd.com/client.action?functionId=userSign',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "body=%7B%22riskParam%22%3A%7B%22eid%22%3A%22O5X6JYMZTXIEX4VBCBWEM5PTIZV6HXH7M3AI75EABM5GBZYVQKRGQJ5A2PPO5PSELSRMI72SYF4KTCB4NIU6AZQ3O6C3J7ZVEP3RVDFEBKVN2RER2GTQ%22%2C%22shshshfpb%22%3A%22v1%5C%2FzMYRjEWKgYe%2BUiNwEvaVlrHBQGVwqLx4CsS9PH1s0s0Vs9AWk%2B7vr9KSHh3BQd5NTukznDTZnd75xHzonHnw%3D%3D%22%2C%22pageClickKey%22%3A%22Babel_Sign%22%2C%22childActivityUrl%22%3A%22https%3A%5C%2F%5C%2Fpro.m.jd.com%5C%2Fmall%5C%2Factive%5C%2F3S28janPLYmtFxypu37AYAGgivfp%5C%2Findex.html%3Fcu%3Dtrue%26utm_source%3Dwww.linkstars.com%26utm_medium%3Dtuiguang%26utm_campaign%3Dt_1000089893_157_0_184__cc59020469361878%26utm_term%3Dd802691049c9473897298c4de3159179%22%7D%2C%22url%22%3A%22https%3A%5C%2F%5C%2Fpro.m.jd.com%5C%2Fmall%5C%2Factive%5C%2F3S28janPLYmtFxypu37AYAGgivfp%5C%2Findex.html%3Fcu%3Dtrue%26utm_source%3Dwww.linkstars.com%26utm_medium%3Dtuiguang%26utm_campaign%3Dt_1000089893_157_0_184__cc59020469361878%26utm_term%3Dd802691049c9473897298c4de3159179%22%2C%22params%22%3A%22%7B%5C%22enActK%5C%22%3A%5C%221aXiBKmxyz6XLsyntfp11AP4x7fjsFotKNTTk2Y39%2BUaZs%5C%2Fn4coLNw%3D%3D%5C%22%2C%5C%22isFloatLayer%5C%22%3Afalse%2C%5C%22ruleSrv%5C%22%3A%5C%2200124860_28262902_t1%5C%22%2C%5C%22signId%5C%22%3A%5C%226CR%5C%2FQvgfF5EaZs%5C%2Fn4coLNw%3D%3D%5C%22%7D%22%2C%22geo%22%3A%7B%22lng%22%3A%220.000000%22%2C%22lat%22%3A%220.000000%22%7D%7D&client=apple&clientVersion=8.4.6&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&sign=56a228e0edada1283ba0f971c41633af&st=1579306801665&sv=121"
    };

    $nobyda.post(JDSDUrl, function(error, response, data) {
      try {
        if (error) {
          merge.JDShand.notify = "京东拍拍-二手: 签到接口请求失败 ‼️‼️"
          merge.JDShand.fail = 1
        } else {
          const cc = JSON.parse(data)
          if (data.match(/签到成功/)) {
            if (log) console.log("京东拍拍-二手签到成功response: \n" + data)
            if (data.match(/(\"text\":\"\d+京豆\")/)) {
              beanQuantity = cc.awardList[0].text.match(/\d+/)
              merge.JDShand.notify = "京东拍拍-二手: 成功, 明细: " + beanQuantity + "京豆 🐶"
              merge.JDShand.bean = beanQuantity
              merge.JDShand.success = 1
            } else {
              merge.JDShand.notify = "京东拍拍-二手: 成功, 明细: 无京豆 🐶"
              merge.JDShand.success = 1
            }
          } else {
            if (log) console.log("京东拍拍-二手签到失败response: \n" + data)
            if (data.match(/(已签到|已领取)/)) {
              merge.JDShand.notify = "京东拍拍-二手: 失败, 原因: 已签过 ⚠️"
              merge.JDShand.fail = 1
            } else {
              if (data.match(/(不存在|已结束)/)) {
                merge.JDShand.notify = "京东拍拍-二手: 失败, 原因: 活动已结束 ⚠️"
                merge.JDShand.fail = 1
              } else {
                if (cc.code == 3) {
                  merge.JDShand.notify = "京东拍拍-二手: 失败, 原因: Cookie失效‼️"
                  merge.JDShand.fail = 1
                } else if (cc.code == "600") {
                  merge.JDShand.notify = "京东拍拍-二手: 失败, 原因: 认证失败 ⚠️"
                  merge.JDShand.fail = 1
                } else {
                  merge.JDShand.notify = "京东拍拍-二手: 失败, 原因: 未知 ⚠️"
                  merge.JDShand.fail = 1
                }
              }
            }
          }
        }
        resolve('done')
      } catch (eor) {
        $nobyda.notify("京东拍拍-二手" + eor.name + "‼️", JSON.stringify(eor), eor.message)
        resolve('done')
      }
    })}, s)
  });
}

function JingDMakeup(s) {

  return new Promise(resolve => { setTimeout(() => {
    const JDMUrl = {
      url: 'https://api.m.jd.com/client.action?functionId=userSign',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Cookie: KEY,
      },
      body: "body=%7B%22riskParam%22%3A%7B%22eid%22%3A%22O5X6JYMZTXIEX4VBCBWEM5PTIZV6HXH7M3AI75EABM5GBZYVQKRGQJ5A2PPO5PSELSRMI72SYF4KTCB4NIU6AZQ3O6C3J7ZVEP3RVDFEBKVN2RER2GTQ%22%2C%22shshshfpb%22%3A%22v1%5C%2FzMYRjEWKgYe%2BUiNwEvaVlrHBQGVwqLx4CsS9PH1s0s0Vs9AWk%2B7vr9KSHh3BQd5NTukznDTZnd75xHzonHnw%3D%3D%22%2C%22pageClickKey%22%3A%22Babel_Sign%22%2C%22childActivityUrl%22%3A%22-1%22%7D%2C%22url%22%3A%22%22%2C%22params%22%3A%22%7B%5C%22enActK%5C%22%3A%5C%22Ivkdqs6fb5SN1HsgsPsE7vJN9NGIydei6Ik%2B1rAyngwaZs%5C%2Fn4coLNw%3D%3D%5C%22%2C%5C%22isFloatLayer%5C%22%3Afalse%2C%5C%22ruleSrv%5C%22%3A%5C%2200138455_30206794_t1%5C%22%2C%5C%22signId%5C%22%3A%5C%22YU1cvfWmabwaZs%5C%2Fn4coLNw%3D%3D%5C%22%7D%22%2C%22geo%22%3A%7B%22lng%22%3A%220.000000%22%2C%22lat%22%3A%220.000000%22%7D%7D&build=167092&client=apple&clientVersion=8.5.2&d_brand=apple&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&scope=11&sign=cc38bf6e24fd65e4f43868ccbe679f85&st=1582992598833&sv=11
