const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var cors = require('cors');

var uri = 'mongodb://heroku_c7kvvncf:o8gcj3d2ivm88qd4cuc0jqu22u@ds125841.mlab.com:25841/heroku_c7kvvncf';
//CORS
var app = express();
var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');

        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.send(200);
        } else {
            next();
        }
    };
    app.use(allowCrossDomain);

// Connect
const connection = (closure) => {
return MongoClient.connect(uri, { useNewUrlParser: true },(err, client) => {
if (err) return console.log(err);

let db = client.db('heroku_c7kvvncf');
closure(db);
});
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    data: [],

};

// Get users
app.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);

            });
    });
});

module.exports = app;
