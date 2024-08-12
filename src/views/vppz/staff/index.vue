<template>
  <div class="group-container">
    <PanelHead>
      <template #header>{{ route.meta.name }}</template>
      <template #content>{{ route.meta.describe }}</template>
    </PanelHead>
    <div class="group-content">
      <!-- <el-button type="primary" @click="visible = true">+增加</el-button> -->

      <!-- dialog弹窗start -->
      <!-- <el-dialog v-model="visible" title="编辑用户" width="500" @close="closeVisible()">
        <el-form ref="instanceForm" :rules="rules" :model="form" label-width="100px" label-position="left">
          <el-form-item prop="id" v-show="false">
            <el-input v-model="form.id" />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请填写手机号" disabled />
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="form.name" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="菜单权限" prop="permissions_id">
            <el-select v-model="form.permissions_id" :placeholder="adminName(form.permissions_id)">
              <el-option v-for="item in admins" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="$emit('visibleChange', closeVisible())">取消</el-button>
            <el-button type="primary" @click="innerVisible(instanceForm)">确定</el-button>
          </div>
        </template>
      </el-dialog> -->
      <!-- dialog弹窗end -->

      <!-- table列表start -->
      <!-- <el-table :data="tableData.list" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="name" label="昵称" width="100" />
        <el-table-column prop="permissions_id" label="所属组别" width="100">
          <template #default="scope">
            {{ adminName(scope.row.permissions_id) }}
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="130" />
        <el-table-column prop="active" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.active === 1 ? 'success' : 'danger'">{{
              scope.row.active === 1 ? '正常' : '停用'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template #default="scope">
            <el-icon><timer /></el-icon>
            {{ formatData(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scoped">
            <el-button link type="primary" @click="handleVisible(scoped.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <!-- table列表end -->

      <!-- page翻页start -->
      <!-- <div style="padding: 10px 25px">
        <el-pagination
          v-model:currentPage="page.pageNum"
          :page-size="page.pageSize"
          background
          layout="prev, pager, next"
          :total="tableData.total"
          class="mt-4"
          style="justify-content: right"
          @current-change="handleCurrentChange"
        />
      </div> -->
      <!-- page翻页end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  //获取当前路由
  const route = useRoute()
</script>

<style lang="less" scoped>
  .group-container {
    margin: 10px;
    .group-content {
      padding: 10px;
      background-color: #fff;
    }
  }
</style>
