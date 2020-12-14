const router = require('express').Router();
const createError = require('http-errors');

const User = require('../../models/Auth/User');
let { authSchema } = require('../../helpers/validation_schema');

router.post('/register', async (req, res, next) => {
    try {
        let result = await authSchema.validateAsync(req.body);
        let email = result.email;

        let doesExist = await User.findOne({ email });

        if(doesExist) {
            throw createError.Conflict(`${email} already in use`);
        }

        let user = new User(req.body);
        let savedUser = await user.save(user);

        let resp = savedUser.toObject();
        delete resp.password;

        res.json(resp);
    }
    catch(err) {
        if(err.isJoi === true) {
            err.status = 422
        }

        next(err);
    }
})

router.post('/login', (req, res) => {
    res.send('login route');
})

router.post('/refresh-token', (req, res) => {
    res.send('refresh token route');
})

router.delete('/logout', (req, res) => {
    res.send('logout route');
})

module.exports = router;