const async = require('async')
const AWS = require('aws-sdk')
const gm = require('gm').subClass({ imageMagick: true })
const util = require('util')
const s3 = new AWS.S3()

exports.handler = function(event, context, callback) {

    // get the buckent name from the evenet object
    let srcBucket = event.Records[0].s3.bucket.name
    // remove spaces or unicode non-ASCII characters from input file name
    let inputFile = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "))
    let dstBucket = "task-master-thumbnails"
    let outputFile = "thumb-" + inputFile

    // get the file extension
    let fileExt = inputFile.match(/\.([^.]*)$/)
    if (!fileExt) return 'wrong file type'
    let imageType = fileExt[1].toLowerCase()

    // must be jpg or png
    if (imageType != "jpg" && imageType != "png") return 'wrong file type'

    // download the image from S3, transform, and upload to a different S3 bucket
    async.waterfall([
        function download(next) {
            // Download the image from S3 into a buffer.
            s3.getObject({Bucket: srcBucket, Key: inputFile}, next)},
        function transform(response, next) {
            gm(response.Body).size(function(err, size) {
                // Transform the image buffer in memory.
                this.resize(50, 50).toBuffer(imageType, function(err, buffer) {
                    if (err) {
                        next(err)
                    } else {
                        next(null, response.ContentType, buffer)
                    }
                })
            })
        },
        function upload(contentType, data, next) {
            // Stream the transformed image to a different S3 bucket.
            s3.putObject({Bucket: dstBucket, Key: outputFile, Body: data, ContentType: contentType}, next)
            }
        ]
    )
}
