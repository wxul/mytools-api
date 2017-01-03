var express = require('express');
var app = express();
var bp = require('body-parser');
var multipart = require('connect-multiparty');

app.use(bp.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

var txtbefore = require('./src/common').txtbefore,
    hash = require('./src/hash'),
    txthash = hash.txthash,
    basedecode = hash.basedecode;
var jsug = require('./src/jsmin'),
    txtuglify = jsug.txtuglify,
    fileuglify = jsug.fileuglify;

app.get('/', (req, res) => {
        res.send('hello!');
    })
    .post('/hash/txt', txtbefore, txthash)
    .post('/hash/basedecode', txtbefore, basedecode)
    .post('/hash/file', function(req, res) {
        require('./src/hash').filehash(req, res);
    })
    .post('/js/txt', txtbefore, txtuglify)
    .post('/js/file', multipart(), fileuglify);

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})