let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserSchema = new Schema({
    userNmae: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;