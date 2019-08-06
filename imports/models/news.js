import { Class } from 'meteor/jagi:astronomy';


const News = Class.create({                  // Main class of userAs
    name: 'News',
    collection: new Meteor.Collection('news'),    // Creating the collection of friends in database

    fields: {// fields that users will have and the type of this field

        id1: {
            type: String,
            optional: true,

        },

        newsText: {
            type: String,
            optional: true,

        },
    },

});


export default News