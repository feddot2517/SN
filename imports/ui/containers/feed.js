import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import {Form, Icon, Input, Button, Card} from 'antd';
import Profile from "../../models/profile";
import Friend from "../../models/friend";
import News from "../../models/news";

const FormItem = Form.Item;

class Feed extends Component {

    render() {
        console.log(this.props.news);
        return (
            <div
                style={{
                    color: 'black',
                    display: 'inline-block',
                    marginRight: 5}}
            >
            News:
                <div>
                    {this.props.news && this.props.news.map((news, id) => (
                        <Card key={id}>
                            <div style={{
                                color: 'black',
                                display: 'inline-block',
                                marginRight: 5}}
                            >

                                <div style={{display: "inline-block", marginRight: 15}}>{news.newsText}</div>
                                <div style={{display: "inline-block"}}>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Card>

                    ))}
                </div>
            </div>
        );
    }
}
export default withTracker((props)  => {
    const {id} = props.match.params;
    const {id2} = Friend.findOne({id1: Meteor.user().username});
    const {username} = Profile.findOne({_id: id2});
    return {
        currentUser: Meteor.user(),
        news: News.findOne({id1: username}),
    }
})(Feed);
