/* 
使用mockjs来mock接口
*/
import Mock from 'mockjs'
import banners from './banners.json' // 引入的是json文件(json数组), 得到的是对应的js的数组
import floors from './floors.json'
import recommend from './recommend.json'

Mock.mock('/mock/banners', { code: 200, data: banners })

// 模拟返回floors数据的接口
Mock.mock('/mock/floors', { code: 200, data: floors })

Mock.mock('/mock/recommend', { code: 200, data: recommend })

//不需要去去暴露 自动执行