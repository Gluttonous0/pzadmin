<template>
  <div class="group-container">
    <PanelHead>
      <template #header>账号管理</template>
      <template #content>管理员可以进行编辑，权限修改后需要登出才会生效</template>
    </PanelHead>
    <div class="group-content">
      <!-- <el-button type="primary" @click="visible = true">+增加</el-button> -->
      <!-- dialog弹窗start -->
      <!-- <el-dialog v-model="visible" title="添加权限" width="500" @close="closeVisible(instanceForm)">
        <el-form ref="instanceForm" :rules="rules" :model="form" label-width="100px" label-position="left">
          <el-form-item prop="id" v-show="false">
            <el-input v-model="form.id" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请填写权限名称" />
          </el-form-item>
          <el-form-item label="权限" prop="permissions">
            <el-tree
              ref="treeRef"
              :data="permissionsList"
              show-checkbox
              node-key="id"
              style="max-width: 600px"
              :default-checked-keys="defaultKeys"
              :default-expanded-keys="[2]"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="$emit('visibleChange', closeVisible(instanceForm))">取消</el-button>
            <el-button type="primary" @click="innerVisible(instanceForm)">确定</el-button>
          </div>
        </template>
      </el-dialog> -->
      <!-- dialog弹窗end -->

      <!-- table列表start -->
      <el-table :data="tableData.list" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="name" label="昵称" width="180" />
        <el-table-column prop="permissions_id" label="所属组别">
          <template #default="scope">
            {{ admins?.filter(item => item.id === scope.row.permissions_id)[0].name }}
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="180" />
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
        <el-table-column label="操作" width="180">
          <template #default="scoped">
            <el-button link type="primary">编辑</el-button>
            <!-- @click="handleClick(scoped.row)" -->
          </template>
        </el-table-column>
      </el-table>
      <!-- table列表end -->

      <!-- page翻页start -->
      <div style="padding: 10px 25px">
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
      </div>
      <!-- page翻页end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, reactive, ref } from 'vue'
  import { Menu, Pagination, User } from '../../../types/api'
  import api from '../../../api/userApi'
  import { formatData } from '../../../utils'

  onMounted(() => {
    getAdminList()
    getSelectAdmin()
  })

  //获取账号列表
  const getAdminList = async () => {
    const data = await api.getAdminList(page)
    tableData.list = data.list
    tableData.total = data.total
  }
  const tableData = reactive({
    list: <User.Params[]>[],
    total: <number>0
  })

  //获取权限列表
  const getSelectAdmin = async () => {
    admins.value = await api.getSelectAdmin()
  }
  const admins = ref<User.UserSelect[]>()

  //pagination
  //page分页默认设置
  const page = reactive<Pagination>({
    pageNum: 1,
    pageSize: 10
  })

  //分页提交功能
  const handleCurrentChange = (val: any) => {
    page.pageNum = val
    getAdminList()
  }

  // //新增弹窗开关
  // const visible = ref(false)

  // //表单form数据
  // const form = reactive({
  //   name: '',
  //   permissions: '',
  //   id: ''
  // })
  // //创建表单实例
  // const instanceForm = ref<FormInstance>()
  // //表单校验规则
  // const rules = reactive<FormRules>({
  //   name: [{ required: true, trigger: 'blur', message: '请输入权限名称' }]
  // })

  // //表单权限列表
  // const permissionsList = ref<Menu.MenuSelectItem[]>([])

  // //获取树形表单实例
  // const treeRef = ref()

  // const defaultKeys = [4, 5]

  // //关闭弹窗
  // const closeVisible = (formEl?: FormInstance) => {
  //   if (!formEl) return
  //   visible.value = false
  //   formEl.resetFields()
  //   treeRef.value.setCheckedKeys(defaultKeys)
  // }

  // //提交表单
  // const innerVisible = async (formEl?: FormInstance) => {
  //   if (!formEl) return
  //   await formEl.validate((valid, fields) => {
  //     if (valid) {
  //       const permissionsMenu = JSON.stringify(treeRef.value.getCheckedKeys())
  //     } else {
  //       console.log(fields)
  //     }
  //   })
  // }

  // //编辑表单
  // const handleClick = (data: any) => {
  //   console.log(data)
  //   visible.value = true
  //   nextTick(() => {
  //     Object.assign(form, { id: data.id, name: data.name })
  //     treeRef.value.setCheckedKeys(data.permission)
  //   })
  // }
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
