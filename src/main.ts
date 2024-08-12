import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import store from './store/index.ts'
import { default as stores } from './utils/stroage.ts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import PanelHead from './components/PanelHead.vue'

const menuAside = stores.get('menuAside')
if (menuAside) {
  store.commit('updateRouteList', menuAside.menu.routeList)
  const states = store.state as any
  states.menu.routeList.forEach((item: any) => {
    router.addRoute('main', item)
  })
}

router.beforeEach((to, from) => {
  const token = stores.get('token')

  //非登录页面判断
  if (!token && to.path !== '/login') {
    if (from.name) {
      ElMessage.error('登录过期,请重新登陆')
    }
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

app.component('PanelHead', PanelHead)

//路由挂载
app.use(router)
//vuex挂载
app.use(store)

app.mount('#app')
