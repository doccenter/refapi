var express = require('express');
var router = express.Router();
const request = require('xhr-request');

router.get('/tangtraffic', function (req, res) {
    res.render('addtraffic', {ss: req.session.acc});
});

router.get('/mp3', function (req, res) {
    var url = "https://mp3.zing.vn/xhr/media/get-source?type=audio&key=knxmtLHscSzJNkRymtbGLHtkWzxbsRaBa";

    request(url, {
        json: true
    }, function (err, data) {
        if (err) throw err;

        // the JSON result
        res.json({'url':'https:'+data.data.source['128']})
    })
});

module.exports = router;
