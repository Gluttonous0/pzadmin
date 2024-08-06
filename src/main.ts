import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import store from './store'
import { default as stores } from './utils/stroage.ts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

router.beforeEach(to => {
  const token = stores.get('token')
  //非登录页面判断
  if (!token && to.path !== '/login') {
    return '/login'
  } else if (token && to.path === '/login') {
    return '/'
  } else {
    return true
  }
})

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//路由挂载
app.use(router)
//vuex挂载
app.use(store)

app.mount('#app')
