let router = require('express').Router();
let path = require('path')
let multer = require('multer')
let views_path = path.join(__dirname, '../views')

let { verifyAccessToken } = require('../helpers/jwt_helper');

router.get('/', verifyAccessToken, async (req, res) => {
    res.sendFile(path.join(views_path, 'index.html'))
})

module.exports = router;