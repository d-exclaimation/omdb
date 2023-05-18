export function datestring(date: Date) {
  const fulldate = `${numeric(date.getFullYear())}-${numeric(
    date.getMonth() + 1
  )}-${numeric(date.getDate())}`;
  const time = `${numeric(date.getHours())}:${numeric(
    date.getMinutes()
  )}:${numeric(date.getSeconds())}`;
  return `${fulldate} ${time}`;
}

export function numeric(num: number) {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}
