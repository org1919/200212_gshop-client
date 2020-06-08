import Home from '@/pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'

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
        },
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
]