import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

new Vue({
  // el: "#app",
  render: h => h(App),
  router //配置路由器 ==> 所有的组件都可以通过$router属性得到路由对象
}).$mount("#app")