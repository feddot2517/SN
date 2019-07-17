import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import App from '../imports/ui/app'
import 'antd/dist/antd.css'

Meteor.startup(() => {
  render(<App/>, document.getElementById('render-target'));
});