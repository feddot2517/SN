import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import Profile from "../models/profile";
import Friend from "../models/friend";
import News from "../models/news";
import Avatar from "../models/avatar";
import Activity from "../models/activity";
import Message from "../models/message";

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


    'addMessage'(username, targetUsername, messageBody) {

        let message = new Message({
            username: username,
            targetUsername: targetUsername,
            messageBody: messageBody,
            wasRead: false,
        });
        message.save();
    },

    'makeReaded'( _id ) {

        let message = Message.findOne({_id:_id});

        message.wasRead=true;

        message.save();
    },


    'addAvatar'(base64, username) {

        Avatar.remove({username: username});

        let avatar = new Avatar({
            username: username,
            base64: base64,
        });
        avatar.save();
    },

    'delPhoto'(base64 ,username) {

        Activity.remove({username: username}&&{base64:base64});

    },
    'addActivity'(base64, username) {

        let activity = new Activity({
            username: username,
            base64: base64,
        });
        activity.save();
    },

    'delNews'(newsText) {

        News.remove({newsText: newsText});
    },
    'delFriend'(targetId) {

        Friend.remove({_id: targetId});
    },

    'chPassword'(userID, new_password){
        Accounts.setPassword(userID, new_password);
    },



});