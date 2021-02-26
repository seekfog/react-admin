import React, { Component } from 'react'
import {reqCategoryList} from '../../../src/api/index'
import { Table,Card,Button, message} from 'antd';
import {PAGESIZE} from '../../config/index'
export default class Category extends Component {
    state={
        categoryList:[]
    }
    getCategoryList= async ()=>{
        let result = await reqCategoryList()
        console.log(result)
        let {status,data,msg} = result.data
        // data = data.map(
        //     (item)=>{
        //         return item.key = item._id
        //     }
        // )
        
        if(status === 0) this.setState({categoryList:data})
        else message.error(msg,1)
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
          const dataSource = this.state.categoryList
          const columns = [
            {
              title: '商品',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              dataIndex: 'cotegory',
              key: 'modify',
              render:()=>{return <Button type='link' >修改信息</Button>},
              width:'25%',
              align:'center'
            }
          ];
        return (
            <div>
                 <Card  extra={<Button type='primary' icon='plus' >添加</Button>} >
                 <Table 
                 dataSource={dataSource} 
                 columns={columns} 
                 bordered 
                 rowKey='_id'
                 pagination={{pageSize:PAGESIZE}}
                 />;
                </Card>
                
            </div>
        )
    }
}
