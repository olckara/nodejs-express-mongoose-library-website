/**
 * Created by TRKaradOl on 17.07.2017.
 */
var express = require('express');
var router = express.Router();
var Publisher = require('../entities/Publisher');

/* GET publishers listing. */
router.get('/', function (req, res, next) {
    Publisher.find({}, function (err, publishers) { //returns all events for demo
        var publisherMap = [];
        publishers.forEach(function (publishers) {
            publisherMap.push(publishers);
        });
        res.send(publisherMap);
    });
});

module.exports = router;