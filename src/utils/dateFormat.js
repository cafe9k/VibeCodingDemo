import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
dayjs.extend(duration)

export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format)
}

export const formatDateTime = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export const formatTime = (date) => {
  return dayjs(date).format('HH:mm')
}

export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}小时${mins}分钟`
}

export const getWeekday = (date) => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekdays[dayjs(date).day()]
}

export const isToday = (date) => {
  return dayjs(date).isSame(dayjs(), 'day')
}

export const isTomorrow = (date) => {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day')
}

export default dayjs

