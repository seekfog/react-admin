import { message } from 'antd'
// import myAxios from './myAxios'
import {BASE_URL} from '../config'
import myAxios from './myAxios'
//项目中所有API请求存放
//发起登录请求
export const reqLogin = (value)=>
    myAxios.post(`${BASE_URL}/login`,value) 
    
