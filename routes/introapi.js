const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/google-translate', function (req, res) {
    res.render('gioithieugoogletranslate', {ss: req.session.acc});
});

router.get('/mp3', function (req, res) {
    res.render('gioithieugoogletranslate', {ss: req.session.acc});
});

module.exports = router;
