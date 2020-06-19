//管理购物车相关数据的vuex子模块

import { reqShopCart, reqAddToCart, reqCheckCartItem, reqDeleteCartItem } from '@/api'
import userTempId from '@/utils'
const state = {
    cartList: [],
}
const mutations = {
    //接受保存购物项列表
    REECIVE_CART_LIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表 数 据的异步action
    async getCartList({ commit }) {
        const result = await reqShopCart()
        if (result.code === 200) {
            const cartList = result.data
            commit('REECIVE_CART_LIST', cartList);
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
        console.log(skuId, skuNum);

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
    },

    // 勾选/不勾选某个购物项商品
    async checkCartItem({ commit }, { skuId, isChecked }) {
        const result = await reqCheckCartItem(skuId, isChecked)
        if (result.code !== 200) {
            throw new Error(result.message || '选中商品失败')
        }
    },

    //全部勾选或不勾选
    async checkAllCartItem({ commit, state, dispatch }, checked) {
        const isChecked = checked ? '1' : '0'
        let promises = []

        state.cartList.forEach(item => {
            if (item.isChecked !== isChecked) {
                const promise = dispatch('checkCartItem', { skuId: item.skuId, isChecked })
                promises.push(promise)
            }
        })

        return Promise.all(promises)
    },

    // 删除选某个购物项商品
    async deleteCartItem({ commit }, skuId) {
        const result = await reqDeleteCartItem(skuId)
        if (result.code !== 200) {
            throw new Error(result.message || '删除商品失败')
        }

    },

    //删除全部选中的购物项商品
    async deleteAllCartItem({ state, dispatch }) {
        const promises = state.cartList.reduce((pre, item) => {
            if (item.isChecked === 1) {
                pre.push(dispatch('deleteCartItem', item.skuId))
            }
            return pre
        }, [])

        return Promise.all(promises)

    }
}

const getters = {
    // 选中的总数量
    totalCount(state) {
        // let total = 0
        // state.cartList.forEach(item => {
        //     total += item.skuNum
        // })
        // return total

        return state.cartList.reduce((preTotal, item, index) => preTotal + (item.isChecked === 1 ? item.skuNum : 0), 0)
    },
    // 选中的总价格
    totalPrice(state) {
        return state.cartList.reduce((pre, item, index) => pre + item.skuNum * item.cartPrice, 0)
    },
    // 是否全部都选中了
    isCheckAll(state) {
        // 需要判断每个是不是都是true
        return state.cartList.length > 0 && state.cartList.every((item, index) => item.isChecked === 1)
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}