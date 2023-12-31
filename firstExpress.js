var exp = require("express");
var fs = require("fs"); 

var app= exp();

app.listen(8500, function(){
	console.log("created at 8500...");
});

app.use(exp.static('images'));
app.use(exp.static('styles'));

app.use(function(req,res,next){
	var str=  "\nRequest recieved for "+req.path+" at "+ new Date();
	fs.appendFile("logfile.txt",str, function(err){
		console.log("recieved");
	});
	next();
})

app.get("/home", function(req, res){
	res.send("<h1>Welcome to web app</h1>");
});

app.get("/login",function(req,res){
	res.sendFile(__dirname+"/loginform.html");
});

app.get("/logincheck", function(req, res){
	if(req.query.uid == "object" && req.query.pwd == "knowit")
	{
		res.send("Successful!!");
	}
	else
	{
		res.redirect("http://localhost:8500/login");
	}
})

app.all("*", function(req, res){
	res.send("<h2>wrong url</h2>");
});