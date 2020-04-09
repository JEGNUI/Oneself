/*
Weibo Super Talk Check in
https://nave.work/微博超话自动签到脚本.html
Made by NavePnow

[task_local]
0 12 * * * checkin_qx.js
https:\/\/weibo\.com\/p\/aj\/general\/button\?ajwvr=6&api=http:\/\/i\.huati\.weibo\.com\/aj\/super\/checkin url script-response-body get_cookie_qx.js

MITM = weibo.com
*/
var accounts = [
    ["犬角夫", "100808cb3981384f0518c1f8b4375263c755e2"],
    ["司法考试", "100808eda03d1322c0b5855da393bffc759f5e"],
    ["知恩老婆", "1008083962f6e275b6f6a846d5d012ba84a5f2"],
    ["张大仙", "10080864be35849c64be48713285e01276746a"],
    ["IU", "100808d4151ccebfbae55e8f7c0f68f6d18e4d"],
    ["超越妹妹", "1008082a98366b6a3546bd16e9da0571e34b84"],

]
function launch() {
    for (var i in accounts) {
        let name = accounts[i][0]
        let super_id = accounts[i][1]
        weibo_super(name, super_id)
    }
    //$done();
}

launch()

function weibo_super(name, super_id) {
    //$notification.post(name + "的微博超话签到", super_id, "")
    let super_url = {
        url: "https://weibo.com/p/aj/general/button?ajwvr=6&api=http://i.huati.weibo.com/aj/super/checkin&texta=%E7%AD%BE%E5%88%B0&textb=%E5%B7%B2%E7%AD%BE%E5%88%B0&status=0&id=" + super_id + "&location=page_100808_super_index&timezone=GMT+0800&lang=zh-cn&plat=MacIntel&ua=Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/13.0.4%20Safari/605.1.15&screen=375*812&__rnd=1576850070506",
        headers: {        
            Cookie: $prefs.valueForKey("super_cookie"),
            }
    };

    $task.fetch(super_url).then(response => {
            var obj = JSON.parse(response.body);
            //console.log(obj);
            var code = obj.code;
            var msg = obj.msg;
            //console.log(msg);
            if (code == 100003) {   // 行为异常，需要重新验证
                //console.log("Cookie error response: \n" + data)
                $notify(name + "的微博超话签到", "❕" + msg, obj.data.location)
            } else if (code == 100000) {
                tipMessage = obj.data.tipMessage;
                alert_title = obj.data.alert_title;
                alert_subtitle = obj.data.alert_subtitle;
                $notify(name + "的微博超话签到", "签到成功" + " 🎉", alert_title + "\n" + alert_subtitle)

            } else if (code == 382004){
                msg = msg.replace("(382004)", "")
                $notify(name + "的微博超话签到", "", msg + " 🎉")
            } else{
                $notify(name + "的微博超话签到", "", msg)
            }

        }, reason => {
    //$notify("京东签到错误‼️‼️", "", reason.error);
        $notify(name + "的微博超话签到错误！", "", reason.error)
  });
}
