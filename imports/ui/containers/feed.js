import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import {Form, Icon, Input, Button, Card} from 'antd';
import Profile from "../../models/profile";
import Friend from "../../models/friend";
import News from "../../models/news";
import "./css/feed.css"

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
                                <div style={{display: "inline-block", marginRight: 15, color: "grey"}}>
                                    {news.createdAt.toDateString()}
                                </div>

                                <div style={{display: "inline-block", marginRight: 15, color: "grey"}}>
                                    {news.createdAt.toLocaleTimeString()}
                                </div>

                                <div className="userRefsInNews"
                                    onClick={()=>this.props.history.push(`/profile/${news.id1}`)}
                                    style={{color: "blue"}}
                                >
                                    {news.id1}:
                                </div>

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
    // const {id} = props.match.params;
    const id2s = Friend.find({id1: Meteor.user().username}).fetch().map(u => u.id2);
    const usernames = Profile.find({_id: {$in : id2s}}).fetch().map(u => u.username);
    return {
        currentUser: Meteor.user(),
        news: News.find({id1: {$in : usernames}}).fetch(),
    }
})(Feed);
