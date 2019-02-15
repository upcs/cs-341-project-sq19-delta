import { NextFunction, Response, Request, ErrorRequestHandler } from "express";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var roadsRouter = require('./routes/roads');
var reviewsRouter = require('./routes/reviews');
var addReviewRouter = require('./routes/addReview');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/roads', roadsRouter);
app.use('/reviews', reviewsRouter);
app.use('/add-review', addReviewRouter);


// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(typeof err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
