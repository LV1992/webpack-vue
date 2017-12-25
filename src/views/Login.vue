<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="账号" autoComplete="on"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :type="pwdType" v-model="ruleForm.password" placeholder="密码" autoComplete="on"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
          <span style=" position: absolute; top: 14px; left: 276px;" class="el-icon-view" @click="showPwd"></span>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  //引入验证工具
  import {isvalidUsername} from '@/utils/validate'
  export default {
    data: function () {
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
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, trigger: 'blur', validator: validateUsername}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatePassword}
          ]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      submitForm(formName) {
        //校验输入
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            //提交请求 .then 登录成功 resolve() .catch 登录失败 reject(data) ()=>{} == function(){}
            this.$store.dispatch('LoginByUsername', this.ruleForm).then(() => {
              this.loading = false;
              this.$router.push('/readme');
            }).catch((e) => {
              this.$message({
                message: e.errorMsg,
                type: 'warning'
              });
              this.loading = false;
            });
//                        localStorage.setItem('ms_username',self.ruleForm.username);
//                        self.$router.push('/readme');
          } else {
            console.log('validate fail!!');
            return false;
          }
        });
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
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
</style>
