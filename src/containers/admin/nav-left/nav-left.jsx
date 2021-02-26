import React, { Component } from 'react'
import menuList from '../../../config/nav_config'
import {Link,withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import {saveTitle} from '../../../redux/action_creators/menu_action'
import { Menu, Icon, Button } from 'antd';
const { Item ,SubMenu} = Menu;
@connect(
  state=>({}),
  {
    saveTitle
    }
)
@withRouter
 class Navleft extends Component {
  //  save = () => {
  //     this.props.saveTitle()
  //  }
   
  createMenu=(target)=>{
    return target.map( (item) => {
      {if(!item.children){
         return (<Item key={item.key} onClick={()=>{return this.props.saveTitle(item.title)}}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>)
      }
      else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
               <Link to={item.path}>  
                <Icon type={item.icon} />
                <span>{item.title}</span>
                </Link>
              </span>
            }
          >
            {this.createMenu(item.children)}
          </SubMenu>
        )
            
      }}
      
  }
  )
  }
    render() {
        return (
            <div>
                <div style={{fontSize:'25px'}}>
                    commodity management
                </div>
        {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button> */}
        <Menu
          defaultSelectedKeys={this.props.location.pathname.split('/').reverse()[0]}
          defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
          mode="inline"
          theme="dark"
        //   inlineCollapsed={this.state.collapsed}
        >
            {
              this.createMenu(menuList)
            }          
        </Menu>
      </div>
        )
    }
}
export default Navleft