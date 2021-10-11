const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/login', (req, res) => {
  try{
    return res.status(200).render('login');
  } catch(error) {
    console.log("로그인창 오류 발생");
    return res.status(400).render('error');
  }
});


app.get('/signup', (req, res) => {
  try{
    return res.status(200).render('signUp');
  } catch(error) {
    console.log("로그인창 오류 발생");
    return res.status(400).render('error');
  }
});

module.exports = app;