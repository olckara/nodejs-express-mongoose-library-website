/**
 * Created by karaduman on 24.05.2017.
 */
var mongoose = require('./../database');

BookSchema = mongoose.Schema(
    {
        _id: String,
        isbn: String,
        cat: String,
        title: String,
        author_ids : [String],
        inStock : Boolean,
        price : Number,
        pages_i : Number,
        publisher : String
    },
    {collection: 'books'});

Book = mongoose.model('Book', BookSchema);
BookSchema.index({_id: 1}, {unique: true});
module.exports = Book;