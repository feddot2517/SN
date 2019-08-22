import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import './css/mainpage.css';

class changelog extends Component {
    render() {
        return (
            <div>
                <div>
                    <p style={{color: "black"}}>ver. 0.1.1</p>
                </div>
                <div>
                    <p>Added emoji for chat</p>
                    <p>Added view for user photo activity</p>
                    <p>Was added count for new messages</p>
                </div>

                <div>
                    <p style={{color: "black"}}>ver. 0.1.0</p>
                </div>
                <div>
                    <p>Added chat</p>
                    <p>Some minor fix for profile</p>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
    };
})(changelog);