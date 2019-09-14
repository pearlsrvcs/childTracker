export default getCurrentDateTime = () => {
  const date = new Date();
  const d = date.getDate();
  let m = date.getMonth() + 1;
  if (m < 10){
    m = '0' + m
  }
  let h = date.getHours()
  if (h < 10){
    h = '0' + h
  }
  let min = date.getMinutes()
  if (min < 10){
    min = '0' + min
  }
  const y = date.getFullYear();
  NOTIFICATIONDATE = y +'-'+ m + '-' + d + " " + h + ":" + min
  return NOTIFICATIONDATE
}