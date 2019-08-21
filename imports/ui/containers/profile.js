import React, { Component } from 'react';
import {withTracker} from "meteor/react-meteor-data";
import Profile from "../../models/profile";
import Friend from "../../models/friend";
import News from "../../models/news";
import {message ,Button, Card, Icon, Input} from "antd";
import './css/profile.css';
import Avatar from "../../models/avatar";
import Activity from "../../models/activity";

// App component - represents the whole app
class profile extends Component {

    state = {
        newsText:"",
    };


    delNews = newsText => {
        Meteor.call("delNews", newsText)
    };

    delFriends = (targetId) => {
        Meteor.call("delFriend", targetId);
    };

    addNews = e => {
        Meteor.call('addNews', this.props.currentUser&&this.props.currentUser.username, this.state.newsText);
        this.setState({newsText: ""});
        message.success('News added');
    };

    onChangeInputTextNews = e => {
      this.setState({newsText: e.target.value})
    };

    render() {
        console.log(this.props.photos);
        return (
            <div>

                {this.props.avatar?
                <div className="avatar">
                    <img src={this.props.avatar.base64} alt="avatar" />
                </div>:""}

                <div className="newsBlock">
                    <div>News:</div>
                    <div className="inputForm">
                        {this.props.match.params.id === this.props.currentUser.username?
                            <div>
                                <Input prefix={<Icon type="user"/>}
                                       placeholder="Say anything, PLEASE!"
                                       onChange={this.onChangeInputTextNews}/>
                                <Button onClick={this.addNews}>+</Button>
                            </div>:""}
                    </div>
                </div>

                    <div className="newsMap">
                        {this.props.news && this.props.news.map((news, id) => (
                            <Card key={id}>
                                <div
                                >
                                    <div>
                                        {news.createdAt.toDateString()}
                                    </div>

                                    <div>
                                        {news.createdAt.toLocaleTimeString()}
                                    </div>

                                    <div className="news">
                                        {news.newsText}
                                    </div>

                                    <div className="deleteNewsButton">
                                        {this.props.match.params.id === this.props.currentUser.username?
                                            <Button onClick={()=>this.delNews(news.newsText)} type="danger">X</Button>:""}
                                    </div>


                                </div>
                            </Card>

                        ))}</div>


                <div className="userCard">
                    <div className="firstName">{this.props.profiles.firstName} </div>
                    <div className="lastName">{this.props.profiles.lastName} </div>
                </div>

                <div className="activity">
                    <div>
                        Activity:
                    </div>
                    {this.props.match.params.id===this.props.currentUser.username?
                    <div className="addActivityButton">
                        <Button onClick={()=>this.props.history.push("/activity")} type="default">Add activity</Button>
                    </div>:""}

                    {this.props.photos?
                        <div className="activityPhotos">
                            <div className="photosTitle">Photos:</div>
                            {this.props.photos && this.props.photos.map((photo, id) => (
                                <div key={id}>
                                    <img src={photo.base64} alt="activity" />
                                </div>

                            ))}
                        </div>:""}

                    <div className="activityMusic">
                        <div className="musicTitle">Music:</div>

                    </div>
                </div>


                {this.props.match.params.id===this.props.currentUser.username?
                <div className="uploadButton">
                    <Button onClick={()=>this.props.history.push("/upload")}>UploadAvatar</Button>
                </div>:""}



                {this.props.match.params.id === this.props.currentUser.username?
                <div>
                <div className="subscript">Subscriptions:</div>
                {this.props.friendShips && this.props.friendShips.map((profile, id) => (
                        <div key={id}>
                            <div onClick={()=>this.props.history.push(`/profile/${Profile.findOne({_id: profile.id2}).username}`)}
                                className="result">{Profile.findOne({_id: profile.id2}).username} </div>

                            <Button onClick={()=>this.delFriends(profile._id)} type="danger">X</Button>
                            <div>
                            </div>
                        </div>

                ))}
                </div>:""}




            </div>
        );
    }
}

export default withTracker((props)  => {
    const {id} =  props.match.params;
    return {
        avatar: Avatar.findOne ({username: id}),
        currentUser: Meteor.user(),
        profiles: Profile.findOne({username: id}),
        friendShips: Friend.find({id1: Meteor.user().username}).fetch(),
        news: News.find({id1: id}).fetch(),
        photos: Activity.find({username: id }).fetch(),
    }
})(profile);

