/**
 * Created by TRKaradOl on 17.07.2017.
 */
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/sony_library");

module.exports = mongoose;