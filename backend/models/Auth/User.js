let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bcrypt = require('bcrypt');

const UserSchema = new Schema({
    userName: {
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

UserSchema.pre('save', async function (next) {
    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;

        next();
    } catch(error) {
        next(error);
    }
})

let User = mongoose.model('User', UserSchema);

module.exports = User;