import { Class } from 'meteor/jagi:astronomy';


const Online = Class.create({
    name: 'Online',
    collection: new Meteor.Collection('online'),

    fields: {
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


export default Online