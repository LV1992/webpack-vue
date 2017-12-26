<!--iconfont组件化-->
<template>
  <i :class="iconClass"/>
</template>
<script>
  export default{
      //props 属性：定义使用标签组件的属性 相当于使用<i iconName=""></icon>
    props: {
      iconName: {
        type: String,
        required: true
      },
//      size: {
//        type: String,
//        default: 'normal'
//      },
    },
    computed : {
        iconClass(){
          return 'iconfont el-icon-my-'+this.iconName
        }
    }
  }
</script>
<style scoped>
  /*导入iconfont.css文件*/
  @import "../../assets/icons/iconfont.css";
  /*.iconfont {*/
    /*width: 1em;*/
    /*height: 1em;*/
    /*vertical-align: -0.15em;*/
    /*fill: currentColor;*/
    /*overflow: hidden;*/
  /*}*/
</style>
