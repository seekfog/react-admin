import { Button, Icon , Modal} from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import menuList from '../../../config/nav_config'
import {withRouter} from 'react-router-dom'
import {deleteUserInfo} from '../../../redux/action_creators/login_action'


import './css/header.less'
const { confirm } = Modal
@connect(
    state=>({userInfo:state.userInfo,
             titleInfo:state.titleInfo   
    }),
        
    {deleteUserInfo}
)
@withRouter
 class Header extends Component {
    state={
        isfull:false,
        date:dayjs().format('YYYY年 MM-DD HH:mm:ss '),
        title:''
    }
    fullscreen=()=>{
        screenfull.toggle()
    }
    //根据路由属性中地址的信息匹配titile
    getTitle=()=>{
        let pathKey=this.props.location.pathname.split('/').reverse()[0]
        if (this.props.location.pathname.indexOf('product') !== -1) pathKey = 'product'
        let title = ''
        menuList.forEach(
            (item)=>{
                if(item.children instanceof Array){
                    let tmp = item.children.find(
                        (citem)=>{
                            return citem.key === pathKey
                        }
                    )
                    if (tmp) title=tmp.title
                }else{
                    if (pathKey === item.key) title = item.title
                }
            }
        )
       this.setState({title})
    }
    //退出登陆的回掉
    handleLogout=()=>{
        confirm({
            title: 'Do you want to logout ?',
            content: 'When clicked the OK button, this app will be closed after 1 second',
            onOk:()=>{
                this.props.deleteUserInfo()
            }
          });
        
    }
    //全屏的回掉，时间的计时器
    componentDidMount(){
        screenfull.on('change',()=>{
            let isfull = ! this.state.isfull
            this.setState({isfull})
        })
        this.timeID = setInterval(
             () => {
                this.setState({date:dayjs().format(' YYYY年 MM-DD HH:mm:ss ')})
            },
            1000
        )
        this.getTitle();
    }
    //清除计时器
    componentWillUnmount(){
        clearInterval(this.timeID)
    }
    render() {
        let {isfull} = this.state
        return (
                
                <header className='header'>
                    <div className='header-top'>
                        <Button size='small' onClick={this.fullscreen}>
                            <Icon type={isfull? 'fullscreen-exit':'fullscreen'} style={{fontSize:'20px'}} />
                        </Button>
                            <span className='username'>welcome,{this.props.userInfo.username}</span>
                            <Button type='link' onClick={this.handleLogout}>Logout</Button>    
                    </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                      { this.props.titleInfo || this.state.title }
                    </div>
                    <div className='header-bottom-right'>
                        {this.state.date || this.props.titleInfo}
                        {/* <img src='http://api.map.baidu.com/images/weather/day/qing.png' alt='day'/>
                         温度：2 ~ -5 */}
                        
                    </div>
                </div>
                </header>
         
        )
    }
}
export default Header
