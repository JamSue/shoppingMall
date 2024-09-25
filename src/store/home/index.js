//home模块的store
import {reqCategoryList,reqBannerList,reqFloorList} from '@/api' //从api中引入接口

// 存储状态
const state = {

  categoryList:[] , //根据接口返回值进行初始化
  bannerList:[], // 轮播图数据
  floorList:[]
}

// 修改状态的唯一方式
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    },
}

// 处理action，可以书写自己的业务逻辑 、可以处理异步
const actions = {
    //通过api中的接口函数调用向服务器发请求，获取服务器的数据
    async categoryList({commit}){ //{commit}解构将上下文中的commit指令解构出来
        let res = await reqCategoryList()
        if(res.code===200){
           commit("CATEGORYLIST",res.data)
        }
    },
    async getBannerList({commit}){ //{commit}解构将上下文中的commit指令解构出来
        let res = await reqBannerList()
        if(res.code===200){
           commit("GETBANNERLIST",res.data)
        }
    },
    async getFloorList({commit}){ //{commit}解构将上下文中的commit指令解构出来
        let res = await reqFloorList()
        if(res.code===200){
           commit("GETFLOORLIST",res.data)
        }
    },

    
}

//类似于计算属性
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters,
}