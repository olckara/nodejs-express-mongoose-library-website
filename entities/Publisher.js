/**
 * Created by karaduman on 24.05.2017.
 */
var mongoose = require('./../database');

PublisherSchema = mongoose.Schema(
    {
        _id : String,
        ph_id : String,
        name : String,
        books : [String]
    },
    {collection: 'publishers'});

Publisher = mongoose.model('Publisher', PublisherSchema);
PublisherSchema.index({_id: 1}, {unique: true});
module.exports = Publisher;
