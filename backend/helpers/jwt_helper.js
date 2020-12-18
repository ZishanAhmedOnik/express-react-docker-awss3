let JWT = require('jsonwebtoken');
let createError = require('http-errors');

module.exports = {
    signAccessToken(userId) {
        return new Promise((resolve, reject) => {
            let payload = {
            }

            let secret = process.env.ACCESS_TOKEN_SECRET;
            let options = {
                expiresIn: '1h',
                issuer: 'nodedockers3',
                audience: userId
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if(err) {
                    console.log(err.message);

                    return reject(createError.InternalServerError());
                }

                resolve(token);
            });
        })
    },

    verifyAccessToken(req, res, next) {
        if(!req.headers['authorization']) {
            return next(createError.Unauthorized())
        }

        let authHeader = req.headers['authorization']
        let bearerToken = authHeader.split(' ');
        let token = bearerToken[1];

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) {
                return next(createError.Unauthorized())
            }

            req.payload = payload;
            next();
        })
    }
}