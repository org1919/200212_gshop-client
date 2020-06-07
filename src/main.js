import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app")