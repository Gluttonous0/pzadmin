<template>
  <div class="nav-header">
    <div class="nav-left flex-box">
      <el-icon class="icon" size="20" @click="store.commit('collapseMenu')"><Fold /></el-icon>
      <ul class="flex-box" :style="{ height: '100%' }">
        <li
          class="tab flex-box"
          v-for="(item, index) in selectMenu"
          :key="item.path"
          :class="{ selected: route.path === item.path }"
        >
          <router-link class="text" :to="{ path: item.path }">
            <el-icon size="12"><component :is="item.icon" /></el-icon>{{ item.name }}
          </router-link>
          <el-icon @click="closeTab(item, index)" class="icon-close" size="12"><Close /></el-icon>
        </li>
      </ul>
    </div>
    <div class="nav-right">
      <el-dropdown>
        <div class="el-dropdown-link flex-box">
          <el-avatar
            :src="userInfo.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
            class="nav-avatar"
          />
          <p style="margin: 0 10px">{{ userInfo.name || 'Admin' }}</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exitLogin">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { asideTrees } from './Aside.vue'
  import { default as stores } from '../utils/stroage.ts'

  //获取路由实例
  const route = useRoute()
  const router = useRouter()

  //获取store实例
  const store = useStore()
  const selectMenu = computed(() => {
    return store.state.menu.selectMenu
  })

  //获取用户登录信息缓存
  const userInfo = stores.get('userInfo')

  //点击关闭tab
  const closeTab = (item: asideTrees, index: number) => {
    store.commit('closeTab', item)
    //非当前页面tag
    if (item.path !== route.path) {
      return
    }

    //删除最后一项
    const selectMenuData = selectMenu.value
    if (index === selectMenuData.length) {
      //tag只有一个
      console.log(selectMenuData)
      if (!selectMenuData.length) {
        router.push('/')
      } else {
        router.push({ path: selectMenuData[index - 1].path })
      }
    } else {
      router.push({ path: selectMenuData[index].path })
    }
  }

  //退出登录跳转
  const exitLogin = () => {
    stores.remove('token')
    stores.remove('userInfo')
    stores.remove('menuAside')
    router.push('/login')
  }
</script>

<style scoped lang="less">
  .flex-box {
    display: flex;
    align-items: center;
  }
  .nav-header {
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .nav-left {
      height: 100%;
      cursor: pointer;
      .icon {
        width: 45px;
        height: 100%;
      }
      .icon:hover {
        background-color: #ccc;
      }
      .tab {
        padding: 0 10px;
        height: 100%;
        .icon-close {
          width: 30px;
          height: 100%;
        }
        .text {
          margin: 0 5px;
          color: #000;
        }
        &.selected {
          a {
            color: #409eff;
          }
          i {
            color: #409eff;
          }
          background-color: #f5f5f5;
        }
      }
      .tab:hover {
        background-color: #ccc;
      }
    }

    .nav-right {
      display: flex;
      .nav-admin {
        display: inline-block;
        line-height: 45px;
      }
      .nav-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
</style>
