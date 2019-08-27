import { Meteor } from 'meteor/meteor';
import "../imports/api/methods"


Meteor.startup(() => {
    Meteor.setInterval(function () {
        Meteor.call("getServerTime");
    }, 60000);
});
