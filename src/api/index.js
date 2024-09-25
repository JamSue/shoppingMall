// API接口统一管理的文件

// 获取二次封装后的axios
import request from './request'
import mockRequest from './mockRequest'

// 1. 三级联动接口
// /api/product/getBaseCategoryList    GET  无参数

export const reqCategoryList = ()=>{
    // 发请求，返回Promise对象
    return request({url:"/product/getBaseCategoryList", method:"GET"})
}
// 简化写法
// export const reqCategoryList = ()=>request({url:"/product/getBaseCategoryList", method:"get"})

// 2.获取首页轮播图
export const reqBannerList = ()=>mockRequest({url:"/banner", method:"get"})
// export const reqBannerList = ()=>mockRequest.get('/banner) // 写法二

// 3.获取floor数据
export const reqFloorList = () => mockRequest({ url: '/floor', method: "get" })


// 4.获取搜索模块数据接口
/* 接口：/api/list
   请求方式： post
   参数：一堆    */
export const reqSearchInfo = (params) => request({
    url: "/list",
    method: 'post',
    data:params  // 参数是用data传参，给服务器传递的参数params至少是一个空对象
})