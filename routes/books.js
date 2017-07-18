/**
 * Created by TRKaradOl on 17.07.2017.
 */

var express = require('express');
var router = express.Router();
var Book = require('../entities/Book');

/* GET books listing. */
router.get('/:search?', function (req, res, next) {
    var search = req.params.search;
    if (!search) {
        Book.find({}, function (err, books) { //returns all books if no search query.
            var bookMap = [];
            books.forEach(function (books) {
                bookMap.push(books);
            });
            res.send(bookMap);
        });
    }
    else {
        Book.find({$text: {$search: ""}}, function (err, books) { //returns books that matches the query.
            var bookMap = [];
            books.forEach(function (books) {
                bookMap.push(books);
            });
            res.send(bookMap);
        });
    }
});

router.put('/', function (req, res, next) {
    Book.find({}, function (err, books) { //returns all events for demo
        var bookMap = [];
        books.forEach(function (books) {
            bookMap.push(books);
        });
        res.send(bookMap);
    });
});

router.delete('/:isbn', function (req, res, next) {
    Book.find({}, function (err, books) { //returns all events for demo
        var bookMap = [];
        books.forEach(function (books) {
            bookMap.push(books);
        });
        res.send(bookMap);
    });
});

module.exports = router;