import { Class } from 'meteor/jagi:astronomy';


const Message = Class.create({
    name: 'Message',
    collection: new Meteor.Collection('message'),

    fields: {
        username: {
            type: String,
            optional: true,

        },

        targetUsername: {
            type: String,
            optional: true,

        },

        messageBody: {
            type: String,
            optional: true,
        },

        wasRead: {
            type: Boolean,
            optional: true,
        }
    },

    behaviors: { timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
        } },

});


export default Message