//管理购物车相关数据的vuex子模块

import { reqShopCart, reqAddToCart } from '@/api'

const state = {
    cartList: []
}
const mutations = {
    //接受保存购物项列表
    REECIVE_CART_LIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据的异步action
    async getCartList({ commit }) {
        const result = await reqShopCart()
        if (result.code === 200) {
            const cartList = result.data
            commit('REECIVE_CART_LIST', cartList)
        }

    },
    async addToCart({ commit }, { skuId, skuNum, callback }) {
        const result = await reqAddToCart(skuId, skuNum)
        if (result.code === 200) {
            callback()
        } else {
            callback('添加购物车失败')
        }
    },
    async addToCart2({ commit }, { skuId, skuNum }) {
        const result = await reqAddToCart(skuId, skuNum)
        if (result.code !== 200) {
            throw new Error('添加购物车失败')
        }
    },

    async addToCart3({ commit }, { skuId, skuNum }) {
        const result = await reqAddToCart(skuId, skuNum)
        if (result.code !== 200) {
            return '添加购物车失败'
        } else {
            return undefined
        }
    }
}

const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}