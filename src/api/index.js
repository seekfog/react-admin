import { message } from 'antd'
// import myAxios from './myAxios'
import axios from 'axios'
//项目中所有API请求存放
//发起登录请求
export const reqLogin = (value)=>{
    axios.post('http://120.55.193.14:5000/login',value) 
    .then((result)=>{
        if(result.data.status === 0){
            message.info('login success')
        }
        else{
            message.info('wrong username or password!')
        }
    })
    .catch((reason)=>{
        message.info('bad login')
    })
}
