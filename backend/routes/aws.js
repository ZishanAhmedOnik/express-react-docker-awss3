let router = require('express').Router();
let multer = require('multer');
let multerS3 = require('multer-s3');
let AWS = require('aws-sdk');
let uuid = require('uuid/v4');
let S3Video = require('../models/S3Video')

AWS.config.update({ region: 'us-east-2' });
AWS.config.mediaconvert = {endpoint : 'https://fkuulejsc.mediaconvert.us-east-2.amazonaws.com'};

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
    const { contentName, contentDescription } = req.body;

    console.log(contentName, contentDescription);

    let uploadedVideo = new S3Video({
        contentName: contentName,
        contentDescription: contentDescription,
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

router.get('/ep', (req, res) => {
    var params = {
        "Queue": "arn:aws:mediaconvert:us-east-2:098258936739:queues/Default",
        "UserMetadata": {},
        "Role": "arn:aws:iam::098258936739:role/s3access",
        "Settings": {
            "TimecodeConfig": {
                "Source": "ZEROBASED"
            },
            "OutputGroups": [
                {
                    "Name": "Apple HLS",
                    "Outputs": [
                        {
                            "ContainerSettings": {
                                "Container": "M3U8",
                                "M3u8Settings": {
                                    "AudioFramesPerPes": 4,
                                    "PcrControl": "PCR_EVERY_PES_PACKET",
                                    "PmtPid": 480,
                                    "PrivateMetadataPid": 503,
                                    "ProgramNumber": 1,
                                    "PatInterval": 0,
                                    "PmtInterval": 0,
                                    "Scte35Source": "NONE",
                                    "NielsenId3": "NONE",
                                    "TimedMetadata": "NONE",
                                    "VideoPid": 481,
                                    "AudioPids": [
                                        482,
                                        483,
                                        484,
                                        485,
                                        486,
                                        487,
                                        488,
                                        489,
                                        490,
                                        491,
                                        492
                                    ]
                                }
                            },
                            "VideoDescription": {
                                "ScalingBehavior": "DEFAULT",
                                "TimecodeInsertion": "DISABLED",
                                "AntiAlias": "ENABLED",
                                "Sharpness": 50,
                                "CodecSettings": {
                                    "Codec": "H_264",
                                    "H264Settings": {
                                        "InterlaceMode": "PROGRESSIVE",
                                        "NumberReferenceFrames": 3,
                                        "Syntax": "DEFAULT",
                                        "Softness": 0,
                                        "GopClosedCadence": 1,
                                        "GopSize": 90,
                                        "Slices": 1,
                                        "GopBReference": "DISABLED",
                                        "SlowPal": "DISABLED",
                                        "EntropyEncoding": "CABAC",
                                        "Bitrate": 4500000,
                                        "FramerateControl": "INITIALIZE_FROM_SOURCE",
                                        "RateControlMode": "CBR",
                                        "CodecProfile": "MAIN",
                                        "Telecine": "NONE",
                                        "MinIInterval": 0,
                                        "AdaptiveQuantization": "AUTO",
                                        "CodecLevel": "AUTO",
                                        "FieldEncoding": "PAFF",
                                        "SceneChangeDetect": "ENABLED",
                                        "QualityTuningLevel": "SINGLE_PASS",
                                        "FramerateConversionAlgorithm": "DUPLICATE_DROP",
                                        "UnregisteredSeiTimecode": "DISABLED",
                                        "GopSizeUnits": "FRAMES",
                                        "ParControl": "INITIALIZE_FROM_SOURCE",
                                        "NumberBFramesBetweenReferenceFrames": 2,
                                        "RepeatPps": "DISABLED",
                                        "DynamicSubGop": "STATIC"
                                    }
                                },
                                "AfdSignaling": "NONE",
                                "DropFrameTimecode": "ENABLED",
                                "RespondToAfd": "NONE",
                                "ColorMetadata": "INSERT"
                            },
                            "AudioDescriptions": [
                                {
                                    "AudioTypeControl": "FOLLOW_INPUT",
                                    "CodecSettings": {
                                        "Codec": "AAC",
                                        "AacSettings": {
                                            "AudioDescriptionBroadcasterMix": "NORMAL",
                                            "Bitrate": 96000,
                                            "RateControlMode": "CBR",
                                            "CodecProfile": "LC",
                                            "CodingMode": "CODING_MODE_2_0",
                                            "RawFormat": "NONE",
                                            "SampleRate": 48000,
                                            "Specification": "MPEG4"
                                        }
                                    },
                                    "LanguageCodeControl": "FOLLOW_INPUT"
                                }
                            ],
                            "OutputSettings": {
                                "HlsSettings": {
                                    "AudioGroupId": "program_audio",
                                    "AudioOnlyContainer": "AUTOMATIC",
                                    "IFrameOnlyManifest": "EXCLUDE"
                                }
                            },
                            "NameModifier": "output"
                        }
                    ],
                    "OutputGroupSettings": {
                        "Type": "HLS_GROUP_SETTINGS",
                        "HlsGroupSettings": {
                            "ManifestDurationFormat": "INTEGER",
                            "SegmentLength": 10,
                            "TimedMetadataId3Period": 10,
                            "CaptionLanguageSetting": "OMIT",
                            "Destination": "s3://erda-public/output/",
                            "TimedMetadataId3Frame": "PRIV",
                            "CodecSpecification": "RFC_4281",
                            "OutputSelection": "MANIFESTS_AND_SEGMENTS",
                            "ProgramDateTimePeriod": 600,
                            "MinSegmentLength": 0,
                            "MinFinalSegmentLength": 0,
                            "DirectoryStructure": "SINGLE_DIRECTORY",
                            "ProgramDateTime": "EXCLUDE",
                            "SegmentControl": "SEGMENTED_FILES",
                            "ManifestCompression": "NONE",
                            "ClientCache": "ENABLED",
                            "AudioOnlyHeader": "INCLUDE",
                            "StreamInfResolution": "INCLUDE"
                        }
                    }
                }
            ],
            "AdAvailOffset": 0,
            "Inputs": [
                {
                    "AudioSelectors": {
                        "Audio Selector 1": {
                            "Offset": 0,
                            "DefaultSelection": "DEFAULT",
                            "ProgramSelection": 1
                        }
                    },
                    "VideoSelector": {
                        "ColorSpace": "FOLLOW",
                        "Rotate": "DEGREE_0",
                        "AlphaBehavior": "DISCARD"
                    },
                    "FilterEnable": "AUTO",
                    "PsiControl": "USE_PSI",
                    "FilterStrength": 0,
                    "DeblockFilter": "DISABLED",
                    "DenoiseFilter": "DISABLED",
                    "InputScanType": "AUTO",
                    "TimecodeSource": "ZEROBASED",
                    "FileInput": "s3://express-react-docker-awss3/21f7622d-9b77-47dd-8aae-591795df95ea.mp4"
                }
            ]
        },
        "AccelerationSettings": {
            "Mode": "DISABLED"
        },
        "StatusUpdateInterval": "SECONDS_60",
        "Priority": 0
    }

    // var params = {
    //     MaxResults: 0,
    // }

    let endPointPromise = new AWS.MediaConvert(
        {
            accessKeyId: process.env.AWS_ID,
            secretAccessKey: process.env.AWS_SECRET,
            apiVersion: '2017-08-29'
        }).createJob(params).promise();

    endPointPromise.then(
        (data) => {
            res.json(data)
        },
        (err) => {
            res.json(err);
        }
    )
})

module.exports = router;