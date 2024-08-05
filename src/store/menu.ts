import { asideTrees } from '../components/Aside.vue'

interface stateProps {
  isCollapse: boolean
  selectMenu: asideTrees[]
}

const state: stateProps = {
  isCollapse: false,
  selectMenu: []
}

const mutations = {
  collapseMenu(state: stateProps) {
    state.isCollapse = !state.isCollapse
  },
  addTabMenu(state: stateProps, item: asideTrees) {
    if (state.selectMenu.findIndex(items => items.path === item.path) === -1) {
      state.selectMenu.push(item)
    }
  },
  closeTab(state: stateProps, item: asideTrees) {
    console.log(item)
    const index = state.selectMenu.findIndex(items => items.name === item.name)
    state.selectMenu.splice(index, 1)
  }
}

export default {
  state,
  mutations
}
