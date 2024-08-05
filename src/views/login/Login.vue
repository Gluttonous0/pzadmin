<template>
  <el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <img :src="loginImg" alt="" />
        </div>
      </template>
      <div class="jump-link">
        <el-link type="primary" @click="handleChangeIsLogin">{{ isLogin ? '注册账号' : '登录账号' }}</el-link>
      </div>
      <el-form :model="loginForm" class="demo-ruleForm" style="max-width: 600px">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="手机号" prefix-icon="Avatar" />
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="loginForm.passWord" placeholder="密码" prefix-icon="Lock" type="password" />
        </el-form-item>
        <el-form-item prop="validCode" v-if="!isLogin">
          <el-input v-model="loginForm.validCode" placeholder="验证码" prefix-icon="Lock">
            <template #append>
              <span class="code-point" @click="conutDownChange">{{ conutDown.validText }}</span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const loginImg = new URL(`../../../public/login-head.png`, import.meta.url).href
//表单数据
const loginForm = reactive({
  userName: '',
  passWord: '',
  validCode: ''
})

//控制登录注册按钮切换
const isLogin = ref(true)
//点击切换注册登录
const handleChangeIsLogin = () => {
  isLogin.value = !isLogin.value
}

//发送验证码
const conutDown = reactive({
  validText: '获取验证码',
  time: 60
})

//点击发送短信
const flag = ref(false)
const conutDownChange = () => {
  if (flag.value) return

  //手机号校验
  const phoneReg = /^1(3[0-9]|4[0145879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|[0-35-9])\d{8}$/
  if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
    return ElMessage.warning('输入手机号')
  }

  //验证码计时器
  const t = setInterval(() => {
    if (conutDown.time <= 0) {
      conutDown.time = 60
      conutDown.validText = '获取验证码'
      debugger
      flag.value = false
      clearInterval(t)
    } else {
      conutDown.time--
      conutDown.validText = `剩余${conutDown.time}秒`
    }
  }, 1000)
  flag.value = true
}
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
    text-align: right;
    margin-bottom: 10px;
  }
  .code-point {
    cursor: pointer;
  }
}
</style>
