import axios from 'axios'
import NProgress from 'nprogress'

// 创建instance
const instance = axios.create({
    baseURL: '/api',
    timeout: 15000
})

// 注册请求拦截器
axios.interceptors.request.use(config => {
    NProgress.start()
    return config
})

// 注册响应拦截器
axios.interceptors.response.use(
    response => {
        NProgress.done()

        return response.data
    },
    error => {
        NProgress.done()
        alert(error.message || '未知错误')
        return Promise.reject(error) // throw error
    }
)
// 暴露instance
export default instance