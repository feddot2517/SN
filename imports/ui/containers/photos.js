import React, {Component} from 'react';
import {withTracker} from "meteor/react-meteor-data";
import Profile from "../../models/profile";
import Friend from "../../models/friend";
import News from "../../models/news";
import {Spin, Button, Card, Icon, Input, message} from "antd";
import './css/profile.css';
import Avatar from "../../models/avatar";
import Activity from "../../models/activity";

// App component - represents the whole app
class photos extends Component {

    deletePhoto=(base64 , username)=> {
        Meteor.call("delPhoto", base64, username)
    }


    render() {

        if (!this.props.currentUser)
            return (<div className="loadingBox">
                <Spin tip="Loading...">
                </Spin>
            </div>);


        return (
            <div>
                {/*PHOTOS*/}
                {this.props.photos &&
                <div className='block'>
                    <div className='sideTitle'>{this.props.match.params.id}'s photo</div>
                    {!this.props.photos.length && <div style={{textAlign: 'center'}}>
                        No photo yet(</div>}
                    {this.props.photos && this.props.photos.map((photo, id) => (
                        <div onClick={()=>this.props.history.push(`/photos/${this.props.match.params.id}`)} key={id} style={{width:'100%', margin: '0', display:'inline-block'}}>
                            {this.props.match.params.id === this.props.currentUser.username &&
                            <Button style={{float:"right"}} onClick={()=>this.deletePhoto(photo.base64, this.props.currentUser.username)} type="danger">X</Button>}
                            <img style={{width:'100%', marginBottom: 100}} src={photo.base64} alt="activity"/>
                        </div>

                    ))}
                </div>}
            </div>
        );
    }
}

export default withTracker((props) => {
    const {id} = props.match.params;

    const currentUser = Meteor.user();
    if (!currentUser)
        return {};

    return {
        currentUser: Meteor.user(),
        photos: Activity.find({username: id}).fetch(),
    }
})(photos);

