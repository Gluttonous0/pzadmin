/**
 * 浏览器缓存
 */

const store = {
  //储存缓存
  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  //获取缓存
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) {
      return
    }
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },

  //删除缓存
  remove(key: string) {
    localStorage.removeItem(key)
  },
  /**
   * 清空所有
   */
  clear() {
    localStorage.clear()
  }
}

export default store
