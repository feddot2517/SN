import { Class } from 'meteor/jagi:astronomy';


const Avatar = Class.create({                  // Main class of users
    name: 'Avatar',
    collection: new Meteor.Collection('avatar'),    // Creating the collection of friends in database

    fields: {// fields that users will have and the type of this field

        base64: {
            type: String,
            optional: true,

        },

        username: {
            type: String,
            optional: true,
        },
    },

});


export default Avatar;