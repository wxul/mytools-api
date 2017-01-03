var fs = require('fs');
var qs = require('querystring');

var url = require('url');
var crypto = require('crypto');
var Buffer = require("buffer").Buffer;

var md5 = function(txt, file) {
    if (file) { return ""; } else {
        var buf = new Buffer(txt);
        var str = buf.toString("binary");
        return crypto.createHash("md5").update(str).digest("hex");
    }
}

var sha1 = function(txt, file) {
    if (file) { return ""; } else {
        var buf = new Buffer(txt);
        var str = buf.toString("binary");
        return crypto.createHash("sha1").update(str).digest("hex");
    }
}

var base64 = function(txt, file) {
    if (file) { return ""; } else {
        console.log(txt);
        var b = new Buffer(txt).toString('base64');
        console.log(b);
        return b;
    }
}

var base64decode = function(txt) {
    return new Buffer(txt, 'base64').toString();
}

var response = function(res, txt, resmodel) {
    res.writeHead(200, { "Content-Type": "text/json" });
    resmodel.data = {
        md5: md5(txt),
        sha1: sha1(txt),
        base64: base64(txt)
    };
    res.write(JSON.stringify(resmodel));
    res.end();
}

//字符串hash
var txthash = function(req, res) {
    var resmodel = { error: 0, data: null, msg: '' };

    console.log(req.postdata);
    var txt = req.postdata.txt || '';
    response(res, txt, resmodel);
    res.end();
}

//base64解码
var basedecode = function(req, res) {
    var resmodel = { error: 0, data: null, msg: '' };
    var txt = req.postdata.base64 || ''
    try {
        var re = base64decode(txt);
        resmodel.data = re;
    } catch (error) {
        resmodel = { error: 1, data: null, msg: '错误的输入' };
    }
    res.writeHead(200, { "Content-Type": "text/json" });
    res.write(JSON.stringify(resmodel));
    res.end();
}

var filehash = function(req, res) {
    var resmodel = { error: 0, data: null, msg: '' };

    var md5 = function(txt) {
        var buf = new Buffer(txt);
        var str = buf.toString("binary");
        return crypto.createHash("md5").update(str).digest("hex");
    }
    var sha1 = function(txt) {
        var buf = new Buffer(txt);
        var str = buf.toString("binary");
        return crypto.createHash("sha1").update(str).digest("hex");
    }

    var postdata = "";
    req.addListener("data", function(postchunk) {
        postdata += postchunk;
    })

    //POST结束输出结果
    req.addListener("end", function() {
        console.log(postdata);
        var params = qs.parse(postdata);
        var txt = params['txt'] || '';
        res.writeHead(200, { "Content-Type": "text/json" });
        //md5
        resmodel.data = {
            md5: md5(txt),
            sha1: sha1(txt)
        };
        res.write(JSON.stringify(resmodel));
        res.end();

    })
}

exports.txthash = txthash;
exports.basedecode = basedecode;
exports.filehash = filehash;