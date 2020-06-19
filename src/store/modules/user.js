/*
管理用户数据的vuex子模块
*/
import { getUserTempId } from '@/utils'
import { reqRegister, reqLogout, reqLogin } from '@/api'
import { saveUserInfo, getUserInfo, removeUserInfo } from '@/utils'
export default {
    state: {
        userInfo: getUserInfo(), // 登陆用户的 W信息
        userTempId: getUserTempId()
    },
    mutations: {
        RECEIVE_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        },

        RESET_USER_INFO(state) {
            state.userInfo = {}
        }
    },
    actions: {
        async register({ commit }, userInfo) {
            const result = await reqRegister(userInfo)
            if (result.code !== 200) {
                throw new Error(result.data || '注册失败')
            }
        },

        async login({ commit }, { mobile, password }) {
            const result = await reqLogin(mobile, password)
            if (result.code == 200) {
                const userInfo = result.data
                // 通过commit触发mutation调用 ==> 保存信息到state
                commit('RECEIVE_USER_INFO', userInfo)
                // 保存localStorage中  ===> 从而可以实现自动登陆的功能
                saveUserInfo(userInfo)
            } else {
                throw new Error(result.message || '登陆失败')
            }
        },

        async logout({ commit }) {
            const result = await reqLogout()
            if (result.code == 200) {
                // 通过commit触发mutation调用 ==> 清除state中的userInfo
                commit('RESET_USER_INFO')
                // 删除local中保存的userInfo
                removeUserInfo()
            } else {
                throw new Error(result.message || '退出登陆失败')
            }
        },
    },
    getters: {}
}