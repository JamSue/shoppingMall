<template>
  <div id="app">
   <Header></Header>
   <!-- 路由组件出口位置 -->
   <router-view></router-view>

   <!-- footer在路由组件为home或者search时显示,登录注册时隐藏 -->
   <!-- 方法一 -->
   <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    
    <!-- 方法二：路由元信息 -->
   <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //组件挂载完后通过Vuex向服务器发请求，获取数据，存储于仓库当中
    this.$store.dispatch('categoryList')
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
