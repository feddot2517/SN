import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './router';
import {withTracker} from "meteor/react-meteor-data";

// App component - represents the whole app
class App extends Component {
    render() {
        return (
            <div>
            <Router>
                <BaseRouter />
            </Router>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(App);
