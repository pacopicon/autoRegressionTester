require('dotenv').config();

var express     			= require('express');
var app         			= express();
var path 							= require('path');
var bodyParser  			= require('body-parser');
var morgan      			= require('morgan');

// routes
var apiRoutes = require('./routes/api');

app.use(morgan('dev'));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PATCH,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, x-access-token');
    next();
}
app.use(allowCrossDomain);

// Set routes and error middleware

app.use('/api', apiRoutes);

// Set Port
app.set('port', (process.env.BACKEND_PORT || 5001));

// Start the server
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});