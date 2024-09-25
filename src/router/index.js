// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login  from '@/pages/Login'
import Search  from '@/pages/Search'

// 配置并暴露路由
export default new VueRouter({
    // 配置路由
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{
                show:true
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                show:false
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                show:false
            }
        },
        {
            name:'search',
            component:Search,
            meta:{
                show:true
            },
            path:'/search/:keyword?',// params参数占位
        },
        // 路由重定向，当项目启动时 页面显示的位置
        {
            path:'/',
            redirect:'/home'
        }
    ]
})