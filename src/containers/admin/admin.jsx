import { message } from 'antd'
import {Redirect,Route,Switch} from 'react-router-dom'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteUserInfo} from '../../redux/action_creators/login_action'
import './css/admin.less'
import Header from './header/header'
import Bar from '../bar/bar'
import Line from '../line/line'
import Category from '../category/category'
import Pie from '../pie/pie'
import User from '../user/user'
import Role from '../role/role'
import Product from '../product/product'
import Home from '../../components/Home'
import { Layout } from 'antd';
import Navleft from './nav-left/nav-left'
const { Footer, Sider, Content } = Layout;
    class Admin extends Component {
        componentDidMount(){
            // console.log(this.props)
        }
        handleButton=()=>{
            this.props.deleteUserInfo()
        }
    render() {
        const {username,isLogin} = this.props.userInfo
        if(!isLogin){
            message.warning('please login')
            // this.props.history.replace('/login')
            return <Redirect to='/login' />
        }
        else{
            return (
                <Layout className='admin'>
                    <Sider className='sider'><Navleft /></Sider>
                    <Layout>
                        <Header/>
                        <Content className='content'>
                        <Switch>
                            <Route path='/admin/charts/bar'  component={Bar}  />
                            <Route path='/admin/charts/line'  component={Line}  /> 
                            <Route path='/admin/pie'  component={Pie}  /> 
                            <Route path='/admin/prod_about/category'  component={Category}  />
                            <Route path='/admin/prod_about/product'  component={Product}  />
                            <Route path='/admin/role'  component={Role}  />
                            <Route path='/admin/home'  component={Home}  />
                            <Route path='/admin/user'  component={User}  />
                            <Redirect to='/admin/home'/>
                        </Switch>
                        </Content>
                        <Footer className='footer'>欢迎来到德莱联盟</Footer>
                    </Layout>
                </Layout>
               
          
        )}
    }
}
export default connect(
    state=>({userInfo:state.userInfo}),
    {
        deleteUserInfo
    }
)(Admin)