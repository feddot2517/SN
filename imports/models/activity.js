import { Class } from 'meteor/jagi:astronomy';


const Activity = Class.create({                  // Main class of users
    name: 'Activity',
    collection: new Meteor.Collection('activity'),    // Creating the collection of friends in database

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


    behaviors: { timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
        } },

});


export default Activity;