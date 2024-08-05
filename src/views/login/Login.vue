<template>
  <el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <img :src="loginImg" alt="" />
        </div>
      </template>
    </el-card>
  </el-row>
</template>
<script setup lang="ts">
const loginImg = new URL(`../../../public/login-head.png`, import.meta.url).href
</script>

<style lang="less" scoped>
:deep(.el-card__header) {
  padding: 0;
}
.login-container {
  height: 100%;
  .card-header {
    background-color: #899fe1;
    img {
      width: 430px;
    }
  }
  .jump-link {
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>
