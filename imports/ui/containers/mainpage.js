import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';

class mainpage extends Component {
    render() {
        return (
            <div>
                <h1>Hello, {this.props.currentUser && this.props.currentUser.username}</h1>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(mainpage);