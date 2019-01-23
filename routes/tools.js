var express = require('express');
var router = express.Router();
const request = require('xhr-request');

router.get('/tangtraffic', function (req, res) {
    res.render('addtraffic', {ss: req.session.acc});
});



module.exports = router;
