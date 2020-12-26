const router = require('express').Router();
const createError = require('http-errors');

const User = require('../../models/Auth/User');
let { registerSchema, loginSchema } = require('../../helpers/validation_schema');
let { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../helpers/jwt_helper');

router.post('/register', async (req, res, next) => {
    try {
        let result = await registerSchema.validateAsync(req.body);
        let email = result.email;

        let doesExist = await User.findOne({ email });

        if (doesExist) {
            throw createError.Conflict(`${email} already in use`);
        }

        let user = new User(req.body);
        let savedUser = await user.save(user);

        let resp = savedUser.toObject();
        delete resp.password;

        res.json(resp);
    }
    catch (err) {
        if (err.isJoi === true) {
            err.status = 422
        }

        next(err);
    }
})

router.post('/login', async (req, res, next) => {
    try {
        let result = await loginSchema.validateAsync(req.body);

        let user = await User.findOne({
            $or: [
                { email: result.emailOrUserName },
                { userName: result.emailOrUserName }
            ]
        });

        if(!user) {
            throw createError.NotFound('User not registered');
        }

        let isMatch = await user.isValidPassword(result.password);

        if(!isMatch) {
            throw createError.Unauthorized('Invalid Credentials'); 
        }

        let accessToken = await signAccessToken(user.id);
        let refreshToken = await signRefreshToken(user.id);

        res.json({ accessToken, refreshToken });
    }
    catch (err) {
        if (err.isJoi === true) {
            return next(createError.BadRequest('Invalid Credentials'))
        }

        next(err);
    }
})

router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if(!refreshToken) {
            throw createError.BadRequest();
        }

        let userId = await verifyRefreshToken(refreshToken);

        let accessToken = await signAccessToken(userId);
        let newRefreshToken = await signRefreshToken(userId);

        res.send({ accessToken: accessToken, refreshToken: newRefreshToken });

    } catch(err) {
        next(err);
    }
})

router.delete('/logout', (req, res) => {
    res.send('logout route');
})

module.exports = router;