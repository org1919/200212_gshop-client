import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
import TypeNav from './components/TypeNav/index'
import Carousel from './components/Carousel'
import "swiper/css/swiper.min.css";
import Pagination from './components/Pagination'
import VurLazyload from 'vue-lazyload'

import * as API from '@/api'

import '@/mock/mockServer'  // 引入加载
import './validate' // 引入表单校验
import './elements'

import loading from './assets/images/loading.gif'

Vue.use(VurLazyload, {
    loading,
})


// 注册全局组件(所有组件都可以使用了)
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)

Vue.prototype.$API = API

new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    render: h => h(App),
    router,
    store
}).$mount("#app")
