const CheckinURL = 'https://new.api.hdcj.9w9.com/api/sign/sign';
const DataURL = 'https://new.api.hdcj.9w9.com/api/sign/sign_data';
const TokenName = '活动签到';
const TokenKey = 'wclottery';
const RefererKey = 'ltyRKey';
const AgentKey = 'ltyAKey'
const BodyKey = 'ltyBKey'
const $cmp = compatibility();

if ($cmp.isRequest) {
    GetToken()
    $cmp.end()
} else {
    Checkin()
    $cmp.end()
}

function GetToken() {
    if ($request.headers['api-token']) {
        var TokenValue = $request.headers['api-token'];
        var RefererValue = $request.headers['Referer'];
        var AgentValue = $request.headers['User-Agent'];
        var BodyValue = $request.body;
        $cmp.write(RefererValue, RefererKey);
        $cmp.write(AgentValue, AgentKey)
        $cmp.write(BodyValue, BodyKey);
        if ($cmp.read(TokenKey) != (undefined || null)) {
            if ($cmp.read(TokenKey) != TokenValue) {
                var token = $cmp.write(TokenValue, TokenKey);
                if (!token) {
                    $cmp.notify("更新" + TokenName + " Token 失败‼️", "", "");
                } else {
                    $cmp.notify("更新" + TokenName + " Token 成功 🎉", "", "");
                }
            }
        } else {
            var token = $cmp.write(TokenValue, TokenKey);
            if (!token) {
                $cmp.notify("首次写入" + TokenName + " Token 失败‼️", "", "");
            } else {
                $cmp.notify("首次写入" + TokenName + " Token 成功 🎉", "", "");
            }
        }
    } else {
        $cmp.notify("写入" + TokenName + "Token 失败‼️", "", "配置错误, 无法读取请求头, ");
    }
}

function Checkin() {
    const headersCommon = {
        "Accept": "application/vnd.lumen.v2+json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-us",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Length": "100",
        "Content-Type": "application/json",
        "Cotent-Type": "application/json",
        "Host": "new.api.hdcj.9w9.com",
        "Referer": $cmp.read("ltyRKey"),
        "User-Agent": $cmp.read("ltyAKey"),
        "api-token": $cmp.read("wclottery"),
        "app-version": "3.4.1",
    }
    const LotteryCheckin = {
        url: CheckinURL,
        headers: headersCommon,
        body: $cmp.read("ltyBKey")
    };
    const LotteryData = {
        url: DataURL,
        headers: headersCommon,
        body: $cmp.read("ltyBKey")
    };
    $cmp.post(LotteryCheckin, function(error, response, data) {
        if (!error) {
            if (obj1.result == "success") {
                $cmp.post(LotteryData, function (error, response, data) {
                    let obj2 = JSON.parse(data)
                    let days = obj2.result.cycle;
                    let luckcoin = obj2.result.sign_lucky[days - 1];
                    let allluckcoin = obj2.result.lucky_count;
                    let luckmoney = obj2.result.money
                    let msg1 = "签到获得 " + luckcoin + " 币，共有 " + allluckcoin + " 币及 " + luckmoney + " 元。💰";
                    $cmp.notify("活动签到 - 签到成功！🎉", "", msg1)
                })
            } else if (obj1.result == "今天已签到过了~") {
                $cmp.post(LotteryData, function (error, response, data) {
                    let obj2 = JSON.parse(data)
                    let days = obj2.result.cycle;
                    let luckcoin = obj2.result.sign_lucky[days - 1];
                    let allluckcoin = obj2.result.lucky_count;
                    let luckmoney = obj2.result.money
                    let msg2 = "今日获得 " + luckcoin + " 币，共有 " + allluckcoin + " 币及 " + luckmoney + " 元。💰"
                    $cmp.notify("活动签到 - 重复签到！😊", "", msg2)
                })
            } else if (obj1.code == 30001) {
                $cmp.notify("活动签到 - Token 失效❗️", "", obj1.error)
            } else {
                console.log("wclottery failed response : \n" + data)
                $cmp.notify("活动签到 - 签到失败‼️", "", data)
            }
        } else {
            $cmp.notify("活动签到 - 签到接口请求失败", "", error)
        }
    })
}

function compatibility() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, post, end }
};
