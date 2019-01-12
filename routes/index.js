var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', {ss: req.session.acc});
});

router.get('/tong-quan-ngon-ngu', function (req, res) {
    res.render('tongquanngonngu', {ss: req.session.acc});
});

router.get('/cua-gai', function (req, res) {
    res.render('cuagai', {ss: req.session.acc});
});
router.get('/webhoctap', function (req, res) {
    res.render('webhoctap', {ss: req.session.acc});
});

router.get('/gioi-thieu', function (req, res) {
    res.render('giothieuwebsite', {ss: req.session.acc});
});

router.get('/nhat-ki', function (req, res) {
    res.render('nhatki', {ss: req.session.acc});
});

router.get('/dieu-khoan', function (req, res) {
    res.render('dieukhoan', {ss: req.session.acc});
});

router.get('/tong-hop-kien-thuc', function (req, res) {
    res.render('tonghopkienthuc', {ss: req.session.acc});
});


router.get('/auth', function (req, res) {
    var token = req.query.token;
    if (token === 'Ngulozwa') {
        req.session.acc = 'ok';
    }
    res.redirect('/');
});


module.exports = router;
