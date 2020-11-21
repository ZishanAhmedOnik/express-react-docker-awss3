let router = require('express').Router();
let multer = require('multer');
let multerS3 = require('multer-s3');
let AWS = require('aws-sdk');
let uuid = require('uuid/v4');
let ffmpeg = require('fluent-ffmpeg');
let ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

let S3Video = require('../models/S3Video')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'upload/')
    },
    filename: function (req, file, cb) {
        let fileNameParts = file.originalname.split('.');
        let fileType = fileNameParts[fileNameParts.length - 1];

        cb(null, `${uuid()}.${fileType}`)
    }
})

const upload = multer({ storage: storage }).single('file')

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             let fileNameParts = file.originalname.split('.');
//             let fileType = fileNameParts[fileNameParts.length - 1];

//             cb(null, `${uuid()}.${fileType}`)
//         }
//     })
// }).single('file')


router.post('/upload', upload, (req, res) => {
    ffmpeg(req.file, { timeout: 432000 }).addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_last_size 0',
        '-f hls'
    ]).output('converted_files/output.m3u8')
        .on('end', () => {
            res.send(req.file)
        })
    // const { contentName, contentDescription } = req.body;

    // console.log(contentName, contentDescription);

    // let uploadedVideo = new S3Video({
    //     contentName: contentName,
    //     contentDescription: contentDescription,
    //     originalname: req.file.originalname,
    //     encoding: req.file.encoding,
    //     mimetype: req.file.mimetype,
    //     size: req.file.size,
    //     key: req.file.key,
    //     location: req.file.location
    // })

    // uploadedVideo.save((err) => {
    //     if (err) {
    //         res.status(500).send(err)
    //     }

    //     res.send({ status: 'OK' })
    // })
});

router.get('/list', (req, res) => {
    S3Video.find({}, (err, result) => {
        res.json(result);
    })
});

router.get('/download/:key', (req, res) => {
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key
    }

    let readStream = s3.getObject(params).createReadStream();

    readStream.on('error', (err) => {
        console.log(err);
    })

    readStream.pipe(res)
        .on('error', (err) => {
            console.log(err);
        })
})

module.exports = router;