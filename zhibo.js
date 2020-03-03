/*
小米粒直播, 优乐美直播, 彩色直播,
收费房解锁三合一脚本
彩色邀请码: 9NS2W
QX:
^https?:\/\/(.+)\.(\w{2,3})(:?\d*)\/(api\/public\/\?service=Live\.checkLive$|public\/\/\?service=Live\.roomCharge$|lg\/video\/loadVideoFees\.do$) url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/zhibo.js

MITM = app101.avictown.cc, api.hlo.xyz, api.ijo.xyz, 
*/

let obj = JSON.parse($response.body);
let url = $request.url;

const ylm = '/api/public/?service=Live.checkLive';
const xml = '/api/public//?service=Live.roomCharge';
const cs = '/lg/video/loadVideoFees.do';

if (url.indexOf(ylm) != -1) {
obj.data.info[0].type = "0";
}
if (url.indexOf(xml) != -1) {
obj.data.code = 0;
}
if (url.indexOf(cs) != -1) {
obj.body.videoModel.fees = 1;
}
$done({body: JSON.stringify(obj)});
