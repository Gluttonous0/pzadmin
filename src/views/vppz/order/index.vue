<template>
  <div class="group-container">
    <PanelHead>
      <template #header>{{ route.meta.name }}</template>
      <template #content>{{ route.meta.describe }}</template>
    </PanelHead>

    <div class="group-content">
      <!-- 搜索栏start -->
      <div class="table-search">
        <el-space wrap>
          <el-input
            v-model="page.out_trade_no"
            style="width: 240px; height: 40px; margin-right: 10px"
            placeholder="请输入订单号"
            clearable
          />
          <el-button @click="handleSearch" type="primary" size="large">查询</el-button>
        </el-space>
      </div>
      <!-- 搜索栏end -->

      <!-- table列表start -->
      <el-table :data="tableData.list" stripe style="width: 100%">
        <el-table-column prop="out_trade_no" label="订单号" width="140" fixed="left" />
        <el-table-column prop="hospital_name" label="就诊医院" />
        <el-table-column prop="service_name" label="陪诊服务" />
        <el-table-column prop="companion.avatar" label="陪护师" width="80">
          <template #default="scope">
            <el-image :src="scope.row.companion.avatar" style="width: 50px; height: 50px; border-radius: 50%" />
          </template>
        </el-table-column>
        <el-table-column prop="companion.mobile" label="陪护师手机号" />
        <el-table-column prop="price" label="总价" width="80" />
        <el-table-column prop="paidPrice" label="已付" width="80" />
        <el-table-column prop="starttime" label="下单时间" />
        <el-table-column prop="trade_state" label="订单状态">
          <template #default="scope">
            <div v-if="scope.row.trade_state">
              <el-tag type="primary" v-if="scope.row.trade_state === '待服务'">{{ scope.row.trade_state }}</el-tag>
              <el-tag type="success" v-else-if="scope.row.trade_state === '已完成'">{{ scope.row.trade_state }}</el-tag>
              <el-tag type="info" v-else-if="scope.row.trade_state === '已取消'">{{ scope.row.trade_state }}</el-tag>
              <el-tag type="info" v-else-if="scope.row.trade_state === '待支付'">{{ scope.row.trade_state }}</el-tag>
            </div>
            <div v-else>
              <el-tag type="primary">已接单</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="service_state" label="接单状态" />
        <el-table-column prop="client.mobile" label="联系人手机号" />
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              text
              v-if="scope.row.trade_state === '待服务'"
              @click="visibleDialog(scope.row.out_trade_no)"
            >
              <span>服务完成</span>
            </el-button>
            <el-button type="primary" text v-else>
              <span style="color: #bfd5ed">暂无服务</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- table列表end -->
    </div>
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
  <!-- dialog删除二次确认框start -->
  <el-dialog v-model="visible" title="服务完成提示" width="400" @close="visible = false" center>
    <div style="font-size: 17px; margin: 10px">是否要把给订单服务完成</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleCheckImg">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- dialog删除二次确认框end -->
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import api from '../../../api/staffApi'
  import { Order } from '../../../types/api'

  onMounted(() => {
    getOrderList()
  })

  //获取当前路由
  const route = useRoute()

  //获取订单列表
  const getOrderList = async () => {
    const data = await api.getOrderList(page)
    tableData.list = data.list
    tableData.total = data.total
    console.log(tableData.list)
  }

  //table
  //table列表数据
  const tableData = reactive({
    list: <Order.Params[]>[],
    total: 0
  })

  //page
  //初始化设置
  const page = reactive<Order.OrderSearch>({
    pageNum: 1,
    pageSize: 10,
    out_trade_no: ''
  })

  //翻页功能
  const handleCurrentChange = (val: any) => {
    page.pageNum = val
    getOrderList()
  }

  //搜索功能
  const handleSearch = () => {
    getOrderList()
  }

  //dialog组件
  //删除弹窗显示状态控制
  const visible = ref(false)

  //打开窗口
  const visibleDialog = (id: string) => {
    visible.value = true
    ownId.value = id
  }

  //服务完成
  const ownId = ref()
  const handleCheckImg = () => {
    if (!ownId.value) return
    api.updateOrder(ownId.value).then(() => {
      ElMessage.success('操作成功')
      ownId.value = ''
      getOrderList()
      visible.value = false
    })
  }
</script>

<style lang="less" scoped>
  .group-container {
    margin: 10px;
    .group-content {
      background-color: #fff;
      .table-search {
        padding: 20px;
        text-align: right;
      }
    }
  }
</style>
