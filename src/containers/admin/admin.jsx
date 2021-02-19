import { message } from 'antd'
import {Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteUserInfo} from '../../redux/action_creators/login_action'
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
            <div>
               welcom {this.props.userInfo.username}
               <button onClick={this.handleButton}>LOGOUT</button>
            </div>
        )}
    }
}
export default connect(
    state=>({userInfo:state.userInfo}),
    {
        deleteUserInfo
    }
)(Admin)