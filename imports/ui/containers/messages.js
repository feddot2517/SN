import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import Friend from "../../models/friend";
import Profile from "../../models/profile";
import {Button, Spin, Icon} from "antd";
import Message from "../../models/message";
import './css/messages.css';


class messages extends Component {



    render() {

        if (!this.props.currentUser)
            return (<div className="loadingBox">
                <Spin tip="Loading...">
                </Spin>
            </div>);


        if (this.props.friendShips && !this.props.friendShips.length)
            return (<h1>for start chat, add subscription</h1>);

        console.log(this.props.message);


        return (
            <div>
                {this.props.friendShips && this.props.friendShips.map((profile, id) => (
                    <div onClick={() => this.props.history.push(`/dialog/${Profile.findOne({_id: profile.id2}).username}`)} className="dialog" key={id} >
                        <div style={{
                            display: 'inline-block',
                        }}

                        >{Profile.findOne({_id: profile.id2}).username}
                        </div>


                        {this.props.message && this.props.message.map((message, id) => (
                            <div key={id} style={{
                                display: 'inline-block',
                                width: 20,
                            }}>
                                {message.username===Profile.findOne({_id: profile.id2}).username&&message.targetUsername===this.props.currentUser.username&&message.wasRead===false?
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

    return {
        currentUser: Meteor.user(),
        friendShips: Friend.find({id1: currentUser.username}).fetch(),
        message: Message.find({targetUsername: Meteor.user().username, wasRead:false}).fetch(),
    };
})(messages);