import React,{Component} from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import {reqDelPicture} from '../../api/index'
import {BASE_URL} from '../../config/index'
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,//是否展示预览窗
    previewImage: '',//要预览的图片的url地址或者base64编码
    fileList: [
      // { 
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',//表示图片的状态：uploading done removed error
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',//图片的缩略图
      // },
      // // {
      //   uid: '-5',
      //   name: 'image.png',
      //   status: 'error',
      // },
    ],//收集好的需要上传的文件
  };
  getImgArr=()=>{
    let result = []
    this.state.fileList.forEach((item)=>{
      result.push(item.name)
    })
    // console.log(result)
    return result
    
  }
  //关闭预览窗口
  handleCancel = () => this.setState({ previewVisible: false });
  //展示预览窗口
  handlePreview = async file => {
    //如果图片没有url也没有转换过base64，则调用方法转换为base64，
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  //当图片状态发生改变的回调
  handleChange = async ({ file,fileList }) => {
   if(file.status === 'done'){
    fileList[fileList.length-1].url = file.response.data.url //将图片地址从base64修改为server url
    // file.url = file.response.data.url
    fileList[fileList.length-1].name = file.response.data.name //将图片name修改为服务器中的name 
    // console.log(fileList)
   }
   if(file.status == 'removed'){
     let result = await reqDelPicture(file.name)
     const {status,data} = result.data
    // console.log(result)
    //  console.log(status)
    if (status === 0) message.success('图片删除成功！')
    else message.warning('图片删除失败！')
   }
    // console.log(file)
    this.setState({ fileList });
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`${BASE_URL}/manage/img/upload`}//服务器地址
          method = 'post'
          name = 'image'
          listType="picture-card"//照片墙样式
          fileList={fileList}//图片列表
          onPreview={this.handlePreview}//点击预览按钮的回调
          onChange={this.handleChange}//图片状态改变的回调
        >
          {fileList.length >= 6 ? null : uploadButton}     
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}