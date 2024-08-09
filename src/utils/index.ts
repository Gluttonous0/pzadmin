/**
 * 工具类
 */

//时间戳恢复
//1722930765000
import { format } from 'date-fns'
export const formatData = (timestamp: number | string) => {
  const date = new Date(timestamp)
  return format(date, 'yyyy-MM-dd HH:mm:ss')
}
