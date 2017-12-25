<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="账号" autoComplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="密码" autoComplete="on" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <!--<span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>-->
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
  import { isvalidUsername } from '@/utils/validate'
    export default {
        data: function(){
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
                        { required: true,trigger: 'blur',validator: validateUsername}
                    ],
                    password: [
                        { required: true,trigger: 'blur' , validator : validatePassword}
                    ]
                },
              loading: false,
            }
        },
        methods: {
            submitForm(formName) {
                const self = this
                //校验输入
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                      self.loading = true
                        //提交请求 .then 登陆成功 .catch 登陆失败 ()=>{} == function(){}
                          self.$store.dispatch('LoginByUsername',self.ruleForm).then( ()=> {
                          self.loading = false;
                          self.$router.push('/readme');
                        }).catch((e)=>{
                          debugger
                          console.log(e)
                          self.loading = false;
                        });
//                        localStorage.setItem('ms_username',self.ruleForm.username);
//                        self.$router.push('/readme');
                    } else {
                        console.log('validate fail!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
