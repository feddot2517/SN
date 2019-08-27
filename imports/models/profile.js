import { Class } from 'meteor/jagi:astronomy';


const Profile = Class.create({                  // Main class of users
    name: 'Profile',
    collection: new Meteor.Collection('profiles'),    // Creating the collection of users in database

    fields: {// fields that users will have and the type of this field

        username: {
            type: String,
            optional: true,

        },

        phone: {
            type: String,
            optional: true,

        },

        firstName: {
            type: String,
            optional: false,
        },

        lastName: {
            type: String,
            optional: false,
        },

        lastActivity: {
            type: Date,
            optional: true,
        },

        onlineStatus: {
            type: Boolean,
            optional: true
        }

    },

});


export default Profile