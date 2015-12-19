var express = require("express"),
	http = require("http"),
	fs = require("fs"),
	lessMiddleware = require("less-middleware"),
	app, server;

app = express();

server = http.createServer(app);

var bodyParser    = require('body-parser');
mysql             = require('mysql');

var db            = require('./db-setting');

var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('json spaces', 1);

var customer = require('./routes/customer');

console.log("customer ====", customer);

app.post('/sign_up', customer.signup);


app.get('/Home', function (req, res) {
	res.render('index', { title: 'ALL API'});
});

app.get('/user_name',customer.getUserName);
app.get('/login',customer.login);
app.get('/profile', customer.profile);
app.post('/edit_profile', customer.edit_profile);
app.post('/logOut', customer.LogOut);
app.get('/access_token', customer.getAccessToken);
app.get('/dashboard', customer.dashboardInfo);


app.configure(function() {
	// read the port from the environment, else set to 3000
	app.set("port", process.env.PORT || 8000);
	app.set("views", __dirname + "/views");
	app.engine('html', require('ejs').renderFile);
	//app.use(express.bodyParser());
	// pull in all the controllers
	fs.readdirSync("controllers").forEach(function(controllerName) {
		require("./controllers/" + controllerName)(app, server);
	});
	app.use(app.router);
	app.use(lessMiddleware({
		src: __dirname + "/less",
		dest: __dirname + "/public/css",
		// if you're using a different src/dest directory, you MUST
		// include the prefex, which matches the dest public directory
		prefix: "/css",
		// force true recompiles on every request... not the best
		// for production, but fine in debug while working through changes
		force: true
	}));
	app.use(express.static(__dirname + "/public"));
});

app.configure("development", function() {
	app.use(express.errorHandler());
});

server.listen(app.get("port"), function() {
	console.log("Express server listening on port " + app.get("port"));
});
