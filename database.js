/**
 * Created by TRKaradOl on 17.07.2017.
 */
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/your_project_development");

module.exports = mongoose;