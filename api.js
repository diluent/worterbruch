var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/my_database_name';

function connect(callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            callback(db)
        }
    })
}

module.exports.words = function get(req, res) {

    connect(function(db) {

        var collection = db.collection('words')
        collection
        .find()
        //find({name: 'modulus user'})
        .toArray(function (err, result) {
            if (err) {
                res.json({Error: err})
            } else if (result.length) {
                res.json({Words: result})
            } else {
                res.json({Message: 'No document(s) found with defined "find" criteria!'})
            }
            db.close()
        })
    })
}

module.exports.addWord = function add(req, res) {
    connect(function(db) {
    
        var collection = db.collection('words');

        console.log(req)

        var word = {word: req.params.word, translation: req.params.translation};

        collection.insert([word], function (err, result) {
            if (err) {
                res.json({Error: err})
            } else {
                res.json({Message: 'ok'})
            }
            db.close()
        });
    })

}

