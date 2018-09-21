<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名为手机号" autoComplete="on"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :type="pwdType" v-model="ruleForm.password" placeholder="密码" autoComplete="on"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
          <!--给组件绑定原生事件 @click.native-->
          <icon :iconName="eyeIcon" @click.native="showPwd" />
          <!--<span style=" position: absolute; top: 14px; left: 276px;" class="el-icon-view" @click="showPwd"></span>-->
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
        </div>

        <p class="third-login-btn" @click="thirdLogin()">打开第三方登录</p>
      </el-form>

      <el-dialog title="第三方验证" :visible.sync="showDialog">
            <div><img class="src" :src="qrcode" /></div>
            <div>邮箱登录成功,请选择第三方验证</div>
            <!--<social-sign />-->
      </el-dialog>
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
        pwdType: 'password',
        eyeIcon: 'bl44ceye',
        showDialog : false,
        qrcode : ''
      }
    },
    methods: {
      submitForm(formName) {
        //校验输入
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            //提交请求 this.$store.dispatch().then 登录成功 resolve() .catch 登录失败 reject(data) ()=>{} == function(){}
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
          this.pwdType = '';
          this.eyeIcon = 'ion-eye';
        } else {
          this.pwdType = 'password'
          this.eyeIcon = 'bl44ceye';
        }
      },
       thirdLogin(){
          this.showDialog=true;
          //提交请求 .then 登录成功 resolve() .catch 登录失败 reject(data) ()=>{} == function(){}
          this.$store.dispatch('ThirdLoginGetQrCode').then(res => {
          debugger
               this.qrcode = 'data:image/png;base64,' + res.image
          }).catch((e) => {
               this.$message({
               message: e.errorMsg,
               type: 'warning'
               });
          });
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
  .third-login-btn{font-size:12px;line-height:30px;color:#999;cursor:pointer;}
</style>
