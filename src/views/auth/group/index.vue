<template>
  <div class="group-container">
    <div class="group-header">
      <h3>菜单管理</h3>
      <p>菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取</p>
    </div>
    <div class="group-content">
      <el-button type="primary" @click="visible = true">+增加</el-button>
      <el-dialog v-model="visible" title="添加权限" width="500" @close="closeVisible(instanceForm)">
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
      </el-dialog>
      <el-table :data="tableData.list" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="name" label="昵称" width="180" />
        <el-table-column prop="permissionName" label="菜单权限" />
        <el-table-column label="操作" width="180">
          <template #default="scoped">
            <el-button link type="primary" @click="handleClick(scoped.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, reactive, ref } from 'vue'
  import { Menu, Pagination } from '../../../types/api'
  import api from '../../../api/menuApi'
  import { FormInstance, FormRules } from 'element-plus'

  onMounted(() => {
    getMenuSelect()
    getMenuList()
  })

  //新增弹窗开关
  const visible = ref(false)

  //表单form数据
  const form = reactive({
    name: '',
    permissions: '',
    id: ''
  })
  //创建表单实例
  const instanceForm = ref<FormInstance>()
  //表单校验规则
  const rules = reactive<FormRules>({
    name: [{ required: true, trigger: 'blur', message: '请输入权限名称' }]
  })

  //表单权限列表
  const permissionsList = ref<Menu.MenuSelectItem[]>([])

  //获取树形表单实例
  const treeRef = ref()

  const defaultKeys = [4, 5]

  //获取权限列表
  const getMenuSelect = async () => {
    const data = await api.getMenuSelect()
    permissionsList.value = data
  }

  //分页默认设置
  const page = reactive<Pagination>({
    pageNum: 1,
    pageSize: 10
  })

  const handleCurrentChange = (val: any) => {
    page.pageNum = val
    getMenuList()
  }

  //获取表格数据
  const tableData = reactive({
    list: <Menu.MenuList[]>[],
    total: <number>0
  })

  //获取菜单列表
  const getMenuList = async () => {
    const data = await api.getMenuList(page)
    tableData.list = data.list
    tableData.total = data.total
  }

  //关闭弹窗
  const closeVisible = (formEl?: FormInstance) => {
    if (!formEl) return
    visible.value = false
    formEl.resetFields()
    treeRef.value.setCheckedKeys(defaultKeys)
  }

  //提交表单
  const innerVisible = async (formEl?: FormInstance) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        const permissionsMenu = JSON.stringify(treeRef.value.getCheckedKeys())
        api.updatePermissions({ ...form, permissions: permissionsMenu }).then(() => {
          ElMessage.success('操作成功')
          closeVisible(instanceForm.value)
          getMenuList()
        })
      } else {
        console.log(fields)
      }
    })
  }

  //编辑表单
  const handleClick = (data: any) => {
    console.log(data)
    visible.value = true
    nextTick(() => {
      Object.assign(form, { id: data.id, name: data.name })
      treeRef.value.setCheckedKeys(data.permission)
    })
  }
</script>

<style lang="less" scoped>
  .group-container {
    margin: 10px;
    .group-header {
      font-size: 12px;
      padding: 10px;
      background-color: #c9cdd0;
      border-radius: 5px;
    }
    .group-content {
      padding: 10px;
      background-color: #fff;
    }
  }
</style>
