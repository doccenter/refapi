var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/intellij',function (req, res) {
    res.render('huongdanintellij',{ss:req.session.acc});
});

router.get('/vs',function (req, res) {
    res.render('huongdanvs',{ss:req.session.acc});
});


module.exports = router;
