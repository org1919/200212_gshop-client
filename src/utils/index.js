import { v4 as uuidv4 } from 'uuid';

export function getUserTempId() {
    let userTepmId = localStorage.getItem('USER_TEMP_ID_KEY')
    if (!userTepmId) {
        userTepmId = uuidv4()
        localStorage.setItem("USER_TEMP_ID_KEY", userTepmId)
    }
    return userTepmId
}

/* 
保存用户信息到local
*/
export function saveUserInfo(userInfo) {
    window.localStorage.setItem('USER_INFO_KEY', JSON.stringify(userInfo))
}

/* 
读取local中保存的用户信息, 返回userInfo对象或者空对象
*/
export function getUserInfo() {
    return JSON.parse(window.localStorage.getItem('USER_INFO_KEY')) || {}
}

/* 
删除local中保存的用户信息
*/
export function removeUserInfo() {
    window.localStorage.removeItem('USER_INFO_KEY')
}