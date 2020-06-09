import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
import TypeNav from './components/TypeNav/index'
import Carousel from './components/Carousel'
import "swiper/css/swiper.min.css";

import '@/mock/mockServer'  // 引入加载

// 注册全局组件(所有组件都可以使用了)
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app")
