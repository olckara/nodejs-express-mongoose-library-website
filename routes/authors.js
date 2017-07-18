/**
 * Created by TRKaradOl on 17.07.2017.
 */
var express = require('express');
var router = express.Router();
var Author = require('../entities/Author');

/* GET authors listing. */
router.get('/', function (req, res, next) {
    Author.find({}, function (err, authors) { //returns all events for demo
        var authorMap = [];
        authors.forEach(function (authors) {
            authorMap.push(authors);
        });
        res.send(authorMap);
    });
});

module.exports = router;