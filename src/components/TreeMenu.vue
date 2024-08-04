<template>
  <template v-for="(item, index) in props.menuData">
    <el-menu-item
      @click="handleChick(item, `${props.index}-${item.meta.id}`)"
      v-if="!item.children || item.children.lenght == 0"
      :index="`${props.index}-${item.meta.id}`"
    >
      <el-icon size="20"><component :is="item.meta.icon"></component></el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>

    <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
      <template #title>
        <el-icon size="20"><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <TreeMenu :index="`${props.index}-${item.meta.id}`" :menuData="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { asideTrees } from './Aside.vue'
import { useStore } from 'vuex'

const props = defineProps(['menuData', 'index'])
const router = useRouter()
const store = useStore()
//点击跳转菜单
const handleChick = (item: asideTrees, active: string) => {
  console.log()
  store.commit('addTabMenu', item.meta)
  router.push(item.meta.path)
}
</script>
