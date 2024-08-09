<template>
  <div class="group-header">
    <h3><slot name="header">菜单管理</slot></h3>
    <p><slot name="content">菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取</slot></p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .group-header {
    font-size: 12px;
    padding: 10px;
    background-color: #c9cdd0;
    border-radius: 5px;
  }
</style>
