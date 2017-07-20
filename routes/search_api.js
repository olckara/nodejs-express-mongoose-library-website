/**
 * Created by TRKaradOl on 18.07.2017.
 */

const express = require('express');
const router = express.Router();
const Library = require('../entities/Library'); //getting the mongoose model

/* GET books listing.
*   PARAMETERS:
*   - req.query.q = search query
*   - req.query.s = sort by
*   - req.query.o = order (ascending-descending)
* */
router.get('/', function (req, res, next) {
    if (req.query.q && (req.query.s && req.query.o)) {
        let search = new RegExp(req.query.q.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&'), "i"); //sanitizing the search query and creating regular expression.
        let sort = req.query.s.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
        let sort_query = Library.find({
            $or: [ //searching search-enabled fields in the database
                {authors: search},
                {title: search},
                {cat: search},
                {publisher: search}
            ]
        });
        if (!(req.query.o === "-1" || req.query.o === "1")){
            let err = new Error('Bad Input');
            err.status = 400;
            next(err);
        }
        var order = req.query.o;
        switch (sort) {
            case "title":
                sort_query.sort({title: order});
                break;
            case "authors":
                sort_query.sort({authors: order});
                break;
            case "publisher":
                sort_query.sort({publisher: order});
                break;
            case "cat":
                sort_query.sort({cat: order});
                break;
            case "price":
                sort_query.sort({price: order});
                break;
            case "pages_i":
                sort_query.sort({pages_i: order});
                break;
            default:
                let err = new Error('Bad Input');
                err.status = 400;
                next(err);
                break;
        }
        sort_query.exec(function (err, books) { //returns books that matches the query.
            if (!err) {
                let bookMap = [];
                books.forEach(function (book) {
                    bookMap.push(book);
                });
                res.render('search_result', {title: 'Sony Library',results:bookMap}); //data is ready to be used by front-end as a simple array of objects
            }
            else {
                res.render('search_result', {title: 'Sony Library',results:[]});
            }
        });
    } else if ((req.query.s && req.query.o)) {
        let sort = req.query.s.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
        let sort_query = Library.find({});
        if (!(req.query.o === "-1" || req.query.o === "1")){
            let err = new Error('Bad Input');
            err.status = 400;
            next(err);
        }
        var order = req.query.o;
        switch (sort) {
            case "title":
                sort_query.sort({title: order});
                break;
            case "authors":
                sort_query.sort({authors: order});
                break;
            case "publisher":
                sort_query.sort({publisher: order});
                break;
            case "cat":
                sort_query.sort({cat: order});
                break;
            case "price":
                sort_query.sort({price: order});
                break;
            case "pages_i":
                sort_query.sort({pages_i: order});
                break;
            default:
                let err = new Error('Bad Input');
                err.status = 400;
                next(err);
                break;
        }
        sort_query.exec(function (err, books) { //returns books that matches the query.
            if (!err) {
                let bookMap = [];
                books.forEach(function (book) {
                    bookMap.push(book);
                });
                res.render('search_result', {title: 'Sony Library',results:bookMap}); //data is ready to be used by front-end as a simple array of objects
            }
            else {
                res.render('search_result', {title: 'Sony Library',results:[]});
            }
        });
    } else {
        let err = new Error('Bad Input');
        err.status = 400;
        next(err);
    }
});

module.exports = router;