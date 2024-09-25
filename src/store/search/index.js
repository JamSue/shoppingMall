// search模块的store

import {reqSearchInfo} from '@/api'

// 存储状态
const state = {
    searchList: {},
    a: 1
}

// 修改状态的唯一方式
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}

// 处理action，可以书写自己的业务逻辑 、可以处理异步
const actions = {

    // action函数的参数
    async getSearchList({commit},params={}) {
        //调用该函数时至少传入一个空对象
        let result = await reqSearchInfo(params)
        // console.log("result",result);
        if (result.code === 200) commit('GETSEARCHLIST', result.data)
        else {
        console.log("error");}
    }
}

//类似于计算属性,在项目中为了简化仓库中的数据,将将来在组件中需要用的数据简化，便于组件获取数据
const getters = {
    goodsList(state) { //相当于以函数形式定义一个计算属性,
        //形参state为当前仓库中state，包括其中所有数据
        return state.searchList.goodsList || []; //最开始searchList为空列表，goodList还为undefined,此时返回值为undefined
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}