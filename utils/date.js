const getThisYearProgress = () => {
  const currentDate = new Date();
  const thisYear = new Date(currentDate.getFullYear(), 0, 1);
  const nextYear = new Date(currentDate.getFullYear() + 1, 0, 1, 0, 0, 0);
  return JSON.stringify({
    name: currentDate.getFullYear() + '进度',
    startTime: formatDate(thisYear) + '',
    endTime: formatDate(nextYear) + ''
  });
}

const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getTime = dateStr => {
  const s = String(dateStr);
  const ymd = s.split('-')
  const d = new Date(ymd[0], ymd[1] - 1, ymd[2], 0, 0, 0);
  return d.getTime();
}

module.exports = {
  getThisYearProgress: getThisYearProgress,
  getTime: getTime,
}