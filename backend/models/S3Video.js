let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let S3VideoSchema = new Schema({
    contentName: String,
    contentDescription: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    size: Number,
    key: String,
    location: String
})

let S3Video = mongoose.model('S3Video', S3VideoSchema)

module.exports = S3Video