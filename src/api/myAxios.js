import axios from 'axios'
import NProgress from 'nprogress'
import {message} from 'antd'
import 'nprogress/nprogress.css'
const instance = axios.create({
    timeout:4000,
});
// 请求拦截器
instance.interceptors.request.use(function (config) {
    // console.log(config)
    NProgress.start()
    return config;  
  });
//响应拦截器
instance.interceptors.response.use(function (response) {
    // message.info('login success')
    NProgress.done()
    return response;
  }, function (error) {
    message.error(error.message,1)
    return new Promise( () => {})
  });
  export default instance;