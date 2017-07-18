/**
 * Created by karaduman on 24.05.2017.
 */
var mongoose = require('./../database');

AuthorSchema = mongoose.Schema(
    {
        _id : String,
        author_id : String,
        f_name : String,
        l_name : String,
        books : [String]
    },
    {collection: 'authors'});

Author = mongoose.model('Author', AuthorSchema);
AuthorSchema.index({_id: 1}, {unique: true});
module.exports = Author;

