const functions = require('firebase-functions');
const AWS = require('aws-sdk');
const stream = require('stream');
const request = require('request');


exports.moveImage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const state = req.query.state;
    const type = req.query.category;
    const filename = req.query.filename
    const filePath = req.query.imageUrl
    
    uploadData()

    function uploadFromStream() {
        var pass = new stream.PassThrough();
      
        var params = {Bucket: BUCKET, Key: KEY, Body: pass};
        AWS.S3().upload(params, function(err, data) {
          console.log(err, data);
          if(err != null){
            res.json({result: data});
          }else{
            res.json({result: err})
          }
        });
      
    }
    
    function uploadData(){
        request(filePath).pipe(uploadFromStream)
            .on('error', (err) => console.log(err))
            .on('finish', () => {
                res.statusCode = 200
                console.log('success save image')});
    }
});


