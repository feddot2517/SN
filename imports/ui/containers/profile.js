import React, { Component } from 'react';
import {withTracker} from "meteor/react-meteor-data";
import Profile from "../../models/profile";
import Friend from "../../models/friend";
import News from "../../models/news";
import {Button, Card, Icon, Input} from "antd";


// App component - represents the whole app
class profile extends Component {

    state = {
        newsText:"",
    };



    addNews = e => {
        Meteor.call('addNews', this.props.currentUser&&this.props.currentUser.username, this.state.newsText);
    };

    onChangeInputTextNews = e => {
      this.setState({newsText: e.target.value})
    };

    render() {
        return (
            <div>
                <div style={{
                    color: 'black',
                    display: 'inline-block',
                    marginRight: 5}}
                >
                <div style={{display: "inline-block", marginRight: 5}}>{this.props.profiles.firstName} </div>
                <div style={{display: "inline-block", marginRight: 15}}>{this.props.profiles.lastName} </div>
                <div style={{marginRight: 15}}>Phone: {this.props.profiles.phone} </div>

                </div>
                {this.props.match.params.id === this.props.currentUser.username?
                <div>
                <div style={{display: "inline-block", marginRight: 15}}>Subscriptions:</div>
                {this.props.friendShips && this.props.friendShips.map((profile, id) => (
                    <Card key={id}>
                        <div style={{
                            color: 'black',
                            display: 'inline-block',
                            marginRight: 5}}
                        >

                            <div onClick={()=>this.props.history.push(`/profile/${Profile.findOne({_id: profile.id2}).username}`)} style={{display: "inline-block", marginRight: 15}}>{Profile.findOne({_id: profile.id2}).username} </div>
                            <div style={{display: "inline-block"}}>
                            </div>
                            <div>
                            </div>
                        </div>
                    </Card>

                ))}
                </div>:""}
                <div style={{marginRight: 5}} >News:</div>
                <div>
                    {this.props.match.params.id === this.props.currentUser.username?
                        <div>
                    <Input prefix={<Icon type="user"/>}
                    placeholder="Say anything, PLEASE!"
                    onChange={this.onChangeInputTextNews}/>
                    <Button onClick={this.addNews}>+</Button>
                        </div>:""}
                </div>
                <div>
                    {this.props.news && this.props.news.map((news, id) => (
                    <Card key={id}>
                        <div
                        >
                            <div>
                                {news.newsText}
                            </div>
                        </div>
                    </Card>

                ))}</div>
            </div>
        );
    }
}

export default withTracker((props)  => {
    const {id} =  props.match.params;
    return {
        currentUser: Meteor.user(),
        profiles: Profile.findOne({username: id}),
        friendShips: Friend.find({id1: Meteor.user().username}).fetch(),
        news: News.find({id1: id}).fetch(),
    }
})(profile);

