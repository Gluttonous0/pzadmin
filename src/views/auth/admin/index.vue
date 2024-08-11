<template>
  <div class="group-container">
    <PanelHead>
      <template #header>账号管理</template>
      <template #content>管理员可以进行编辑，权限修改后需要登出才会生效</template>
    </PanelHead>
    <div class="group-content">
      <!-- <el-button type="primary" @click="visible = true">+增加</el-button> -->

      <!-- dialog弹窗start -->
      <el-dialog v-model="visible" title="编辑用户" width="500" @close="closeVisible()">
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
      </el-dialog>
      <!-- dialog弹窗end -->

      <!-- table列表start -->
      <el-table :data="tableData.list" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="name" label="昵称" width="180" />
        <el-table-column prop="permissions_id" label="所属组别" width="180">
          <template #default="scope">
            {{ adminName(scope.row.permissions_id) }}
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
            <el-button link type="primary" @click="handleVisible(scoped.row)">编辑</el-button>
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
  import { Pagination, User } from '../../../types/api'
  import api from '../../../api/userApi'
  import { formatData } from '../../../utils'
  import { FormInstance, FormRules } from 'element-plus'

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

  //获取权限列表
  const getSelectAdmin = async () => {
    admins.value = await api.getSelectAdmin()
  }

  const admins = ref<User.UserSelect[]>()

  //角色身份转换方法
  const adminName = (scope: any) => {
    if (!scope) return
    debugger
    return admins.value?.filter(item => item.id === scope)[0].name
  }

  //table-------------
  //表单列表
  const tableData = reactive({
    list: <User.Params[]>[],
    total: <number>0
  })

  //pagination-------------
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

  //dialog-------------
  //弹窗开关
  const visible = ref(false)

  //打开弹窗
  const handleVisible = (val: User.Params) => {
    visible.value = true
    console.log(val)
    nextTick(() => {
      Object.assign(form, { id: val.id, name: val.name, mobile: val.mobile, permissions_id: val.permissions_id })
    })
  }

  //form表单
  const form = reactive({
    mobile: '',
    name: '',
    permissions_id: 0,
    id: ''
  })

  //关闭弹窗
  const closeVisible = (formEl?: FormInstance) => {
    visible.value = false
    if (!formEl) return
    formEl.resetFields()
  }

  //创建表单实例
  const instanceForm = ref<FormInstance>()

  //表单校验规则
  const rules = reactive<FormRules>({
    name: [{ required: true, trigger: 'blur', message: '请输入权限名称' }],
    permissions_id: [{ required: true, trigger: 'blur', message: '请输入选择权限' }]
  })

  //提交表单
  const innerVisible = async (formEl?: FormInstance) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        const { name, permissions_id } = form
        api.updateAdmin({ name, permissions_id }).then(() => {
          ElMessage.success('操作成功')
          closeVisible()
          getAdminList()
        })
      } else {
        console.log(fields)
      }
    })
  }

  // //表单权限列表
  // const permissionsList = ref<Menu.MenuSelectItem[]>([])

  // //获取树形表单实例
  // const treeRef = ref()

  // const defaultKeys = [4, 5]

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
