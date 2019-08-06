import { Class } from 'meteor/jagi:astronomy';


const Friend = Class.create({                  // Main class of users
    name: 'Friend',
    collection: new Meteor.Collection('friend'),    // Creating the collection of friends in database

    fields: {// fields that users will have and the type of this field

        id1: {
            type: String,
            optional: true,

        },

        id2: {
            type: String,
            optional: true,

        },
    },

});


export default Friend