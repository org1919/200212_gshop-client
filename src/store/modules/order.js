// 管理订单支付相关的vuex模块

import { reqTradeInfo, reqPayInfo } from "@/api"



export default {
    state: {
        tradeInfo: {},//交易信息
        payInfo: {} //支付信息对象
    },
    mutations: {
        RECEIVE_TRADE_INFO(state, { tradeInfo }) {
            state.tradeInfo = tradeInfo
        },
        RECEIVE_Pay_INFO(state, { payInfo }) {
            state.payInfo = payInfo
        },
    },
    actions: {
        // 获取交易信息
        async getTradeInfo({ commit }, orderId) {
            const result = await reqTradeInfo(orderId)
            if (result.code === 200) {
                const tradeInfo = result.data
                commit('RECEIVE_TRADE_INFO', { tradeInfo })
            }
        },

        // 获取支付信息
        async getPayInfo({ commit }, orderId) {
            const result = await reqPayInfo(orderId)
            if (result.code === 200) {
                const payInfo = result.data
                commit('RECEIVE_Pay_INFO', { payInfo })
            }
        },
    },
    getters: {}
}