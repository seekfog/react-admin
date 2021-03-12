import React, { Component } from 'react'
import {Button} from 'antd'
export default class Add_Update extends Component {
    render() {
        return (
            <div>
                我是更新或新增{this.props.match.params.id}
                 <Button onClick={()=>{this.props.history.goBack()}}>返回</Button>
            </div>
        )
    }
}
