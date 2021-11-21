const express = require('express');
// new code:
var session = require('express-session');
// original code:
var app = express();


app.use(express.static(__dirname + "/static"));
console.log (__dirname);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




// require body-parser
app.use( express.urlencoded({extended:true}) );
app.use(session({
    secret: 'cat',
    // resave: true,
    // saveUninitialized: false,
    // cookie: {},

}));



let user = "";

app.get ('/', function(req, res){
    let counter = 1;
    if ( req.session.views) {
        req.session.views+=1;
        counter =req.session.views;
    }
    else{
        req.session.views = 1;
    }
	res.render('index', {counter});
});

app.post('/addTwo', function (req, res){
    console.log("POST DATA \n\n", req.body)
    req.session.views +=1
    res.redirect('/');
});

app.post('/reset', function (req, res){
    req.session.destroy() 
    res.redirect('/');
});




app.listen(8080, function (){//final

	console.log("the user server is running in port 8080");
});
