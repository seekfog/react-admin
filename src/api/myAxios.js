import axios from 'axios'
import {message} from 'antd'
const instance = axios.create({
    timeout:4000,
});
//请求拦截器
instance.interceptors.request.use(function (config) {
    // console.log(config)
    return config;
  
  });

//响应拦截器
instance.interceptors.response.use(function (response) {
    // message.info('login success')
    return response.data;
  }, function (error) {
    message.error(error.message,1)
    return new Promise(  () => {}
    )
  });
  export default instance;