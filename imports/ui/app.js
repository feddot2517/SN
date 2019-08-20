import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './router';
import {withTracker} from "meteor/react-meteor-data";
import CustomLayout from "./customLayout"

// App component - represents the whole app
class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <CustomLayout {...this.props}>
                        <BaseRouter />
                    </CustomLayout>
                </Router>
            </div>
        );
    }
}

export default App;
