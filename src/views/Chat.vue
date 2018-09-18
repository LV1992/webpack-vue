<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>websocket聊天</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-form class="plugins-tips" ref="form" :model="form" label-width="80px">
             <el-form-item label="文本框">
                 <el-input type="textarea" :placeholder="form.placeholder" :model="form.sendMsg"></el-input>
             </el-form-item>
             <el-form-item>
             <el-button type="primary" @click="onSubmit" >提交</el-button>
                 <el-button>取消</el-button>
             </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                src: './static/img/img.jpg',
                fileList: [],
                form:{placeholder:'请输入',sendMsg:''}
            }
        },
        components: {
        },
        methods:{
            onSubmit() {
            debugger
                if(this.form.sendMsg == ''){
            debugger
                      this.$notify.error({
                                    title: '发送消息失败',
                                    message: '发送的消息不可为空'
                                });
                }else{
            debugger
                this.$notify.error({
                                                    title: '发送消息成功',
                                                    message: self.form.sendMsg
                                                });
                }
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            }
        }
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{
        width:250px;
        height: 250px;
        margin-bottom: 20px;
    }
</style>
