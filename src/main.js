import Vue from 'vue'
import App from './App.vue'

// 引入三级联动组件为全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav) // 参数：第一个为全局组件的名字，第二个为哪一个组件

// 引入轮播图为全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)
// 引入路由,然后再vue()构造函数中注册路由
import router from './router'

// 引入vuex实例,并注册
import store from '@/store'
//测试接口
import {reqCategoryList} from '@/api'

// 引入轮播图样式,
import 'swiper/css/swiper.min.css' 
// import 'swiper/swiper-bundle.css'
reqCategoryList()
Vue.config.productionTip = false


// 引入MockServer--模拟数据
import '@/mock/mockServer'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; //引入bus总线
  },
  router,
  store
}).$mount('#app')
