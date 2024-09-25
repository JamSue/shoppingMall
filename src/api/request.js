// 对axios进行二次封装,利用请求和响应拦截器在请求和响应前后完成其他业务

import axios from 'axios'

// 引入进度条和相应的样本,进度条的样式可修改，修改后重启项目才有效
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 进度条的start函数和done()分别表示进度条的开始和结束
// 创建axios实例
const request = axios.create({

    baseURL:'/api',  //基础路径
    timeout:5000, // 请求超时的时间
});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发送之前实现一些业务
request.interceptors.request.use((config)=>{
    // 进度条开始
    nprogress.start()
    //config：配置对象，对象中包含请求头headers
    return config
})
request.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done()
    //响应成功的回调函数
    return res.data
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('fail')) //终止promise链
})

export default request 