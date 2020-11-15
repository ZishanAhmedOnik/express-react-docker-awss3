let router = require('express').Router();
let multer = require('multer');
let AWS = require('aws-sdk');
let uuid = require('uuid/v4');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({ storage: storage }).single('file')

router.post('/upload', upload, (req, res) => {
    let fileNameParts = req.file.originalname.split('.');
    let fileType = fileNameParts[fileNameParts.length - 1];

    let params = { 
        Bucket: process.env.AWS_BUCKET_NAME, 
        Key: `${uuid()}.${fileType}`, 
        Body: req.file.buffer 
    }

    s3.upload(params, (err, data) => {
        if(err) {
            res.status(500).send(err);
        }

        res.send(data);
    });
});

router.get('/list', (req, res) => {
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME
    }
    
    s3.listObjectsV2(params, (err, data) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.send(data.Contents);
        }
    })
})

module.exports = router;