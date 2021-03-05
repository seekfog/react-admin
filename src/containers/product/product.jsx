import React, { Component } from 'react'
import { Card,Button,Select,Input,Icon,Table } from 'antd';
const {Option} = Select

export default class Product extends Component {
    render() {
        const dataSource = [
            {
              key: '1',
              name: 'xiaomi phone',
              desc: '为发烧而生',
              price:4999,
              status:'在售',
              operate: 'ss',
            },
            {
                key: '2',
                name: 'huawei phone',
                desc: 'make impossible',
                price:4999,
                status:'在售',
                operate: 'bb',
              },
            
          ];
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
                dataIndex: 'status',
                key: 'status',
                align:'center',
                width:'8%',
                render: status =>{
                    return (
                        <div><Button type='primary'>下架</Button><br/>
                        <span>{status}</span>
                            </div>
                        
                    )
                } 
              },
              {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                align:'center',
                width:'8%',
                render: () =>{
                    return (
                        <div>
                            <Button type='link'>详情</Button><br/>
                            <Button type='link'>修改</Button><br/>
                        </div>
                        
                    )
                } 
              },
          ];
        return (
            <Card 
            title={
            <div>
            <Select defaultValue="name"  >
                    <Option value="name">按照商品名称搜索</Option>
                    <Option value="desc">按照商品描述搜索</Option>
                    </Select>
                    <Input 
                    style={{margin:'10px',width:'20%' }} 
                    placeholder=""
                    allowClear
                    />
                    <Button type="primary"><Icon type='search' />搜索</Button>
                    </div>
                    }
            
            extra={<Button type="primary"><Icon type='plus' />新增商品</Button>} >
            <Table dataSource={dataSource} columns={columns} bordered/>
            </Card>
        )
    }
}
