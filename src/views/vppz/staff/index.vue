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
      <el-button type="danger" @click="deleteCompanion(selectMoreList)">
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
            <el-image v-if="form.avatar" v-model="form.avatar" :src="form.avatar" style="width: 100px; height: 100px" />
            <el-button type="primary" v-else @click="openImg">
              <el-icon><Plus /></el-icon>选择照片
            </el-button>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
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
            <el-button @click="closeVisible(instanceForm)">取消</el-button>
            <el-button type="primary" @click="innerVisible(instanceForm)">确定</el-button>
          </div>
        </template>
      </el-dialog>
      <!-- dialog弹窗end -->

      <!-- dialog选择图片弹窗start -->
      <el-dialog v-model="visibleImg" title="头像选择" width="500" @close="closeImg">
        <div class="img_dialog">
          <div v-for="(item, index) in imgList" :key="item.name" @click="checkImg = index" class="img_content">
            <div v-if="checkImg === index" class="check_icon">
              <el-icon><Check /></el-icon>
            </div>
            <el-image style="width: 100px; height: 100px" :src="item.url" />
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="closeImg">取消</el-button>
            <el-button type="primary" @click="handleCheckImg(checkImg)">确定</el-button>
          </div>
        </template>
      </el-dialog>
      <!-- dialog选择图片弹窗end -->

      <!-- table列表start -->
      <el-table
        :data="tableData.list"
        stripe
        style="width: 100%"
        @selection-change="selectCheck"
        ref="multipleTableRef"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="name" label="昵称" width="100" />
        <el-table-column prop="avatar" label="头像" width="100">
          <template #default="scope">
            <el-image :src="scope.row.avatar" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100">
          <template #default="scope"> </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="130" />
        <el-table-column prop="active" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.active === 1 ? 'success' : 'danger'">
              {{ scope.row.active === 1 ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template #default="scope">
            <el-icon><timer /></el-icon>
            {{ formatData(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button link type="primary" @click="openDialog(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- table列表end -->

      <!-- dialog删除二次确认框start -->
      <el-dialog v-model="visibleImg" title="头像选择" width="500" @close="closeImg">
        <div class="img_dialog">
          <div v-for="(item, index) in imgList" :key="item.name" @click="checkImg = index" class="img_content">
            <div v-if="checkImg === index" class="check_icon">
              <el-icon><Check /></el-icon>
            </div>
            <el-image style="width: 100px; height: 100px" :src="item.url" />
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="closeImg">取消</el-button>
            <el-button type="primary" @click="handleCheckImg(checkImg)">确定</el-button>
          </div>
        </template>
      </el-dialog>
      <!-- dialog删除二次确认框end -->

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
  import { useRoute } from 'vue-router'
  import api from '../../../api/staffApi'
  import { onMounted, reactive, ref } from 'vue'
  import { Pagination, Staff } from '../../../types/api'
  import { FormInstance, FormRules } from 'element-plus'
  import { formatData } from '../../../utils'
  import { nextTick } from 'vue'

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

  //dialog新增弹窗---------------------------
  //弹窗开关状态
  const visible = ref(false)

  //打开弹窗
  const openDialog = (action?: Staff.Params) => {
    visible.value = true
    if (action) {
      nextTick(() => {
        Object.assign(form, {
          id: action.id,
          name: action.name,
          mobile: action.mobile,
          avatar: action.avatar,
          sex: action.sex,
          age: action.age,
          active: action.active
        })
      })
    }
  }

  //表单form数据
  const form = reactive({
    id: '',
    name: '',
    mobile: '',
    avatar: '',
    sex: '',
    age: 28,
    active: 1
  })
  //创建表单实例
  const instanceForm = ref<FormInstance>()

  //手机号验证规则
  const validName = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error('请输入手机号账号'))
    } else {
      const nameReg = /^1(3[0-9]|4[0145879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|[0-35-9])\d{8}$/
      return nameReg.test(value) ? callback() : callback(new Error('请输入正确手机号'))
    }
  }

  //表单校验规则
  const rules = reactive<FormRules>({
    name: [{ required: true, trigger: 'blur', message: '请输入昵称名称' }],
    mobile: [{ validator: validName, trigger: 'blur', required: true }],
    avatar: [{ required: true, trigger: 'blur', message: '请选择头像' }],
    sex: [{ required: true, trigger: 'blur', message: '请选择性别' }],
    age: [{ required: true, trigger: 'blur', message: '请输入年龄' }]
  })

  //提交表单
  const innerVisible = async (formEl?: FormInstance) => {
    if (!formEl) return
    await formEl.validate((valid, field) => {
      if (valid) {
        api.addCompanion(form).then(() => {
          ElMessage.success('新增成功')
          getStaffList()
          closeVisible(instanceForm.value)
        })
      } else {
        console.log(field)
      }
    })
  }

  //关闭弹窗
  const closeVisible = (formEl?: FormInstance) => {
    if (!formEl) return
    formEl.resetFields()
    visible.value = false
  }

  //dialog选择照片弹窗---------------------
  //弹窗开关状态
  const visibleImg = ref(false)

  //照片列表
  const imgList = ref<Staff.PhotoList[]>([])

  //储存选中图片
  const checkImg = ref(0)

  //打开Img弹窗
  const openImg = async () => {
    await api.getPhotoList().then(data => {
      imgList.value = data
      console.log('imgList', imgList)
      visibleImg.value = true
    })
  }

  //关闭弹窗
  const closeImg = () => {
    visibleImg.value = false
    checkImg.value = 0
  }

  //确认选择图片
  const handleCheckImg = (index: number) => {
    form.avatar = imgList.value[index].url
    closeImg()
  }

  //table列表----------------------------
  //多选ref状态
  const multipleTableRef = ref()

  //多选选中数组
  const selectMoreList = ref<Staff.Params[]>([])

  //多选功能
  const selectCheck = (list: Staff.Params[]) => {
    selectMoreList.value = list
  }

  //table列表数据
  const tableData = reactive({
    list: <Staff.Params[]>[],
    total: 0
  })

  //删除功能
  const deleteCompanion = (val: Staff.Params[]) => {
    if (val.length === 0) return ElMessage.warning('请选择最少一条数据删除')
    ElMessageBox.confirm('是否要删除选中数据?', '删除确认', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        api.deleteCompanion(val).then(() => {
          ElMessage.success('删除成功')
          getStaffList()
        })
      })
      .catch(() => {})
  }

  //Pagination分页-----------------------
  //分页设置
  const page = reactive<Pagination>({
    pageNum: 1,
    pageSize: 10
  })

  //分页提交功能
  const handleCurrentChange = (val: any) => {
    page.pageNum = val
    getStaffList()
  }
</script>

<style lang="less" scoped>
  .group-container {
    margin: 10px;
    .group-content {
      padding: 10px;
      background-color: #fff;
    }
  }

  .img_dialog {
    display: flex;
    flex-wrap: wrap;
    .img_content {
      position: relative;
      margin-right: 10px;
      .check_icon {
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: rgb(46, 214, 40);
        color: #fff;
        z-index: 99;
      }
    }
  }
</style>
