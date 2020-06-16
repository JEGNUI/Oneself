/*
微博超话签到-lowking-v1.2(原作者NavePnow，因为通知太多进行修改，同时重构了代码)

⚠️注：获取完cookie记得把脚本禁用

************************
Surge 4.2.0+ 脚本配置:
************************

[Script]
# > 微博超话签到
微博超话获取cookie = type=http-request,pattern=https:\/\/weibo\.com\/p\/aj\/general\/button\?ajwvr=6&api=http:\/\/i\.huati\.weibo\.com\/aj\/super\/checkin,script-path=weiboSTCookie.js
微博超话签到 = type=cron,cronexp="0 0 0,1 * * ?",wake-system=1,script-path=weiboST.js

[Header Rewrite]
#超话页面强制用pc模式打开
^https?://weibo\.com/p/[0-9] header-replace User-Agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15"

[mitm] 
hostname = weibo.com

************************
QuantumultX 本地脚本配置:
************************

[rewrite_local]
#微博超话签到
https:\/\/weibo\.com\/p\/aj\/general\/button\?ajwvr=6&api=http:\/\/i\.huati\.weibo\.com\/aj\/super\/checkin url script-request-header https://raw.githubusercontent.com/lowking/Scripts/master/weibo/weiboSTCookie.js
0 0 0,1 * * ? https://raw.githubusercontent.com/lowking/Scripts/master/weibo/weiboST.js
#超话页面强制用pc模式打开
^https?://weibo\.com/p/[0-9] url request-header (\r\n)User-Agent:.+(\r\n) request-header $1User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15

[mitm] 
hostname= weibo.com
*/
const isEnableLog = true
const isClearCookie = false
const signHeaderKey = 'lkWeiboSTSignHeaderKey'
const lk = nobyda()
const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15`
const mainTitle = `微博超话`
const userFollowSTKey = `lkUserFollowSTKey`
var notifyInfo = ``
var accounts = !lk.getVal(userFollowSTKey) ? [
        ["犬角夫", "100808cb3981384f0518c1f8b4375263c755e2"],
        ["IU", "100808d4151ccebfbae55e8f7c0f68f6d18e4d"],
        ["知恩", "1008083962f6e275b6f6a846d5d012ba84a5f2"],
        ["超越妹妹", "1008082a98366b6a3546bd16e9da0571e34b84"],
        ["张大仙", "10080864be35849c64be48713285e01276746a"],
        ["司法考试", "100808eda03d1322c0b5855da393bffc759f5e"]
    ] : JSON.parse(lk.getVal(userFollowSTKey))

async function all() {
    let cookie = lk.getVal(signHeaderKey)
    //校验cookie
    lk.log(cookie)
    lk.log(lk.getVal(userFollowSTKey))
    if (!cookie || isClearCookie || !userFollowSTKey) {
        lk.setValueForKey(signHeaderKey, ``)
        lk.msg(mainTitle, ``, isClearCookie ? `手动清除cookie` : `未获取到cookie或关注列表，请重新获取❌`)
        lk.done()
        return false
    }
    await signIn(); //签到
    await notify() //通知
}

all()

function signIn() {
    return new Promise(async (resolve, reject) => {
        for (var i in accounts) {
            let name = accounts[i][0]
            let super_id = accounts[i][1]
            await superTalkSignIn(i, name, super_id)
        }
        resolve()
    })
}

function superTalkSignIn(index, name, super_id) {
    return new Promise((resolve, reject) => {
        let super_url = {
            url: "https://weibo.com/p/aj/general/button?ajwvr=6&api=http://i.huati.weibo.com/aj/super/checkin&texta=%E7%AD%BE%E5%88%B0&textb=%E5%B7%B2%E7%AD%BE%E5%88%B0&status=0&id=" + super_id + "&location=page_100808_super_index&timezone=GMT+0800&lang=zh-cn&plat=MacIntel&ua=Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/13.0.4%20Safari/605.1.15&screen=375*812&__rnd=1576850070506",
            headers: {
                Cookie: lk.getVal(signHeaderKey),
                "User-Agent": userAgent
            }
        }
        lk.get(super_url, (error, response, data) => {
            lk.log(`\n${JSON.stringify(data)}`);
            try {
                if (error) {
                    notifyInfo += `【${name}】超话签到错误！-${error}`
                } else {
                    if (index > 0) {
                        notifyInfo += `\n`
                    }
                    if (index == 3) {
                        notifyInfo += `【左滑 '查看' 以显示签到详情】\n`
                    }
                    var obj = JSON.parse(data);
                    var code = obj.code;
                    var msg = obj.msg;
                    if (code == 100003) { // 行为异常，需要重新验证
                        notifyInfo += `【${name}】超话签到❕${msg}${obj.data.location}`
                    } else if (code == 100000) {
                        tipMessage = obj.data.tipMessage;
                        alert_title = obj.data.alert_title;
                        alert_subtitle = obj.data.alert_subtitle;
                        notifyInfo += `【${name}】超话签到成功🎉${alert_title}:${alert_subtitle}`
                    } else if (code == 382004) {
                        msg = msg.replace("(382004)", "")
                        notifyInfo += `【${name}】超话${msg} 🎉`
                    } else {
                        notifyInfo += `【${name}】超话签到${msg}`
                    }
                }
            } catch (e) {
                lk.log(`超话签到异常：${e}`)
                lk.msg(mainTitle, `签到失败，请查看【超话签到异常】日志，反馈给作者`)
            } finally {
                resolve()
            }
        })
    })
}

function notify() {
    return new Promise((resolve, reject) => {
        lk.msg(`微博超话签到结果`, ``, `${notifyInfo}`)
        lk.done()
        resolve()
    })
}

function nobyda() {
    const start = Date.now()
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const isJSBox = typeof $app != "undefined" && typeof $http != "undefined"
    const isNode = typeof require == "function" && !isJSBox;
    const node = (() => {
        if (isNode) {
            const request = require('request');
            return ({request})
        } else {
            return (null)
        }
    })()
    const msg = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
        if (isNode) log(title + subtitle + message)
        if (isJSBox) $push.schedule({
            title: title,
            body: subtitle ? subtitle + "\n" + message : message
        })
    }
    const setValueForKey = (key, value) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const getVal = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const adapterStatus = (response) => {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status
            } else if (response.statusCode) {
                response["status"] = response.statusCode
            }
        }
        return response
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = {
                url: options
            }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                callback(null, adapterStatus(response), response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, (error, response, body) => {
            callback(error, adapterStatus(response), body)
        })
        if (isNode) {
            node.request(options, (error, response, body) => {
                callback(error, adapterStatus(response), body)
            })
        }
        if (isJSBox) {
            if (typeof options == "string") options = {
                url: options
            }
            options["header"] = options["headers"]
            options["handler"] = function (resp) {
                let error = resp.error;
                if (error) error = JSON.stringify(resp.error)
                let body = resp.data;
                if (typeof body == "object") body = JSON.stringify(resp.data);
                callback(error, adapterStatus(resp.response), body)
            };
            $http.get(options);
        }
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = {
                url: options
            }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                callback(null, adapterStatus(response), response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) {
            $httpClient.post(options, (error, response, body) => {
                callback(error, adapterStatus(response), body)
            })
        }
        if (isNode) {
            node.request.post(options, (error, response, body) => {
                callback(error, adapterStatus(response), body)
            })
        }
        if (isJSBox) {
            if (typeof options == "string") options = {
                url: options
            }
            options["header"] = options["headers"]
            options["handler"] = function (resp) {
                let error = resp.error;
                if (error) error = JSON.stringify(resp.error)
                let body = resp.data;
                if (typeof body == "object") body = JSON.stringify(resp.data)
                callback(error, adapterStatus(resp.response), body)
            }
            $http.post(options);
        }
    }
    const log = (message) => {
        if (isEnableLog) console.log(`\n██${message}`)
    }
    const time = () => {
        const end = ((Date.now() - start) / 1000).toFixed(2)
        return console.log('\n签到用时: ' + end + ' 秒')
    }
    const done = (value = {}) => {
        if (isQuanX) isRequest ? $done(value) : null
        if (isSurge) isRequest ? $done(value) : $done()
    }
    return {isRequest, isJSBox, isNode, msg, setValueForKey, getVal, get, post, log, time, done}
}
