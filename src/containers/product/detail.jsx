import {Button,Card,List, message } from 'antd'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import './detail.less'
const {Item} = List
@connect(
    state=>({productList:state.prodInfo,
             categoryList:state.categoryInfo                   
    })
)
 class Detail extends Component {
     state={
        categoryId:'',
        categoryName:'',
        desc:'',
        detail:'',
        imgs:'',
        name:'',
        price:'',
        isLoading:true,
     }
    componentDidMount(){
        //从redux中获取商品列表
        // console.log(this.props.productList)
        // console.log(this.props.categoryList)
        const reduxCateList = this.state.categoryInfo
        const reduxProdList = this.props.productList
        const {id} = this.props.match.params
        // console.log(this.props.productList)
        let result = reduxProdList.find((item)=>{
            return item._id === id
        })
        if (result){
            this.categoryId = result.categoryId
            this.setState({...result})
        // const {categoryId,desc,detail,imgs,name,price} = result
        // this.setState({categoryId,desc,detail,imgs,name,price})
        
        }
        else message.error('redux初始化数据失败')
        if(reduxCateList){
            let result = reduxCateList.find(
                (item)=>{
                    return item._id === this.categoryId
                }
            )
        }
        this.setState({categoryName:result.name,isLoading:false})
    }
    render() {
        // console.log(this.state)
        const {name,desc,price,categoryId,imgs,detail,categoryName} = this.state
        return (
            <div>
                 <Card 
                 extra={ <Button type='primary' onClick={()=>{this.props.history.goBack()}}>返回</Button> }
                 title="商品详情"
                 isLoading = {this.state.isLoading}
                 >
                <List > 
                    <Item><span className='prod-name'>商品名称：</span>{name}</Item>
                    <Item><span className='prod-name'>商品描述：</span>{desc}</Item>
                    <Item><span className='prod-name'>商品价格：</span>{price}</Item>
                    <Item><span className='prod-name'>商品分类：</span>{categoryName}</Item>
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