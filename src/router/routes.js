// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'

// import ()引入的模块会被拆分出去单独打包:.xx.js
// 配置的路由组件是一个返回import()动态打包函数,函数体内
//  函数只有当请求对应的路径时才会执行才会请求加载对应的打包文件

const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
const Detail = () => import('@/pages/Detail')

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'

import stote from '@/store'

export default [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true
        }
        // beforeEnter: (to, from, next) => {
        //     const token = stote.state.user.userInfo.token
        //     if (token) {
        //         next('/')
        //     } else {
        //         next()
        //     }
        // }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHideFooter: true
        }
    },
    {
        path: '/search/:keyword?',// 带:的对应的部分就是params参数
        component: Search,
        name: 'search' //一旦有params参数, 想用push()的对象语法, 必须有name配置
    },
    {
        path: '/detail/:id',
        component: Detail
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        // 有skuNum和skuInfo参数才能成功跳转到此页面
        beforeEnter: (to, from, next) => {
            const skuNum = to.query.skuNum
            const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
            if (skuNum && skuInfo instanceof Object) {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: '/trade',
        component: Trade,
        beforeEnter: (to, from, next) => {
            // 必须是从购物车界面过来的才行
            if (from.path === '/shopcart') {
                next()
            } else { // 否则自动跳转到购物车界面
                next('/shopcart')
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            // 必须是从购物车界面过来的才行
            if (from.path === '/trade') {
                next()
            } else { // 否则自动跳转到购物车界面
                next('/trade')
            }
        }

    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        beforeEnter: (to, from, next) => {
            // 必须是从购物车界面过来的才行
            if (from.path === '/pay') {
                next()
            } else { // 否则自动跳转到pay界面
                next('/pay')
            }
        }
    },
    {
        path: '/center',
        component: Center,
        children: [
            {
                path: '/center/myorder',
                component: MyOrder
            },
            {
                path: 'groupbuy',
                component: GroupBuy
            },
            // 自动跳转的路由
            {
                path: '',
                redirect: '/center/myorder'
            }
        ]
    },
]