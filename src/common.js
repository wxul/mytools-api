//针对不同content-type进行处理
var txtbefore = function(req, res, next) {
    var resmodel = { error: 0, data: null, msg: '' };

    function callback(request, cb) {
        if (typeof cb !== 'function') return;
        var postdata = "";
        request.addListener("data", function(postchunk) {
            postdata += postchunk;
        })
        request.addListener("end", function() {
            cb(postdata);
        });
    }

    var reqheader = req.headers['content-type'];
    if (/^multipart\/form-data/.test(reqheader)) {
        //使用connect-multiparty
        req.postdata = req.body;
        next();
        /*console.log("formdata!!!!!!");
        callback(req, function(data) {
            
            /*var params = qs.parse(data);
            console.log(params);
            console.log(params['txt']);
            req.postdata = params;
            next();
        })*/
    } else if ("application/x-www-form-urlencoded" == reqheader) {
        req.postdata = req.body;
        next();
    } else if (/^application\/json/.test(reqheader)) {
        console.log("application/json!!!!!!");
        callback(req, function(data) {
            req.postdata = JSON.parse(data);
            next();
        })
    } else {
        req.postdata = req.body;
        next();
    }
}

exports.txtbefore = txtbefore;