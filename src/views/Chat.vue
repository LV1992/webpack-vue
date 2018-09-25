<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>websocket聊天</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-form ref="form" label-width="80px">
            <el-row :gutter="12" v-for="msg in msgList ">

              <div :span="12" v-if="msg.sendBy === 'me'">
              <div class="time">{{ msg.title }}</div>
                  <el-card class="chat-content-me">
                    <div>{{msg.message}}</div>
                  </el-card>
              </div>

              <div :span="12" v-if="msg.sendBy === 'other'">
              <div class="time">{{ msg.title }}</div>
                  <el-card class="chat-content-other" shadow="always">
                    <div>{{msg.message}}</div>
                  </el-card>
              </div>

            </el-row>

             <el-input style="margin: 10px" type="textarea" :placeholder="form.placeholder" v-model="form.sendMsg"></el-input>

             <el-form-item style="width: 250px;margin: auto">
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
                msgList: [],
                form:{placeholder:'请输入',sendMsg:''},
                socket: null,
                msg:{},
                session: null
            }
        },
        created: function(){
          // `this` 指向 vm 实例
          const session = JSON.parse(localStorage.getItem('session'));
          this.session = session
          this.socket = new WebSocket("ws://localhost:8008/user/websocket/"+session.sessionKey);
        },
        destroyed: function(){
          this.socket.close();
          //关闭事件
          this.socket.onclose = function() {
             console.log("Socket已关闭");
          }
        },
        mounted : function(){
          const self = this
          //获得消息事件
          this.socket.onmessage = function(msg) {
              console.log(msg.data);
              const data = JSON.parse(msg.data)
              self.$message({
                                  message: data.msg,
                                  type: 'success'
                            });
              //发现消息进入    调后台获取
             //getCallingList();
          }
        },
        methods:{
            onSubmit() {
                if(this.form.sendMsg == ''){
                      this.$message({
                      message: '发送消息失败,发送的消息不可为空',
                      type: 'error'
                      });
                }else{
                            if(typeof(WebSocket) == "undefined"){
                                console.log("您的浏览器不支持WebSocket");
                            }
                            this.msg = {title:'',msg:this.form.sendMsg,isSendAll:false,toUserId:1000,sessionKey:this.session.sessionKey}

                            			this.socket.send(JSON.stringify(this.msg));
                             const self = this
                            			//打开事件
                            			this.socket.onopen = function() {
                            				console.log("Socket 已打开");
                            			}
                                            //关闭事件
                                            this.socket.onclose = function() {
                                               console.log("Socket已关闭");
                                            }

                            			//获得消息事件
                            			this.socket.onmessage = function(msg) {
                            				console.log(msg.data);
                            				self.msgList.push({message:JSON.parse(msg.data).msg,title:new Date(),sendBy: 'other'});
                            				//发现消息进入    调后台获取
                            				//getCallingList();
                            			}

                            			//发生了错误事件
                            			this.socket.onerror = function() {
                            				this.$notify.error({
                                                      title: '发送消息失败',
                                                      message: 'Socket发生了错误'
                                                    });
                            			}
                            			//$(window).unload(function(){
                            			// socket.close();
                            			//});

                            //                            		$("#btnClose").click(function() {
                            //                            			socket.close();
                            //                            		});


              this.$message({
                    message: '发送消息成功',
                    type: 'success'
              });

              self.msgList.push({message:this.form.sendMsg,title:new Date(),sendBy: 'me'});

                }
            }
        }
    }
</script>

<style scoped>
.time {
    font-size: 13px;
    color: #999;
}

.chat-content-me{
        margin: 10px 0;
        max-width: 100%;
        background-color: #67C23A;
}

.chat-content-other{
        margin: 10px 0;
        width: auto;
        max-width: 100%;
}
.el-car{word-break: break-word;}
</style>
