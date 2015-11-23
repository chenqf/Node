var request = require('request'),
    Promise = require('bluebird'),
    queryString = require('querystring'),
    HttpUtils = function(){};

HttpUtils.prototype.get = function(options){
    var uriOpt = {
            headers: {"Accept": "*/*"},
            url:options.url,
            method:options.method || "GET",
            json:true
        },
        data = options.data || {},
        token = this.token || '',
        errorData = {
            code:0,
            success:false,
            data:[]
        },
        tgRequest = request.defaults({headers: {'Cookie': 'token=' + token + ';'}});

    if(uriOpt.method === 'GET'){
        uriOpt.url = queryString.stringify(data) ? (uriOpt.url + '?' + queryString.stringify(data)) : uriOpt.url;
    }
    return new Promise(function (resolve, reject) {
        try{
            tgRequest(uriOpt, function(error, response, data){
                if (!error && response.statusCode == 200) {
                    resolve(data);
                }else{
                    resolve(errorData);
                }
            }).form(data);
        }catch(e){
            resolve(errorData);
        }
    });
};
HttpUtils.prototype.post = function(options){
    options.method = 'POST';
    return this.get.apply(this,arguments);
};

HttpUtils.prototype.all = function(array){
    array = array || [];
    var i = 0,
        length = array.length,
        arr = [];
    for(; i < length; i++){
        arr.push(this.get(array[i]));
    }
    return Promise.all(arr);
};

module.exports = new HttpUtils();