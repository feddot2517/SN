import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import './css/mainpage.css';

class changelog extends Component {
    render() {
        return (
            <div>
                {this.props.currentUser?
                <div className="greetings">
                    Hello, {this.props.currentUser && this.props.currentUser.username}
                </div>:
                    <div className="greetings">
                        To start, <div onClick={()=>this.props.history.push("/signup")} className="signupRef"> signup </div> or <div onClick={()=>this.props.history.push("/login")} className="signupRef">login </div>
                    </div>}
                <div  onClick={()=>this.props.history.push("/changelog")} className="changelog">
                    changelog
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(changelog);