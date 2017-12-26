import Vue from 'vue'
import IconComponent from "./icon/index.vue"

const Icon = {
  install:function () {
    //使用icon标签
    Vue.component("icon",IconComponent)
  }
}
export default Icon
