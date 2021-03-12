import {Button,Card,List, message } from 'antd'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import './detail.less'
const {Item} = List
@connect(
    state=>({productList:state.prodInfo})
)
 class Detail extends Component {
     state={
        categoryId:'',
        desc:'',
        detail:'',
        imgs:'',
        name:'',
        price:'',
     }
    componentDidMount(){
        // console.log(this.props.productList)
        const reduxProdList = this.props.productList
        const {id} = this.props.match.params
        // console.log(this.props.productList)
        let result = reduxProdList.find((item)=>{
            return item._id === id
        })
        if (result){
        const {categoryId,desc,detail,imgs,name,price} = result
        this.setState({categoryId,desc,detail,imgs,name,price})
        
        }
        else message.error('redux初始化数据失败')
        
    }
    render() {
        console.log(this.state)
        const {name,desc,price,categoryId,imgs,detail} = this.state
        return (
            <div>
                 <Card 
                 extra={ <Button type='primary' onClick={()=>{this.props.history.goBack()}}>返回</Button> }
                 title="商品详情" 
                 >
                <List> 
                    <Item><span className='prod-name'>商品名称：</span>{name}</Item>
                    <Item><span className='prod-name'>商品描述：</span>{desc}</Item>
                    <Item><span className='prod-name'>商品价格：</span>{price}</Item>
                    <Item><span className='prod-name'>商品分类：</span>{categoryId}</Item>
                    <Item><span className='prod-name'>商品图片：</span>{imgs}</Item>
                    <Item><span className='prod-name' >商品详情：</span>{detail}{this.props.match.params.id}<span></span></Item>
                    {/* <Item><span className='prod-name' dangerouslySetInnerHTML={{__html:detail}}>商品详情：</span>{this.props.match.params.id}<span></span></Item> */}
                </List>
                
                </Card>
              
               
            </div>
        )
    }
}
export default Detail