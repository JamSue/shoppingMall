// 通过mockjs插件实现模拟数据

//1.引入mockjs模块
import Mock from 'mockjs'

// 2.引入数据
//json数据格式直接引入 不用对外暴露
// webpack默认对外暴露的资源: 图片,JSON数据
import banner from './banner.json'
import floor from './floor.json'


// 3.模拟数据: 第一个参数为请求地址,第二个参数为
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});