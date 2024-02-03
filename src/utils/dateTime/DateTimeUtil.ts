/**
 * Date对象转换为yyyy-MM-dd HH:mm:ss
 * @param date
 */
export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


/**
 * 时间戳转换为yyyy-MM-dd HH:mm:ss
 * @param timestamp
 */
export function timestampToDateTime(timestamp: number | undefined) {
  let date = new Date(<number>timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  return formatDate(date);
}
