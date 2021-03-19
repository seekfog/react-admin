import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './rich_text_editor.less'
export default  class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),//构建一个初始化的富文本编辑器
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  getRichText = ()=>{
      const { editorState } = this.state;
    //   console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
      return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  render() {
    const {editorState} = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
        //   wrapperClassName="demo-wrapper"//最外侧的样式 未使用
          editorClassName="demo-editor"//编辑区的样式 可以写做editorstyle={}把less中样式写入
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
        //   disabled
        //   value={}
        /> */}
      </div>
    );
  }
}