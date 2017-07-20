/**
 * Created by karaduman on 24.05.2017.
 */
var mongoose = require('./../database');
const sanitize = require('mongo-sanitize');
const isISBN = require('is-isbn');

LibrarySchema = mongoose.Schema(
    {
        _id: {
            type: String,
            unique: true,
            index: true,
            required: true,
            set: v => sanitize(v),
            validate: {
                validator: function (v) {
                    return isISBN.validate(v);
                },
                message: "Not a valid ISBN!"
            }
        },
        cat: {
            type: String,
            set: v => sanitize(v),
            default: "Book"
        },
        title: {
            type: String,
            set: v => sanitize(v),
            required: true
        },
        authors: {
            type: [String],
            set: v => sanitize(v),
            required: true
        },
        inStock: {
            type: Boolean,
            set: v => sanitize(v),
            default: true
        },
        price: {
            type: String,
            set: v => sanitize(v),
            default: 0.0
        },
        pages_i: {
            type: String,
            set: v => sanitize(v),
            required: true
        },
        publisher: {
            type: String,
            set: v => sanitize(v),
            required: true
        }
    },
    {collection: 'library'});

Library = mongoose.model('Library', LibrarySchema);
LibrarySchema.index({_id: 1}, {unique: true});
module.exports = Library;