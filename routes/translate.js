const express = require('express');
const router = express.Router();
const request = require('request');
router.get('/google', function (req, res, next) {
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
                'app_id': '282c8a0e',
                'app_key': 'c980f725deb5b72b477ca647ad678784',
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

router.get('/gioithieu', function (req, res) {
    res.render('gioithieugoogletranslate', {ss: req.session.acc});
});

router.get('/sproxy', function (req, res) {

    request({'url':req.query.url,
        'proxy':req.query.proxy}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
           return res.send('Send to: '+ req.query.url+" with proxy: "+ req.query.proxy);
        }else
            return res.send('No '+ req.query.url+" with proxy: "+ req.query.proxy);
    })
});

module.exports = router;
