const request = require('request');
const fs = require('fs');
const getTimeList = require('./renderTimeList')
const { startTime, endTime } = require('./config')

const date = getTimeList(startTime, endTime) // 生成区间
const res = [] // 有效优惠券地址保存

for( let i = 0;i<date.length;i++) {
    request({
        url: `https://mkt.luckincoffee.com/resource/m/promo/activity/judgeCode?params={invitationCode: "MK${date[i]}001"}`,   // 请求的URL
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if(JSON.parse(body).status === 'SUCCESS') {
                res.push(`${JSON.parse(body).content.proposalName} | https://mkt.luckincoffee.com/coupon/nasdaq?invitationCode=MK${date[i]}001`)
                fs.writeFile("coupons.txt", res.join('\n'), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
        }
    });
}

