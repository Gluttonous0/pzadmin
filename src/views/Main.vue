<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <!-- <el-header></el-header> -->
        <NavHearder />
        <RouterView />
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from '../components/Aside.vue'
import NavHearder from '../components/NavHearder.vue'
</script>
