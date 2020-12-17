let JWT = require('jsonwebtoken');
let createError = require('http-errors');

module.exports = {
    signAccessToken(userId) {
        return new Promise((resolve, reject) => {
            let payload = {
            }

            let secret = 'some super secret';
            let options = {
                expiresIn: '1h',
                issuer: 'nodedockers3',
                audience: userId
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if(err) {
                    return reject(err);
                }

                resolve(token);
            });
        })
    }
}