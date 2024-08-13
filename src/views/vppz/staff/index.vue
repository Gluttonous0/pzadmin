<template>
  <div class="group-container">
    <PanelHead>
      <template #header>{{ route.meta.name }}</template>
      <template #content>{{ route.meta.describe }}</template>
    </PanelHead>
    <div class="group-content">
      <el-button type="primary" @click="visible = true">
        <el-icon><Plus /></el-icon>新增
      </el-button>
      <el-button type="danger">
        <el-icon><Delete /></el-icon>删除
      </el-button>

      <!-- dialog弹窗start -->
      <el-dialog v-model="visible" title="陪护师添加" width="500" @close="closeVisible(instanceForm)">
        <el-form ref="instanceForm" :rules="rules" :model="form" label-width="100px" label-position="left">
          <el-form-item prop="id" v-show="false">
            <el-input v-model="form.id" />
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="form.name" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-image v-if="form.avatar" v-model="form.avatar" :src="form.avatar" />
            <el-button type="primary" v-else>
              <el-icon><Plus /></el-icon>上传照片
            </el-button>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择名称">
              <el-option key="1" label="男" value="1" />
              <el-option key="2" label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input-number v-model="form.age" placeholder="请输入年龄" />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请填写手机号" />
          </el-form-item>
          <el-form-item label="是否起效" prop="active">
            <el-radio-group v-model="form.active">
              <el-radio :value="0">失效</el-radio>
              <el-radio :value="1">起效</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="$emit('visibleChange', closeVisible(instanceForm))">取消</el-button>
            <el-button type="primary" @click="innerVisible(instanceForm)">确定</el-button>
          </div>
        </template>
      </el-dialog>
      <!-- dialog弹窗end -->

      <!-- dialog选择图片弹窗start -->
      <!-- dialog选择图片弹窗end -->

      <!-- table列表start -->
      <el-table :data="tableData.list" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="name" label="昵称" width="100" />
        <el-table-column prop="avatar" label="头像" width="100">
          <template #default="scope"> </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100">
          <template #default="scope"> </template>
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
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scoped">
            <el-button link type="primary" @click="">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  import api from '../../../api/staffApi'
  import { onMounted, reactive, ref } from 'vue'
  import { Pagination, Staff } from '../../../types/api'
  import { FormInstance, FormRules } from 'element-plus'

  onMounted(() => {
    getStaffList()
  })

  //获取当前路由
  const route = useRoute()

  //获取陪护师列表数据
  const getStaffList = async () => {
    const data = await api.getStaffList(page)
    tableData.list = data.list
    tableData.total = data.total
  }

  //dialog弹窗---------------------------
  //弹窗开关状态
  const visible = ref(false)

  //表单form数据
  const form = reactive({
    id: '',
    name: '',
    mobile: '',
    avatar: '',
    sex: '',
    age: 1,
    active: 1
  })
  //创建表单实例
  const instanceForm = ref<FormInstance>()

  //表单校验规则
  const rules = reactive<FormRules>({
    name: [{ required: true, trigger: 'blur', message: '请输入权限名称' }]
  })

  //提交表单
  const innerVisible = (formEl?: FormInstance) => {}

  //关闭弹窗
  const closeVisible = (formEl?: FormInstance) => {
    if (!formEl) return
    formEl.resetFields()
    visible.value = false
  }

  //table列表----------------------------
  //table列表数据
  const tableData = reactive({
    list: <Staff.Params[]>[],
    total: 0
  })

  //Pagination分页-----------------------
  //分页设置
  const page = reactive<Pagination>({
    pageNum: 1,
    pageSize: 10
  })
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
