import ajax from './ajax'

// 登录
export function reqLogin(mobile, password) {
    return ajax({
        url: '/user/passport/login',
        method: "POST",
        data: { mobile, password }
    })
}

//首页三级分类
export function reqCategorys() {
    return ajax('/product/getBaseCategoryList')
}