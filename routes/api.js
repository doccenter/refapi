const express = require('express');
const router = express.Router();
const request = require('request');
router.get('/google-translate', function (req, res, next) {
    var sourceText = req.query.word;
    var sourceLang = req.query.slang;
    var targetLang = req.query.tlang;
    console.log(sourceText);
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
        + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    request({
        url: url,
    }, function (error, response, body) {
        if (error) {
            return res.send({error: error+'bbb'});
        }
        console.log(body);
        var mean = JSON.parse(body)[0][0];
        var options = {
            url: 'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + sourceText,
            headers: {
                'Content-Type': 'text/html',
                'app_id': 'db895322',
                'app_key': '43f0ca85647144d444eb65dcff43bffb',
            }
        };
        //xxin v
        request(options, function (error, response2, body2) {
            if (error) {
                return res.send({error: error+'xzvzxc'});
            } else {
                try {
                    var json = JSON.parse(body2);
                    var spelling = json.results[0].lexicalEntries[0].pronunciations[0].phoneticSpelling;
                    var audioFile = json.results[0].lexicalEntries[0].pronunciations[0].audioFile;
                    var typeword = json.results[0].lexicalEntries[0].lexicalCategory;
                    return res.json({
                        word: mean[1],
                        mean: mean[0],
                        spelling: spelling,
                        type: typeword,
                        audioFile: audioFile
                    });
                } catch (e) {
                    return res.send({error: error+'zxcvzxcv'});
                }
            }
        });

    });
});

router.get('/mp3', function (req, res) {
    var key = req.key;
    var url = "https://mp3.zing.vn/xhr/media/get-source?type=audio&key="+key;

    request(url, {
        json: true
    }, function (err, data) {
        if (err) throw err;
        res.send('https:'+data.data.source['128']);
    })
});


module.exports = router;
