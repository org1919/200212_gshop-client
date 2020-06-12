/*
包含项目中所有接口的ajax请求函数
函数的返回值是promise, 函数内部调用ajax模块发请求

需要掌握一个技能: 根据接口文档, 定义接口请求函数
*/
import ajax from './ajax'
import mockAjax from './mockAjax'
/*
登录
/api/user/passport/login
*/
export function reqLogin(mobile, password) {
    // 将ajax作为函数使用
    // return ajax({
    //     method: "POST",
    //     url: '/user/passport/login',
    //     data: { mobile, password }
    // })
    // 将ajax作为对象使用

    return ajax.post("/user/passport/login", { mobile, password })
}



/*
首页三级分类
/api/product/getBaseCategoryList GET
*/
// export function reqCategoryList() {
//     // 将ajax作为函数使用
//     // return ajax({
//     //     url: '/product/getBaseCategoryList',
//     // })
//     // 将ajax作为对象使用

//     return ajax.post("/product/getBaseCategoryList")
// }

export const reqCategoryList = () => ajax.get("/product/getBaseCategoryList")

/*
定义访问mock接口的接口请求函数
*/

export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')
export const reqRecommend = () => mockAjax('/recommend')

export const reqProductList = (options) => ajax.post('/list', options)

//----------------------获取商品详情--------------------------
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)