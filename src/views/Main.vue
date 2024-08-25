<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container class="body-layout">
        <!-- <el-header></el-header> -->
        <NavHearder />
        <RouterView />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import Aside from '../components/Aside.vue'
  import NavHearder from '../components/NavHearder.vue'
</script>
<style lang="less" scoped>
  .body-layout {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 40px);
  }
</style>
