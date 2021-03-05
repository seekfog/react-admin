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
//添加商品分类
export const reqAddCategory=(categoryName)=>
    myAxios.post(`${BASE_URL}/manage/category/add`,{parentId:0,categoryName})
//更新商品分类{
export const reqUpdateCategory=({categoryId,categoryName})=>
    myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})