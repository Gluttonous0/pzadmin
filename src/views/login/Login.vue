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
      <el-form ref="ruleFormRef" :model="loginForm" class="demo-ruleForm" style="max-width: 600px" :rules="rules">
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
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm(ruleFormRef)">{{
            isLogin ? '登录' : '注册'
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<!-- //--------------------------------------逻辑层 ---------------------------------------->
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import api from '../../api/loginApi'
import store from '../../utils/stroage'
import { useRouter } from 'vue-router'
const loginImg = new URL(`../../../public/login-head.png`, import.meta.url).href

//路由跳转
const router = useRouter()

//表单数据
const loginForm = reactive({
  userName: '',
  passWord: '',
  validCode: ''
})

//表单验证规则
const ruleFormRef = ref<FormInstance>()

//账号验证规则
const validName = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    const nameReg = /^1(3[0-9]|4[0145879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|[0-35-9])\d{8}$/
    return nameReg.test(value) ? callback() : callback(new Error('请输入正确手机号'))
  }
}

//密码验证规则
const validPwd = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    const nameReg = /^[a-zA-Z0-9_-]{4,16}$/
    return nameReg.test(value) ? callback() : callback(new Error('请输入正确密码'))
  }
}
const validCode = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('验证码不能为空'))
  } else {
    const nameReg = /^[0-9]{4}$/
    return nameReg.test(value) ? callback() : callback(new Error('请输入正确验证码'))
  }
}

//验证规则
const rules = reactive<FormRules>({
  userName: [{ validator: validName, trigger: 'blur' }],
  passWord: [{ validator: validPwd, trigger: 'blur' }],
  validCode: [{ validator: validCode, trigger: 'blur' }]
})

//表单提交
const submitForm = async (formEl?: FormInstance) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (isLogin.value) {
        api
          .loginIn(loginForm)
          .then((data: any) => {
            console.log(data)
            if (data.code === 10000) {
              console.log(data)
              ElMessage.success('登录成功')
              // store.set('token', data.data.token)
              // store.set('userInfo', data.data.userInfo)
              // router.push('/')
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        api.getAuthentication(loginForm).then(({ data }: any) => {
          if (data.code === 10000) {
            ElMessage.success('注册成功')
            isLogin.value = true
          }
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

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
    return ElMessage.warning('请输入正确手机号')
  }

  //验证码计时器
  const t = setInterval(() => {
    if (conutDown.time <= 0) {
      conutDown.time = 60
      conutDown.validText = '获取验证码'
      flag.value = false
      clearInterval(t)
    } else {
      conutDown.time--
      conutDown.validText = `剩余${conutDown.time}秒`
    }
  }, 1000)
  flag.value = true
  api.getCode(loginForm.userName).then(({ data }: any) => {
    if (data.code === 10000) {
      ElMessage.success('发送成功')
    }
  })
}
</script>

<!-- -----------------------------样式层------------------------------- -->
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
