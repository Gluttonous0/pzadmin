import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import menu from './menu'

export default createStore({
  plugins: [
    createPersistedstate({
      key: 'menuAside'
    })
  ],
  modules: { menu }
})
