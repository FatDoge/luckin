const request = require('request-promise');
const fs = require('fs');
const getTimeList = require('./renderTimeList')
const { startTime, endTime } = require('./config')

const date = getTimeList(startTime, endTime) // 生成区间
const taskList = [] // 异步任务队列
const res = [] // 有效优惠券地址保存

for( let i = 0;i<date.length;i++) {
  const promiseCase = request({
    url: `https://mkt.luckincoffee.com/resource/m/promo/activity/judgeCode?params={invitationCode: "MK${date[i]}001"}`,   // 请求的URL
    json: true,
  })
  .then(response => {
    if(response.status === 'SUCCESS') {
      res.push(`${response.content.proposalName} | https://mkt.luckincoffee.com/coupon/nasdaq?invitationCode=MK${date[i]}001`)
    }
  });
  taskList.push(promiseCase)
}

Promise.all(taskList).then( () => {
  fs.writeFile("coupons.txt", res.join('\n'), function (err) {
    if (err) {
      return console.log(err);
    }
  });
})

