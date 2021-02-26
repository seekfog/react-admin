import { message } from 'antd'
// import myAxios from './myAxios'
import {BASE_URL} from '../config'
import myAxios from './myAxios'
import axios from 'axios'
//项目中所有API请求存放
//发起登录请求
export const reqLogin = (value)=>
    myAxios.post(`${BASE_URL}/login`,value) 
//获取商品列表
export const reqCategoryList=()=>
    myAxios.get(`${BASE_URL}/manage/category/list`)
