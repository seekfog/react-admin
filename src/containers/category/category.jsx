import React, { Component } from 'react'
import {reqCategoryList,reqAddCategory,reqUpdateCategory} from '../../../src/api/index'
import { Table,Card,Button, message,Modal,Form,Icon,Input} from 'antd';
import  {saveCategory} from '../../redux/action_creators/category_action'
import {connect} from 'react-redux'
import {PAGESIZE} from '../../config/index'
@connect(
  state=>{},
  {saveCategory}
)
@Form.create()
 class Category extends Component {
    state={
        categoryList:[],
        visible:false,
        operationName:'',
        isLoading:true,
        modalCurrentValue:'',
        modalCurrentId:'',
        
    }
      
      showAddModal = () => {
        this.setState({
          modalCurrentValue:'',
          modalCurrentId:'',
          visible: true,
          operationName:'add'
        });
      };
      showUpdateModal = (item) => {
        // console.log(item)
        this.setState({
          visible: true,
          operationName:'update',
          modalCurrentValue:item.name,
          modalCurrentId:item._id
        });
      };
      toAdd= async (values)=>{
        let result = await reqAddCategory(values.categoryName)
        
        const {status,data,msg} = result.data
        if (status === 0) {
        message.success('新增分类成功')
        let categoryList = [...this.state.categoryList]
        categoryList.unshift(data)
        this.setState({categoryList})
        this.props.form.resetFields()
         //重置表单信息
      }
      
        if (status === 1) message.error (msg,1)
      }
      toUpdate= async (categoryObj)=>{
        let result = await reqUpdateCategory(categoryObj)
        const {categoryId,categoryName} = categoryObj
        const {status,msg} = result.data
        if (status === 0) {
          message.success('修改分类成功',1)
          this.getCategoryList()
          this.setState({
            visible:false,
          })
         this.props.form.resetFields()

      }else{
        message.error('修改分类失败')
      }
      }
      handleOk = () => {
        
        this.props.form.validateFields(async(err,values)=>{
          if(err) {message.warning('表单输入有误！',1)
                  return  
                  }
                    // console.log(values)
                    this.setState({
                      visible: false,
                    });
          
           if (this.state.operationName == 'add') this.toAdd(values)
           if (this.state.operationName == 'update') {
            const categoryId = this.state.modalCurrentId
            const categoryName = values.categoryName  
            const categoryObj = {categoryId,categoryName}
            this.toUpdate(categoryObj)
           }
          //  this.props.form.resetFields()
          }        
                )
        
      };
    
      handleCancel = () => {
        this.props.form.resetFields()
        this.setState({
          visible: false,
        });
      };
    getCategoryList= async ()=>{
        let result = await reqCategoryList()
        this.setState({isLoading:false})
        // console.log(result)
        let {status,data,msg} = result.data
        // data = data.map(
        //     (item)=>{
        //         return item.key = item._id
        //     }
        // )
        if(status === 0) this.setState({categoryList:data.reverse()})
        else message.error(msg,1)
        this.props.saveCategory(data)
    }
    componentDidMount(){
        this.getCategoryList()
    }
    render() {
        // const dataSource = [
        //     {
        //       key: '1',
        //       category: '洗发水',
        //       modify:'修改分类'
              
        //     },
        //     {
        //       key: '2',
        //       category: '沐浴乳',
        //       modify:'修改分类'
        //     },
        //   ];
          const { getFieldDecorator } = this.props.form;
          const dataSource = this.state.categoryList
          const columns = [
            {
              title: '商品',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              // dataIndex: 'name',
              key: 'modify',
              render:(item)=>{return <Button type='link' onClick={()=>{this.showUpdateModal(item)}} >修改信息</Button>},
              width:'25%',
              align:'center'
            }
          ];
        return (
            <div>
                 <Card  extra={<Button type='primary' icon='plus' onClick={this.showAddModal}>添加</Button>} >
                 <Table 
                 dataSource={dataSource} 
                 columns={columns} 
                 bordered 
                 rowKey='_id'
                 pagination={{pageSize:PAGESIZE,showQuickJumper:true}}
                 loading = {this.state.isLoading}
                 />
                </Card>
                <Modal
                  title={this.state.operationName === 'add' ? '新增分类':'修改分类'}
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <Form.Item>
                  {getFieldDecorator('categoryName', {
                    initialValue:this.state.modalCurrentValue,
                      rules: [{ required: true, message: '不可为空' }

                  ],
                                              })
                      (
                          <Input
                            placeholder='请输入分类名'
                          />,
                      )}
                  </Form.Item>
                          </Modal>
            </div>
        )
    }
}
export default Category