import axios from 'axios'
import NProgress from 'nprogress'
import store from '@/store'


// instance是一个与axios功能类似的ajax请求函数
var instance = axios.create({
    baseURL: '/api', // 基础path // baseURL: 'http://182.92.128.115/api',
    timeout: 1000, // 请求超时时间
    // headers: { 'X-Custom-Header': 'foobar' } // `headers` 是即将被发送的自定义请求头
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {// 在真正发 送请求前执行
    // 在发送请求之前做些什么

    NProgress.start()
    config.headers['userTempId'] = store.state.user.userTempId
    const token = store.state.user.userInfo.token
    if (token) {
        config.headers['token'] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {// 请求成功后的回调
    // 对响应数据做点什么

    NProgress.done()

    return response.data;
}, function (error) {// 请求失败后的回调
    // 对响应错误做点什么
    /*2.1隐藏:在请求完成后的成功或失败回调中执行*/
    NProgress.done()
    /* 4.统一处理请求错误,具体请求也可以选择处理或不处理*/
    // 显示一个统一的提示
    alert(error.message || '未知错误')
    // 要么抛出error 或者返回一个失败的promise
    // throw error
    return Promise.reject(error);
});
// 向外暴露的必须是这个instance, 不能是axios
export default instance