import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {withRouter} from "react-router";
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";


const {Header, Content, Footer} = Layout;

const {SubMenu} = Menu;


class CustomLayout extends Component {


    SNlogout = e => {
        Meteor.logout();
        this.props.history.push("/");
    }

    pushFindFriendsPageInHistory = e => {
        this.props.history.push(`/find`)
    }

    pushProfilePageInHistory = username => {
        this.props.history.push(`/profile/${username}`)
    }

    pushMainPageInHistory = e => {
        this.props.history.push('/')
    }
    render() {
        console.log(this.props.currentUser && this.props.currentUser.username);
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
                        <Menu.Item onClick={this.pushFindFriendsPageInHistory}>Find friends</Menu.Item>:""}
                        {this.props.currentUser?
                        <Menu.Item onClick={()=>this.pushProfilePageInHistory(this.props.currentUser && this.props.currentUser.username)}>{this.props.currentUser && this.props.currentUser.username}</Menu.Item>:""}
                        {this.props.currentUser?
                        <Menu.Item onClick={()=>this.SNlogout()}>logOut</Menu.Item>:""}
                        {this.props.currentUser?
                        <Menu.Item onClick={()=>this.props.history.push("/feed")}>Feed</Menu.Item>:""}
                        {!this.props.currentUser?
                        <Menu.Item onClick={()=>this.props.history.push("/login")}>login</Menu.Item>:""}
                    </Menu>
                </Header>
                <Content color={"fgf"} style={{padding: 10, minHeight:1000}}>
                    {this.props.children}
                </Content>
                <Footer style={{textAlign: 'center'}}>fed.</Footer>
            </Layout>
        )
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(withRouter(CustomLayout));
