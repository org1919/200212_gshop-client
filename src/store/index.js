/*
Vuex最核心的管理对象: store(仓库)
*/
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'


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
    modules
})