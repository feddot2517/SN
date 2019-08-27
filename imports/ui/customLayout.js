import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {withRouter} from "react-router";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import "./containers/css/layout.css"
import Message from "../models/message";
import Friend from "../models/friend";
import Profile from "../models/profile";


const {Header, Content, Footer} = Layout;

const {SubMenu} = Menu;

class CustomLayout extends Component {

    online = () => {
        {this.props.currentUser&&
        Meteor.call('online', this.props.currentUser.username)}
    };

    SNlogout = e => {
        Meteor.logout();
        this.props.history.push("/");
    }

    pushFindFriendsPageInHistory = e => {
        this.props.history.push(`/find`)
    }

    pushMessagePageInHistory = e => {
        this.props.history.push(`/messages`)
    }

    pushProfilePageInHistory = username => {
        this.props.history.push(`/profile/${username}`)
    }

    pushMainPageInHistory = e => {
        this.props.history.push('/')
    }
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{lineHeight: '64px', float: 'left', color: "ff2"}}
                    >
                        <Menu.Item onClick={this.pushMainPageInHistory}>SN</Menu.Item>
                        {this.props.currentUser?
                        <Menu.Item onClick={this.pushFindFriendsPageInHistory}>users</Menu.Item>:""}
                        {this.props.currentUser?
                            <Menu.Item onClick={this.pushMessagePageInHistory}>{this.props.message.length} <Icon type="message"/></Menu.Item>:""}
                        {this.props.currentUser?
                        <Menu.Item onClick={()=>this.pushProfilePageInHistory(this.props.currentUser && this.props.currentUser.username)}>profile</Menu.Item>:""}
                        {this.props.currentUser?
                        <Menu.Item onClick={()=>this.props.history.push("/feed")}>feed</Menu.Item>:""}
                        {this.props.currentUser?
                        <Menu.Item onClick={()=>this.props.history.push("/music")}>music</Menu.Item>:""}
                        {!this.props.currentUser?
                        <Menu.Item onClick={()=>this.props.history.push("/login")}>login</Menu.Item>:""}
                        {this.props.currentUser?
                        <Menu.Item onClick={()=>this.SNlogout()}>exit</Menu.Item>:""}

                    </Menu>
                </Header>
                <Content color={"fgf"} style={{padding: 10, minHeight:1000}}>
                    {this.props.children}
                </Content>
                <Footer style={{textAlign: 'center'}}>fed.
                </Footer>


                {this.online()}



            </Layout>
        )
    }
}

export default withTracker(() => {

    const currentUser = Meteor.user();

    if (!currentUser)
        return {};

    const message = Message.find({targetUsername: Meteor.user().username, wasRead:false}).fetch().map(u => u.wasRead);

    return {
        currentUser: Meteor.user(),
        friendShips: Friend.find({id1: currentUser.username}).fetch(),
        message: message,
    };
})(withRouter(CustomLayout));
