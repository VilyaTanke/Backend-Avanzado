var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const basicAuth = require ('./lib/basicAuth');

const i18n =require('./lib/i18nConfigure');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); //usa un motor de vistas custom, llamado 'HTML'
app.engine('html', require('ejs').__express) // ese motor usa ejs


require('./lib/connectMongoose.js');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Ruta de la api
 */
app.use('/api/productos', basicAuth,require('./routes/api/productos'));

// setup de i18n
app.use(i18n.init);


/**
 * Rutas del Website
*/

app.use('/',            require('./routes/index'));
app.use('/productos',   require('./routes/productos'));
app.use('/change-locale', require('./routes/change-locale'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  
  if (err.array) {
    err.status = 422;
    const errorInfo = err.array({ onlyFirstError: true}) [0];
    console.log(errorInfo);
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${error.info.msg}`;
  }

  res.status(err.status || 500);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
