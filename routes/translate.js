var express = require('express');
var router = express.Router();
var request = require('request');
router.get('/google', function (req, res, next) {
    var sourceText = req.query.word;
    var sourceLang = req.query.slang;
    var targetLang = req.query.tlang;
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
        + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    request({
        url: url,
    }, function (error, response, body) {
        if (error) {
            return res.send({error: error});
        }
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
                return res.send({error: error});
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

                }
            }
        });

    });
});

router.get('/gioithieu', function (req, res) {
    res.render('gioithieugoogletranslate', {ss: req.session.acc});
});

module.exports = router;
