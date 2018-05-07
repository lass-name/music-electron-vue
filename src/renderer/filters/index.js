import dayjs from 'dayjs'

export function m (value, format) {
  return (value && dayjs(value).format(format)) || ''
}
function padLeft (value, len = 2, fillValue = '0') {
  return String.prototype.padStart.apply(value, [len, fillValue])
}
export function duration (val) {
  return `${padLeft(~~(+val / 60000))}:${padLeft(~~((+val / 1000) % 60))}`
}
