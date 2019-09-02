import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import {message, Form, Icon, Input, Button, Card, Spin} from 'antd';
import Profile from "../../models/profile";
import './css/profile.css';
import Avatar from "../../models/avatar";
import Online from "../../models/online";

const FormItem = Form.Item;

class find extends Component {

    state = {
        userId:'',
    };

    addFriend = (current ,friendLogin) => {
        Meteor.call('addFriendShip', current, friendLogin)
        message.success('Friend added');
    };

    onClickFind = e => {
      this.props.history.push(`/find/${this.state.userId}`)
    };

    onChangeUserId = e => {
            this.setState({userId: e.target.value});
            console.log(this.state.userId)
        };

    //Сделать map пока не забыл с приодящей в state строкой

    render() {

        if (!this.props.currentUser)
            return (<div className="loadingBox">
                <Spin tip="Loading...">
                </Spin>
            </div>);

        return (
            <div>
                <div>
                    {this.props.profiles && this.props.profiles.map((profile, id) => (
                        <div key={id}>
                            {this.props.currentUser.username !== profile.username &&
                            <Card key={id}>
                                <div style={{
                                    color: 'black',
                                    display: 'inline-block',
                                    marginRight: 5
                                }}
                                >
                                    <div style={{
                                        display: 'inline-block',
                                        marginRight: 25,
                                    }}>
                                        {Avatar.findOne({username: profile.username}) &&
                                        <div className="avatar2">
                                            <img src={Avatar.findOne({username: profile.username}).base64}
                                                 alt="avatar"/>
                                        </div>
                                        }

                                        {!Avatar.findOne({username: profile.username}) &&
                                        <div className="avatar2">
                                            <img src="./no-avatar.jpg" alt="noavatar"/>
                                        </div>
                                        }
                                    </div>
                                    <div style={{marginRight: 25,}} className="userNameFindPage"
                                         onClick={() => this.props.history.push(`/profile/${profile.username}`)}>{profile.firstName} {profile.lastName} </div>



                                    {/*Online*/}

                                    {profile.lastActivity&&
                                        <div style={{ display: "inline-block"}}>
                                            {profile.onlineStatus?
                                                <div>
                                                    {profile.onlineStatus}
                                                </div>:
                                                <div>
                                                    last seen at {profile.lastActivity.toLocaleString()}
                                                </div>}
                                        </div>}



                                </div>
                            </Card>
                            }
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}
export default withTracker((props)  => {
    const {id} = props.match.params;

    const currentUser = Meteor.user();
    if (!currentUser)
        return {};

    return {
        currentUser: Meteor.user(),
        profiles: Profile.find({}).fetch(),

    }
})(find);
