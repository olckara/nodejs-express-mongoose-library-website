/**
 * Created by TRKaradOl on 17.07.2017.
 */

const express = require('express');
const router = express.Router();
const Library = require('../entities/Library');
const isISBN = require('is-isbn');
const sanitize = require('mongo-sanitize');

/* GET books listing. */
router.get('/', function (req, res, next) {
    let isbn = sanitize(req.query.isbn);
    if (isISBN.validate(isbn)) { //validating isbn for ISBN-10 & ISBN-13 standards.
        Library.findOne({_id: isbn}, function (err, book) { //returns the book with ISBN number
            if (err) {
                let err = new Error('Bad Input');
                err.status = 400;
                next(err);
            } else {
                res.render("book",{title: 'Sony Library', book:book});
            }
        });
    }
    else {
        let err = new Error('Bad Input');
        err.status = 400;
        next(err);
    }
});

router.get('/add', function (req, res, next) {
    res.render("add",{title: 'Sony Library',book:null});
});

router.get('/update', function (req, res, next) {
    var isbn = req.query.isbn;
    Library.findById(isbn, function (err,book) {
        if(!err){
            res.render("update",{title: 'Sony Library',book:book});
        }
    });
});

router.put('/', function (req, res, next) { //validating isbn for ISBN-10 & ISBN-13 standards.
    Library.findById(req.body._id, function (err, book) {
        let bookModel = new Library(req.body);
        if (err){
            bookModel.save(function (err) {
                if (err) {
                    let err = new Error('Bad Input');
                    err.status = 400;
                    next(err);
                }
                else res.render("success", {title: 'Sony Library',book:book});
            });
        }
        bookModel.save(function (err, updatedBook) {
            if (err){
                let err = new Error('Bad Input');
                err.status = 400;
                next(err);
            }
            res.render("success", {title: 'Sony Library',book:updatedBook});
        });
    });
});

router.delete('/', function (req, res, next) {
    let isbn = sanitize(req.query.isbn);
    if (isISBN.validate(isbn)) { //validating isbn for ISBN-10 & ISBN-13 standards.
        Library.remove({_id: isbn}, function (err) { //returns all events for demo
            if (err) {
                let err = new Error('Bad Input');
                err.status = 400;
                next(err);
            }
            else res.render("deleted", {title: 'Sony Library', isbn:isbn});
        });
    }
    else {
        let err = new Error('Bad Input');
        err.status = 400;
        next(err);
    }
});

module.exports = router;