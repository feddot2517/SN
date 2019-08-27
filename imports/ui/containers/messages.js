import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import Friend from "../../models/friend";
import Profile from "../../models/profile";
import {Button, Spin, Icon} from "antd";
import Message from "../../models/message";
import './css/messages.css';
import News from "../../models/news";
import Avatar from "../../models/avatar";
import Online from "../../models/online";


class messages extends Component {



    render() {

        if (!this.props.currentUser)
            return (<div className="loadingBox">
                <Spin tip="Loading...">
                </Spin>
            </div>);


        if (this.props.friendShips && !this.props.friendShips.length)
            return (<h1>for start chat, add subscription</h1>);



        return (
            <div>
                {this.props.profile && this.props.profile.map((profile, id) => (
                    <div onClick={() => this.props.history.push(`/dialog/${profile.username}`)} className="dialog" key={id} >

                        <div style={{
                            display: 'inline-block',
                            marginRight: 10,
                        }}

                        >{profile.username}
                        </div>

                        {/*ONLINE*/}
                        {profile.lastActivity&&
                        <div style={{ display: "inline-block"}}>
                            {profile.onlineStatus?
                                <div>
                                    online
                                </div>:
                                <div>
                                    last seen at {profile.lastActivity.toLocaleString()}
                                </div>}
                        </div>}


                        {this.props.message && this.props.message.map((message, id) => (
                            <div key={id} style={{
                                display: 'inline-block',
                                width: 20,
                                marginLeft: 5,
                            }}>
                                {message.username===profile.username&&message.targetUsername===this.props.currentUser.username&&message.wasRead===false?
                                    <div>
                                        <Icon type="message"/>
                                    </div>:""
                                }
                            </div>

                        ))}


                    </div>

                ))}
            </div>

        );
    }
}

export default withTracker(() => {

    const currentUser = Meteor.user();

    if (!currentUser)
        return {};

    const id2s = Friend.find({id1: Meteor.user().username}).fetch().map(u => u.id2);
    const usernames = Profile.find({_id: {$in: id2s}}).fetch().map(u => u.username);

    return {
        profile: Profile.find({username: {$in: usernames}}).fetch(),
        currentUser: Meteor.user(),
        friendShips: Friend.find({id1: currentUser.username}).fetch(),
        message: Message.find({targetUsername: Meteor.user().username, wasRead:false}).fetch(),
    };
})(messages);