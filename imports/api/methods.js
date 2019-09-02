import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import Profile from "../models/profile";
import Friend from "../models/friend";
import News from "../models/news";
import Avatar from "../models/avatar";
import Activity from "../models/activity";
import Message from "../models/message";
import Music from "../models/music";

const fs = Npm.require("fs");

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
            online: false,
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


    'online'(_id) {

        let profile = Profile.findOne({username: _id});

        profile.lastActivity=new Date();

        profile.save();
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

    'addMusic'(username, file, fileName, fileType){
        /*Music.write(file, {
            name: file.name,
            userId: username,
            type: file.type,
            meta: {},
        });*/
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


    'getServerTime'() {
        const serverTime = new Date();

        const profiles = Profile.find({}).fetch();

        profiles.map(function (profile) {
            if(profile.lastActivity){

                const profileLastActivity = profile.lastActivity;

                if (Math.abs(serverTime.getMinutes() - profileLastActivity.getMinutes() ) <= 1 &&
                    (serverTime.getHours() === profileLastActivity.getHours()) &&
                    (serverTime.getDay() === profileLastActivity.getDay()) &&
                    (serverTime.getMonth() === profileLastActivity.getMonth())) {

                    profile.onlineStatus="online";

                }

                else if (Math.abs(serverTime.getMinutes() - profileLastActivity.getMinutes() ) > 1 &&
                    ( serverTime.getMinutes() < profileLastActivity.getMinutes() )&&
                    (serverTime.getHours() - profileLastActivity.getHours()===1) &&
                    (serverTime.getDay() === profileLastActivity.getDay()) &&
                    (serverTime.getMonth() === profileLastActivity.getMonth())) {

                    profile.onlineStatus="last seen "+(Math.abs (60+serverTime.getMinutes() - profileLastActivity.getMinutes()) )+ " minutes ago"

                }

                else if (Math.abs(serverTime.getMinutes() - profileLastActivity.getMinutes() ) > 1 &&
                    (serverTime.getHours() - profileLastActivity.getHours()===0) &&
                    (serverTime.getDay() === profileLastActivity.getDay()) &&
                    (serverTime.getMonth() === profileLastActivity.getMonth())) {

                    profile.onlineStatus="last seen "+(Math.abs (serverTime.getMinutes() - profileLastActivity.getMinutes()) )+ " minutes ago"

                }

                else {

                    profile.onlineStatus=null
                }

                profile.save();
            }

        });

    },


});