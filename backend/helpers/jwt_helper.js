let JWT = require('jsonwebtoken');
let createError = require('http-errors');

module.exports = {
    signAccessToken(user) {
        return new Promise((resolve, reject) => {
            let payload = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }

            let secret = process.env.ACCESS_TOKEN_SECRET;
            let options = {
                expiresIn: '1hr',
                issuer: 'nodedockers3',
                audience: user.id
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
                if(err.name === 'JsonWebTokenError') {
                    return next(createError.Unauthorized())
                }

                return next(createError.Unauthorized(err.message));
            }

            req.payload = payload;
            next();
        })
    },

    signRefreshToken(user) {
        return new Promise((resolve, reject) => {
            let payload = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }

            let secret = process.env.REFRESH_TOKEN_SECRET;
            let options = {
                expiresIn: '1y',
                issuer: 'nodedockers3',
                audience: user.id
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

    verifyRefreshToken(refreshToken) {
        return new Promise((resovle, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if(err) {
                    return reject(createError.Unauthorized());
                }

                let userId = payload.aud;

                resovle(userId);
            })
        })
    }
}