<template>
  <div class="group-container">
    <div class="group-header">
      <h3>菜单管理</h3>
      <p>菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取</p>
    </div>

    <el-button text @click="visible = true">open the outer Dialog</el-button>
    <el-dialog v-model="visible" title="添加权限" width="500">
      <el-form ref="instanceForm" :modal="form" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请填写权限名称"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-tree
            ref="treeRef"
            :data="permissionsList"
            show-checkbox
            node-key="id"
            style="max-width: 600px"
            :default-checked-keys="[5]"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="innerVisible(instanceForm)">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import api from '../../../api/menuApi'
  import { Menu } from '../../../types/api'
  import { FormInstance, FormRules } from 'element-plus'

  onMounted(() => {
    getMenuSelect()
  })

  //表单form数据
  const form = reactive({
    name: '',
    permissions: ''
  })
  //创建表单实例
  const instanceForm = ref<FormInstance>()
  //表单校验规则
  const rules = reactive<FormRules>({
    name: [{ required: true, trigger: 'blur', message: '请输入权限名称' }]
  })

  //表单权限列表
  const permissionsList = ref<Menu.MenuSelectItem[]>([])

  //树形表单字段定义设置
  const defaultProps = {
    children: 'children',
    label: 'name'
  }
  //获取树形表单实例
  const treeRef = ref()

  //获取权限列表
  const getMenuSelect = async () => {
    const data = await api.getMenuSelect()
    permissionsList.value = data
    console.log(data)
  }

  //新增弹窗开关
  const visible = ref(false)

  //提交表单
  const innerVisible = async (formEl?: FormInstance) => {
    console.log(form.name)

    if (!formEl) return
    const valid = await formEl.validate()
    if (valid) {
      console.log(valid)
    } else {
      console.log(1)
    }
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
  }
</style>
