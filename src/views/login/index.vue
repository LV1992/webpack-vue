<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">系统登录</h3>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="邮箱" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                  placeholder="密码" />
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录方式1</el-button>

      <div class="tips">账号:admin 密码随便填</div>
      <div class="tips">账号:editor  密码随便填</div>

      <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名为手机号。</p>
      <el-button class="thirdparty-button" type="primary" @click="showDialog=true">打开第三方登录</el-button>
    </el-form>

    <el-dialog title="第三方验证" :visible.sync="showDialog">
      本地不能模拟，请结合自己业务进行模拟！！！<br/><br/><br/>
      邮箱登录成功,请选择第三方验证<br/>
      <social-sign />
    </el-dialog>

  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate'
  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: '1111111'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        pwdType: 'password',
        loading: false,
        showDialog: false
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            //通过$store.dispatch 分发一个 store 里注册的action
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false
              //跳转路由
              this.$router.push({ path: '/' })
              // this.showDialog = true
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      afterQRScan() {
         const hash = window.location.hash.slice(1)
         const hashObj = getQueryObject(hash)
         const originUrl = window.location.origin
         history.replaceState({}, '', originUrl)
         const codeMap = {
           wechat: 'code',
           tencent: 'code'
         }
         const codeName = hashObj[codeMap[this.auth_type]]
         if (!codeName) {
           alert('第三方登录失败')
         } else {
           this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
             this.$router.push({ path: '/' })
           })
         }
      }
    },
    created() {
       window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed() {
       window.removeEventListener('hashchange', this.afterQRScan)
    }
  }
</script>
<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;

  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }

  [class$="bl44ceye"], [class$="ion-eye"] {
    position: absolute;
    top: 13px;
    left: 15em;
    cursor: pointer;
  }
</style>
