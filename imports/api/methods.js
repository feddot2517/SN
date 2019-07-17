import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
    'addUser'(values,callback) {

        Accounts.createUser({
            username: values.username,
            password: values.password,
        },callback);
        console.log(values.username);
    },

    'chPassword'(userID, new_password){
        Accounts.setPassword(userID, new_password);
    },


});