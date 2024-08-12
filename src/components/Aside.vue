<template>
  <el-menu
    :style="{ width: iscollapse ? '64px' : '230px' }"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="aside-container"
    :default-active="active"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="iscollapse"
  >
    <p class="aside-title">{{ iscollapse ? 'DIDI' : 'DIDI陪诊' }}</p>
    <TreeMenu :index="1" :menuData="asideTree" />
  </el-menu>
</template>

<script setup lang="ts">
  export interface asideTrees {
    name?: string
    children?: []
    path: string
    component: any
    meta: {
      describe: string
      icon: string
      id: string
      path: string
      name: string
    }
  }

  import TreeMenu from './TreeMenu.vue'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const handleOpen = () => {}
  const handleClose = () => {}

  //获取vuex值
  const store = useStore()
  const asideTree = computed(() => store.state.menu.routeList)
  const iscollapse = computed(() => {
    return store.state.menu.isCollapse
  })

  const active = computed(() => store.state.menu.asideIndex)
</script>

<style scoped lang="less">
  .aside-container {
    height: 100vh;
    .aside-title {
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      color: #fff;
    }
  }
</style>
