let router = require('express').Router();
let multer = require('multer');
let multerS3 = require('multer-s3');
let AWS = require('aws-sdk');
let uuid = require('uuid/v4');
let S3Video = require('../models/S3Video')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

// const storage = multer.memoryStorage({
//     destination: function(req, file, callback) {
//         callback(null, '')
//     }
// })

// const upload = multer({ storage: storage }).single('file')

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            let fileNameParts = file.originalname.split('.');
            let fileType = fileNameParts[fileNameParts.length - 1];

            cb(null, `${uuid()}.${fileType}`)
        }
    })
}).single('file')

router.post('/upload', upload, (req, res) => {
    let uploadedVideo = new S3Video({
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        size: req.file.size,
        key: req.file.key,
        location: req.file.location
    })

    uploadedVideo.save((err) => {
        if (err) {
            res.status(500).send(err)
        }

        res.send({ status: 'OK' })
    })
});

router.get('/list', (req, res) => {
    S3Video.find({}, (err, result) => {
        res.json(result)
    })
});

router.get('/download/:key', (req, res) => {
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key
    }

    let readStream = s3.getObject(params).createReadStream();

    readStream.on('error', (err) => {
        res.send(err);
    })

    readStream.pipe(res)
        .on('error', (err) => {
            console.log(err);
        })
})

module.exports = router;