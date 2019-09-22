var express 	= 	require('express');
var faker 		= 	require ('faker');
var mysql 		= 	require ('mysql');
var bodyParser 	= 	require ('body-parser');
var app 		= 	express();

app.set("view engine", "ejs");
//to read the user input
app.use(bodyParser.urlencoded({extended: true}));
//to connect app.css to home.ejs
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '-',
  password : '-',
  database : 'join_us'
});

app.get("/", function(req,res){
	//count of users in DB
	//Respond with the count
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(err, results){
		if (err) throw err;
		var count = results[0].count;
		res.render("home", {count: count});
		// console.log(results[0].count);

	});
});

app.post("/register", function(req, res){
	var person = {
		email: req.body.email
	};
	connection.query('INSERT INTO users SET ?', person, function(err,result){
		if (err) throw err;
		res.redirect('/'); 
	});

});

app.listen(3000, function(){
	console.log("Server running on 3000");
});