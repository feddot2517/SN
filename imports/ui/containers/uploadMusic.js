import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Upload, Icon, message, Button, Input, Spin} from 'antd';
import './css/profile.css';
import Music from "../../models/music";

import './css/upload'


class uploadMusic extends Component {

    state={
        loadingFile: null,
        trackName: "",
        loadingProgress: null,
    };


    addMusic = () => {
        const file = this.state.loadingFile;
        let uploadProgress=null;
        Music.insert({
            file: file,
            onUploaded(error, fileObj) {
                if (error) {
                    message.error('Error during upload: ' + error);
                } else {
                    message.success('File "' + fileObj.name + '" successfully uploaded');
                }
            },

            onProgress(progress, fileObj){
                message.info(progress+"%");
            },
            streams: 'dynamic',
            chunkSize: 'dynamic',
            meta:{trackName: this.state.trackName}
        });


    };

    onChange = e => {
        this.setState({trackName: e.target.value})
    };


    onChangeHandler=event=>{
        this.setState({loadingFile: event.target.files[0]});
    };


    render() {

        if (!this.props.currentUser)
            return (<div className="loadingBox">
                <Spin tip="Loading...">
                </Spin>
            </div>);

        const uploadButton = (
            <div>
                <Icon type={this.state.loadingFile ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>

                <div style={{marginBottom: 20}}>
                    <Input
                        prefix={<Icon type="message" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="message"
                        placeholder="Input track name here"
                        onChange={this.onChange}
                        onPressEnter={()=>this.addMusic()}
                        style={{width: 1000, marginRight: 10}}
                    />
                </div>

                <div>
                    {!this.state.loadingFile?
                        <div>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Select file
                            </label>
                            < input id="file-upload" type="file" onChange={this.onChangeHandler}/>
                        </div>:

                        <div style={{display: "inline-block", marginRight:5}}>{this.state.loadingFile.name}
                            <Button type="danger" onClick={()=>this.setState({loadingFile: null})}>X</Button>
                        </div>}
                    {this.state.loadingFile&&this.state.trackName&&
                            <div>
                                <Button onClick={()=>this.addMusic()}>Load</Button>
                            </div>
                    }

                    {this.state.loadingProgress&&
                    <div style={{width: this.state.loadingProgress, height: 10, background:"green"}}>

                    </div>}
                </div>

            </div>
        );
    }
}
export default withTracker(()  => {

    const currentUser = Meteor.user();
    if (!currentUser)
        return {};

    return {
        currentUser: currentUser,
    }
})(uploadMusic);

