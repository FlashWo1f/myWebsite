export function getServerTime() {
	let req = new XMLHttpRequest()
  req.open('GET', '', false)
  req.send(null)
  return new Date(req.getResponseHeader('Date')) * 1
}

function padStart(str) {
  str += "";
  return str.padStart(2, 0);
}

export function handleGetTimeBetween(time1, time2, symbol) {
  const diffTime = (time2 - time1) / 1000;
  if (diffTime < 0) return symbol ? `00 : 00` : "0分钟0秒";
  return handleTransformTimeDiff(diffTime, symbol)
}

export function handleTransformTimeDiff(diffTime, symbol) {
  const mintus = padStart(Math.floor(diffTime / 60));
  const second = padStart(Math.floor(diffTime - mintus * 60));
  return symbol ? `${mintus} : ${second}` : `${mintus}分钟${second}秒`;
}