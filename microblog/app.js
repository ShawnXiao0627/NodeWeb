
/**
 * Module dependencies.
 */

var express = require('express');

var user = require('./routes/user');
var http = require('http');
var path = require('path');
var partials = require('express-partials');
var MongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');

var settings = require('./setting');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser()); 
app.use(express.cookieParser(settings.cookieSecret)); 
app.use(express.session({ 
  secret: settings.cookieSecret, 
  store: new MongoStore({ 
    db: settings.db,
    url: settings.url
  }) 
})); 
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(function (req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
});

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});