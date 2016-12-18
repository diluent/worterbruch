var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var http       = require('http');
var handlers   = require('./api.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

Object.keys(handlers).map(function(x){
    router.get('/insert', handlers[x]);
})

// router.route('/bears')
//     // create a bear (accessed at POST http://localhost:8080/api/bears)
//     .get(function(req, res) {
//             res.json({ message: 'Bear created!' });
//     });

app.use('/api', router);//prefix

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.stack);
});

app.listen(port);
console.log('Run on port ' + port);