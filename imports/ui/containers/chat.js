import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import {Cascader ,Form, Icon, Input, Button, Card, Spin} from 'antd';
import Message from "../../models/message";
import Profile from "../../models/profile";
import find from "./find";

const smile = [
    {
        value: '🦹‍♂️',
        label: '🦹‍♂️',
    },    {
        value: '🥴',
        label: '🥴',
    },    {
        value: '🥵',
        label: '🥵',
    },    {
        value: '🤣',
        label: '🤣',
    },    {
        value: '🥰',
        label: '🥰',
    },    {
        value: '🦹‍♀️',
        label: '🦹‍♀️',
    },
];


class Chat extends Component {

    state = {
        userMessage: "",
    };

    read = id => {
        Meteor.call("makeReaded", id);
    };

    addNewMessage = e => {
        if (!this.props.currentUser)
            return;
        const {userMessage} = this.state;
        Meteor.call("addMessage", this.props.currentUser.username, this.props.match.params.id, userMessage);
        this.setState({userMessage: ''})
    };

    onChange = e => {
        this.setState({userMessage: e.target.value})
    };

    onChangeSmile = value => {
        this.setState({userMessage: this.state.userMessage+value})
    };

    render() {

        if (!this.props.currentUser)
            return (<div className="loadingBox">
                <Spin tip="Loading...">
                </Spin>
            </div>);

        console.log(this.props.match.params);
        return (
            <div>
                <Input
                    prefix={<Icon type="message" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="message"
                    placeholder="Input your message here"
                    value={this.state.userMessage}
                    onChange={this.onChange}
                    onPressEnter={this.addNewMessage}
                    style={{width: 1000, marginRight: 10}}
                />
                <Button onClick={this.addNewMessage} type="default"><Icon type="plus" /></Button>


                <Cascader style={{width: 50}} options={smile} onChange={this.onChangeSmile} placeholder="😀"/>


                <div>
                    <div style={{background: '#ffffff', padding: 24, minHeight: 1000}}>
                        {this.props.yourMessage && this.props.yourMessage.map((message, id) => (
                            <div>
                                {message.username===this.props.currentUser.username && message.targetUsername===this.props.match.params.id&&!message.wasRead?
                                    <div>
                                        <Card style={{background: "#BADFE3"}} key={id+1}>
                                            <div style={{
                                                fontSize: '10pt',
                                                display: 'inline-block',
                                                marginRight: 5,
                                                fontFamily: "initial",
                                                float:"right"
                                            }}>{message.createdAt.toLocaleTimeString()}:
                                            </div>
                                            <div style={{color: "black", display: 'inline-block', marginRight: 10, fontSize: '20pt', }}>You:</div>
                                            <div style={{display: 'inline-block', fontSize: '20pt',}}> {message.messageBody}</div>
                                        </Card>
                                    </div>
                                :""}
                                {message.username===this.props.currentUser.username && message.targetUsername===this.props.match.params.id&&message.wasRead?
                                    <div>
                                        <Card key={id+1}>
                                            <div style={{
                                                fontSize: '10pt',
                                                display: 'inline-block',
                                                marginRight: 5,
                                                fontFamily: "initial",
                                                float:"right"
                                            }}>{message.createdAt.toLocaleTimeString()}:
                                            </div>
                                            <div style={{color: "black", display: 'inline-block', marginRight: 10, fontSize: '20pt', }}>You:</div>
                                            <div style={{display: 'inline-block', fontSize: '20pt',}}> {message.messageBody}</div>
                                        </Card>
                                    </div>:""}
                                {message.targetUsername===this.props.currentUser.username && message.username===this.props.match.params.id?
                                    <div>
                                        <Card key={id}>
                                            <div style={{
                                                color: 'grey',
                                                fontSize: '10pt',
                                                display: 'inline-block',
                                                marginRight: 5,
                                                fontFamily: "initial",
                                                float:"right"
                                            }}>{message.createdAt.toLocaleTimeString()}:
                                            </div>
                                            <div style={{color: "slategray", display: 'inline-block', marginRight: 10, fontSize: '20pt', }}>{message.username}:</div>
                                            <div style={{display: 'inline-block', fontSize: '20pt',}}> {message.messageBody}</div>
                                        </Card>
                                        {this.read(message._id)}
                                    </div>
                                    :""}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}
export default withTracker((props)  => {

    const currentUser = Meteor.user();
    if (!currentUser)
        return {};

     return {
        currentUser: Meteor.user(),
         yourMessage: Message.find({},{ sort: { createdAt: -1 } }).fetch(),
     }
})(Chat);
