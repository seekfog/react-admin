import React, { Component } from 'react'
import {connect} from 'react-redux'
import {reqCategoryList,reqAddProduct} from '../../api/index'
import { Table,Card,Button, message,Modal,Form,Icon,Input,Select} from 'antd';
import PicturesWall from './picture_wall'
import RichTextEditor from './rich_text_editor'
const {Item}=Form
const {Option}=Select
@connect(
    state=>({
        categoryList:state.categoryInfo,
        productList:state.prodInfo
    }),
    {}
)
@Form.create()
class Add_Update extends Component {
    state={
        categoryList:[],
        operateType:'add',
        categoryId :'',
        name:'',
        desc:'',
        price:'',
        detail:'',
        imgs:[],
        _id:''
    }
    //表单提交的回调
    handleSubmit=(event)=>{
        event.preventDefault()
        let detail = this.refs.richtext.getRichText()
        let imgs = this.refs.picturewall.getImgArr()
        this.props.form.validateFields(async(err,values)=>{
           if (err) return
           let productObj = {...values,imgs,detail}
           console.log(productObj)
        //    let result = await reqAddProduct(productObj)
        //    console.log(result)
        })
    }
    //redux中没有商品分类列表时的回调
    getCategoryList=  async()=>{
    let result = await reqCategoryList()
    const {status,data,msg} = result.data
    // console.log(status)
    if (status === 0) this.setState({categoryList:data})
    else message.error('网络加载失败')    
    }
    componentDidMount(){
        //从redux中拿到商品类别
        const {id} = this.props.match.params
        const {categoryList} = this.props
        // console.log(this.props.categoryList)
        //发送网络请求拿到商品类别
        if (categoryList.length) this.setState({categoryList:this.props.categoryList})
        else this.getCategoryList()
        if(id) this.setState({operateType:'update'})
        console.log(this.props.productList)
    }
    render() {
        //配置表单选项界面比例
        const formItemLayout = {
            labelCol: {
              xs: { span: 2 },
              sm: { span: 2 },
              md: { span: 2 },
            },
            wrapperCol: {
              xs: { span: 2 },
              sm: { span: 2 },
              md: { span: 15},
            },
          };
        const {categoryList} = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {/* 我是更新或新增{this.props.match.params.id}
                 <Button onClick={()=>{this.props.history.goBack()}}>返回</Button> */}
                  <Card title={this.state.operateType === 'add' ? '商品添加':'商品修改'} extra={<Button type='primary' 
                  onClick={()=>{this.props.history.goBack()}}>返回</Button>} >
                            
                    <Form onSubmit={this.handleSubmit}
                     className="login-form"
                     labelCol={formItemLayout.labelCol}
                     wrapperCol={formItemLayout.wrapperCol}
                     >
                        <Item label='商品名称'>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入商品名称!' }],
                        })(
                            <Input
                            
                            placeholder="商品名称"
                            />,
                        )}
                        </Item>
                        <Item label='商品描述'>
                        {getFieldDecorator('desc', {
                            rules: [{ required: true, message: '请输入商品描述!' }],
                        })(
                            <Input
                           
                            placeholder="商品描述"
                            />,
                        )}
                        </Item>
                        <Item label='商品价格'>
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: '请输入商品价格!'  }],
                        })(
                            <Input
                            placeholder="商品价格"
                            // prefix = '￥'
                            addonBefore = '￥'
                            addonAfter = 'RMB'
                            type='number'
                            />,
                        )}
                        </Item>
                        <Item label='商品分类'>
                        {getFieldDecorator('categoryId', {
                            rules: [{ required: true, message: '请输入商品分类!' }],
                        })(
                            <Select>
                                <Option value='moren'> 请选择分类 </Option>
                                {
                                    categoryList.map(
                                        (item)=>{
                                            return <Option key={item._id} value={item._id}>{item.name}</Option> 
                                        }
                                    )
                                }
                            </Select>
                        )}
                            
                        {/* {getFieldDecorator('productprice', {
                        //     rules: [{ required: true, message: '请输入商品分类!' }],
                        // })(
                        //     <Input
                        //     prefix={<Icon type="wechat"  />}
                        //     placeholder="商品分类"
                        //     />,
                        // // )} */}
                       
                        </Item>
                        <Item label='商品图片'>
                        <PicturesWall ref='picturewall'/>
                        </Item>
                        <Item label='商品详情'>
                        <RichTextEditor ref='richtext'/>
                        </Item>
                        <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            提交
                        </Button>
                        </Item>                     
                       
                    </Form>
                    </Card>
            </div>
        )
    }
}
export default Add_Update