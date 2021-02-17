import React, { Component } from 'react'
import {connect} from 'react-redux'
import {action1} from '../../redux/action_creators/test_action'
 class Admin extends Component {
    componentDidMount(){
        console.log(this.props.demo,this.props.demo1(222))
    }
    render() {
        return (
            <div>
                Admin
            </div>
        )
    }
}
export default connect(
    state=>({demo:state.test}),
    {
        demo1:action1
    }
)(Admin)