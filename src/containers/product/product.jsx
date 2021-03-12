import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Card,Button,Select,Input,Icon,Table, message,Modal } from 'antd';
import {reqProductList,reqUpdateProductStatus,reqSearchProduct} from '../../api'
import {saveProdList} from '../../redux/action_creators/prod_action'
import {PAGESIZE} from '../../config'
const {Option} = Select
const{confirm} = Modal
@connect(
    state=>({}),
    {saveProdList}
)
 class Product extends Component {
    state = {
        total:0,
        ProductList:[],//商品列表
        current:1,//当前所在页面
        keyWord:'',//搜索关键字
        searchType:'prductName'
    }
    //确认操作的回掉函数
    showConfirm =(a,b)=>{
        //赋值this
        const that = this
        confirm({
          title: '确定要这么操作嘛?',
          content: '此操作会立即生效',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
              //调用更新商品状态函数
            that.updateProductStatus(a,b)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    //更新商品状态的回掉
    updateProductStatus=async(productId,status)=>{
        // console.log(productId,status)
        let ProductList = [...this.state.ProductList]
        if (status === 1) status =2
        else status = 1
        let result = await reqUpdateProductStatus(productId,status)
        // console.log(result)
        if (result.data.status === 0){
            message.success('success')
            // this.getProductList()
            ProductList.map(
                (item)=>{
                    // console.log(item)
                    if (item._id === productId){
                       item.status = status
                    }
                    return item
                }
            )
            this.setState({ProductList})
        } 
    }



    //搜索商品以及获取商品列表
    getProductList = async(number = 1)=>{
        let result
        // console.log(this.isSearch)
        const {searchType,keyWord} = this.state
        if (this.isSearch) result = await reqSearchProduct({pageNum:number,pageSize:PAGESIZE,searchType,keyWord})
        else result = await reqProductList(number,PAGESIZE)
        const {data,status} = result.data
        // console.log(data)
        if (status == 0) {this.setState({
            ProductList:data.list,
            total:data.total,
            current:data.pageNum
        })
        console.log(data.list)
        this.props.saveProdList(data.list)
        
    }
        else message.error('获取失败!')
    }
    componentDidMount(){
        this.getProductList()
    }
    //搜索的回调 整合至getproductlist
    // search= async()=>{
    //     const {searchType,keyWord} = this.state
    //     let result = await reqSearchProduct({pageNum:1,pageSize:PAGESIZE,searchType,keyWord})
    //     console.log(result.data.data.list)
        
    //     this.setState({ProductList:result.data.data.list})
    // }
    //将isSearch设置true用于辨别搜索
    search= async() => {
        this.isSearch = true
        this.getProductList()
    }

    render() {
        // const dataSource = [
        //     {
        //       key: '1',
        //       name: 'xiaomi phone',
        //       desc: '为发烧而生',
        //       price:4999,
        //       status:'在售',
        //       operate: 'ss',
        //     },
        //     {
        //         key: '2',
        //         name: 'huawei phone',
        //         desc: 'make impossible',
        //         price:4999,
        //         status:'在售',
        //         operate: 'bb',
        //       },
            
        //   ];
        const dataSource = this.state.ProductList
          const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
              width:'10%',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
              align:'center',
            },
            {
              title: '价格',
              dataIndex: 'price',
              key: 'price',
              align:'center',
              width:'8%',
              render:price=>'￥'+price
            },
            {
                title: '状态',
                // dataIndex: 'status',
                key: 'status',
                align:'center', 
                width:'8%',
                //传入item为表格每一项的具体信息
                render: (item) =>{
                    return (
                        <div><Button 
                        type={item.status==1 ? 'danger':'primary'}
                        onClick = {
                            ()=>this.showConfirm(item._id,item.status)
                            // ()=>this.updateProductStatus(item._id,item.status) 
                        }
                        >{item.status==1 ? '下架':'上架'}</Button><br/>
                        <span>{item.status==1 ? '在售':'停售'}</span>
                            </div>
                    )
                } 
              },
              {
                title: '操作',
                // dataIndex: 'operate',
                key: 'operate',
                align:'center',
                width:'8%',
                render: (item) =>{
                    return (
                        <div>
                            <Button type='link' onClick={()=>this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}>详情</Button><br/>
                            <Button type='link' onClick={()=>this.props.history.push('/admin/prod_about/product/add_update/2222')}>修改</Button><br/>
                        </div>
                        
                    )
                } 
              },
          ];
        return (
            <Card 
            title={
            <div>
            <Select defaultValue="productName"  onChange = {value=>this.setState({searchType:value})}>
                    <Option value="productName">按照商品名称搜索</Option>
                    <Option value="productDesc">按照商品描述搜索</Option>
                    </Select>
                    <Input 
                    style={{margin:'10px',width:'20%' }} 
                    placeholder=""
                    allowClear
                    onChange = {event=>this.setState({keyWord:event.target.value})}
                    />
                    <Button type="primary" onClick={this.search}><Icon type='search' />搜索</Button>
                    </div>
                    }
            
            extra={<Button type="primary" onClick={()=>this.props.history.push('/admin/prod_about/product/add_update')}><Icon type='plus' />新增商品</Button>} >
            <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey='_id'
            pagination = {{
                total:this.state.total,
                pageSize:PAGESIZE,
                onChange:this.getProductList,
                current:this.state.current
                
            }}
            />
            </Card>
        )
    }
}
export default Product