var Class = require('./Class'),
    HttpUtils = require('../lib/HttpUtils');

module.exports = Class.extend({
    init:function(opts){
        opts = opts || [];
        var that = this,
            i = 0,
            length = opts.length,
            fnName,method,url;
        for(; i < length; i++){
            fnName = opts[i].fnName;
            method = opts[i].method || 'GET';
            url = opts[i].url;
            that[fnName] = (function(url,method){
                return function(data){
                    return that.proxy(url,method,data)
                }
            })(url,method)
        }
    },
    proxy:function(url,method,data){
        return HttpUtils.get({
            url:url,
            method:method,
            data:data
        })
    }
});
