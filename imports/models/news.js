import { Class } from 'meteor/jagi:astronomy';


const News = Class.create({
    name: 'News',
    collection: new Meteor.Collection('news'),

    fields: {
        id1: {
            type: String,
            optional: true,

        },

        newsText: {
            type: String,
            optional: true,

        },
    },

    behaviors: { timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
        } },

});


export default News