var http = require('http'),
    url = require('url'),
    querystring = require('querystring');
var HttpUtils = function(){};

HttpUtils.prototype.get = function(options){
    var uri = options.url,
        uriOpt = url.parse(uri),
        data = options.data || {},
        callback = options.callback || options.success || function(){};
    uriOpt.method = uriOpt.method ||'GET';
    var request = http.request(uriOpt,function(response){
            response.setEncoding('utf8');
            response.on('data',function(chunk){
                callback(chunk);
            })
        });
    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    request.write(querystring.stringify(data));
    request.end();
};
HttpUtils.prototype.post = function(options){
    options.method = 'POST';
    this.get(options);
};

module.exports = new HttpUtils();