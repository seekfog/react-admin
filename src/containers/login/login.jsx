import React, { Component } from 'react'
import './login.less'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import qs from 'querystring'
import { Form, Input, Button, Icon,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import {saveUserInfo} from '../../redux/action_creators/login_action'
//登录路由组件
 class Login extends Component {
    
    //  componentDidMount(){
    //      console.log(this.props.test)
    //  }
   
    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.form.validateFields(async(err,values)=>{
           
            if(!err){
                let result =await reqLogin(values)
                // console.log(result)
                const {data,status,msg} = result.data
                if (status === 0){
                    this.props.saveUserInfo(data)
                  this.props.history.replace('/admin')
                  
              }else{
                   message.warning(msg,1)}
                       }
            
       
           
               
                // console.log(reqLogin(values))
            //   let result= await reqLogin(values)
            //    console.log(result)
            //    let result = await 
            //    console.log(result)
            //    const {status,msg,data} = result
            //    if (status === 0){
            //        console.log(data)
            //    }else{
            //         message.warning(msg,1)}
            // //    }
                
            else{
                message.error('from input wrong!')
            }
        })
    }

   
     demo=(rule,value,callback)=>{
        if(value.length<4 || value.length>12){
            callback('wrong length!')
           }
       else  callback()
            }
    

    render() {
        const { getFieldDecorator } = this.props.form;
        const {isLogin} = this.props
        if(isLogin)
            return  <Redirect to='/admin/' />
        else
        return (
            <div className='login'>
                <header className='login-header'>
                    <h1>welcome to react!{this.props.demo}</h1>
                </header>

                <section className='login-content'>
                    <h2>Login</h2>
                    <div>
                     <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
        {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' },
            { max: 12, message: 'ban max' },
            { min: 4, message: 'ban min' },
            { pattern: /^\w+$/, message: 'ban incorrect' }
        ],
                                     })
            (
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 placeholder="Username"
                />,
             )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ validator: this.demo }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>   
            <Form.Item>       
                  <Button type="primary" htmlType="submit" className="login-form-button">
                                Login
               </Button>
            </Form.Item>
                     </Form>
                    </div>
                </section>
               
            </div>
        )
    }
}
export default 
connect(
    state=>({isLogin:state.userInfo.isLogin}),
    {
        saveUserInfo
    }
)(Form.create()(Login)) 