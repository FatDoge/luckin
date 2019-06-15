const getTimeList = (start, end) => {
    let st = start.split('-');
    let et = end.split('-');
    const res = []
    let startTime = new Date(st[0], st[1] - 1, st[2]).getTime();
    let endTime = new Date(et[0], et[1] - 1, et[2]).getTime();
    for (let i = startTime; i <= endTime;) {
        res.push(formatTime(i, ''));
        i += 24 * 60 * 60 * 1000;
    }
    return res;
}

const formatTime = (time, spliter = '-') => {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    return `${year}${spliter}${month}${spliter}${day}`
}

module.exports = getTimeList;
