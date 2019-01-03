const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const translate = require('./routes/translate');
const huongdan = require('./routes/huongdan');
const cuagai = require('./routes/cuagai');
const tools = require('./routes/tools');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret: "Shh, its a secret!"}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/translate', translate);
app.use('/huong-dan', huongdan);
app.use('/tools', tools);


app.get('/', function (req, res) {
    res.render('index', {ss: req.session.acc});
});

app.get('/cua-gai', function (req, res) {
    res.render('cuagai', {ss: req.session.acc});
});
app.get('/webhoctap', function (req, res) {
    res.render('webhoctap', {ss: req.session.acc});
});

app.get('/gioi-thieu', function (req, res) {
    res.render('giothieuwebsite', {ss: req.session.acc});
});

app.get('/nhat-ki', function (req, res) {
    res.render('nhatki', {ss: req.session.acc});
});

app.get('/dieu-khoan', function (req, res) {
    res.render('dieukhoan', {ss: req.session.acc});
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.listen(process.env.PORT || '3000');

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
