import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import Profile from "../models/profile";
import Friend from "../models/friend";
import News from "../models/news";

Meteor.methods({
    'addUser'(values,callback) {

        Accounts.createUser({
            username: values.username,
            password: values.password,
        },callback);

        let profile = new Profile({
            username: values.username,
            phone: values.phone,
            firstName: values.firstName,
            lastName: values.lastName,
        });
        profile.save();
    },

    'addFriendShip'(current, needFriend) {

        let friend = new Friend({
            id1: current,
            id2: needFriend,
        });
        friend.save();
    },

    'addNews'(current, newsText) {

        let news = new News({
            id1: current,
            newsText: newsText,
        });
        news.save();
    },

    'chPassword'(userID, new_password){
        Accounts.setPassword(userID, new_password);
    },



});