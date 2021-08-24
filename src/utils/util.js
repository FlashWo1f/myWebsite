import { message } from "ant-design-vue";

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

export function generateID() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

export function showMessage(type, content) {
  message[type](content);
}
