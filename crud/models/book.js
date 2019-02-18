var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    title:String,
    author:String,
    page:Number
});

var siswa = mongoose.model("siswa", studentSchema);
module.exports.siswa = siswa;