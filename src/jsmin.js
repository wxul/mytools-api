var uglifyjs = require('uglify-js');

var txtuglify = function(req, res) {

    var resmodel = { error: 0, data: null, msg: '' };

    console.log(req.postdata);
    var txt = req.postdata.jstxt || '';
    res.writeHead(200, { "Content-Type": "text/json" });
    var result = uglifyjs.minify(txt, {
        fromString: true
    });
    resmodel.data = result.code;
    res.write(JSON.stringify(resmodel));
    res.end();

}

var fileuglify = function(req, res) {

    var resmodel = { error: 0, data: null, msg: '' };

    var s = [];
    //console.log(req.files)
    Object.keys(req.files).map(key => {
        //console.log(key, req.files[key].js.path)
        var f = req.files[key];
        if (f.hasOwnProperty("js")) {
            s.push(f.js.path);
        }
    });
    console.log(s, s.length);
    if (s.length == 0) {
        resmodel = { error: 1, data: null, msg: '没有文件！' };
    } else {
        try {
            var result = uglifyjs.minify(s);
            resmodel.data = result.code;
        } catch (error) {
            resmodel = { error: 1, data: null, msg: '不支持的转换格式！' };
        }

    }
    /*
    if (req.files.file.length) {
        req.files.file.forEach(function(f) {
            s.push(f.path);
        })
    } else {
        s.push(req.files.file.path);
    }
*/
    res.writeHead(200, { "Content-Type": "text/json" });

    res.write(JSON.stringify(resmodel));
    res.end();
}

exports.txtuglify = txtuglify;
exports.fileuglify = fileuglify;