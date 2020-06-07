/*
Vuex最核心的管理对象: store(仓库)
*/
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'

// 声明使用vue插件
Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {}
const getters = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {// 指定vuex管理所有子模块
        home, // 标识名称: vuex子模块
        user
    }
})