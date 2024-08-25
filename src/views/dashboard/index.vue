<template>
  <div class="container">
    <PanelHead>
      <template #header>{{ route.meta.name }}</template>
      <template #content>{{ route.meta.describe }}</template>
    </PanelHead>
    <div class="container-one">
      <div class="one-left one-row">
        <div class="admin-header">
          <el-image style="width: 100px; height: 100px; border-radius: 50%" :src="userAdmin?.user_img" />
          {{ userAdmin?.user_name }}
        </div>
        <div class="admin-body">
          <div class="admin-item">当前权限：{{ userAdmin?.permission }}</div>
          <div class="admin-item">登录的ip：{{ userAdmin?.ip }}</div>
        </div>
      </div>

      <div class="one-row one-right">
        <div class="order-item" v-for="(item, index) in userTypes">
          <el-image :src="`../../../public/img/od_${index + 1}0.png`" style="width: 100px; height: 100px" />
          <div>
            <div class="order-num">{{ item.num }}</div>
            <div>{{ item.state }}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="main" class="echarts"></div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import api from '../../api/loginApi'
  import { Login } from '../../types/api'
  import * as echarts from 'echarts'

  onMounted(() => {
    getReport()
  })

  //折线图数据
  const option = ref({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    legend: {
      data: ['订单数']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '订单数',
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  })

  //获取路由信息
  const route = useRoute()

  //获取数据
  const getReport = async () => {
    const data = await api.getReport()
    userTypeList.value = data.typeList
    userTypes.value = data.types
    userAdmin.value = data.user
    option.value.xAxis.data = data.typeList.map(item => {
      return item.date
    })
    option.value.series[0].data = data.typeList.map(item => {
      return item.order_sum
    })

    //折线图初始化
    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom)
    myChart.setOption(option.value)
  }

  //数据承载
  const userTypeList = ref<Login.TypeList[]>()
  const userTypes = ref<Login.Types[]>()
  const userAdmin = ref<Login.User>()
</script>
<style scoped lang="less">
  .container {
    margin: 10px;
    .container-one {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      gap: 20px;

      .one-row {
        flex: 1 0 45%;
        background-color: #fff;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
      }
      .one-left {
        .admin-header {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #d9dfdf;
          padding: 20px;
          font-size: 18px;
          font-weight: 700;
        }
        .admin-body {
          margin-top: 10px;
          .admin-item {
            color: #6e716f;
            font-size: 14px;
            padding: 5px;
          }
        }
      }
      .one-right {
        display: flex;
        justify-content: space-between;
        .order-item {
          flex: 1 0 20%;
          display: flex;
          align-items: center;
          .order-num {
            font-size: 20px;
            font-weight: 700;
          }
        }
      }
    }
  }
  .echarts {
    width: 100%;
    height: 500px;
    margin-top: 30px;
    padding: 10px;
    background-color: #fff;
  }
</style>
