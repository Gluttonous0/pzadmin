import { asideTrees } from '../components/Aside.vue'
import { Menu } from '../types/api'
import store from '../utils/stroage'

export interface stateProps {
  isCollapse: boolean
  selectMenu: asideTrees[]
  routeList: Menu.PermissionParams[]
  asideIndex: string
}

const menuAside = store.get('menuAside')
const state: stateProps = menuAside
  ? menuAside.menu
  : {
      isCollapse: false,
      selectMenu: [],
      routeList: [],
      asideIndex: '1-1'
    }

const mutations = {
  //展开隐藏侧边栏操作
  collapseMenu(state: stateProps) {
    state.isCollapse = !state.isCollapse
  },
  //增加面包屑操作
  addTabMenu(state: stateProps, item: asideTrees) {
    if (state.selectMenu.findIndex(items => items.path === item.path) === -1) {
      state.selectMenu.push(item)
    }
  },
  //关闭面包屑操作
  closeTab(state: stateProps, item: asideTrees) {
    const index = state.selectMenu.findIndex(items => items.name === item.name)
    state.selectMenu.splice(index, 1)
  },
  //路由动态加载
  updateRouteList(state: stateProps, route: Menu.PermissionParams[]) {
    const module = import.meta.glob('../views/**/**/*.vue')
    const routeSet = (router: Menu.PermissionParams[]) => {
      router.forEach((item: any) => {
        if (!item.children) {
          const url = `../views${item.meta.path}/index.vue`
          module[url]
          item.component = module[url]
        } else {
          routeSet(item.children)
        }
      })
    }
    routeSet(route)
    state.routeList = route
  },
  //侧边栏高亮
  updateAsideIndex(state: stateProps, index: string) {
    state.asideIndex = index
  }
}

export default {
  state,
  mutations
}
