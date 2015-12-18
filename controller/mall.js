var controller = require('../lib/Controller').factory();
/**
 * 异步同时请求多个接口
 */
controller.get('/a.html',function(req,res){
    console.log(req.body);
    var that = this;
    this.promise.all([
        this.Item.detail({
            id:707869,
            storeId:303,
            isApp:false
        }),
        this.Item.search({
            currentCityOnly:true,
            cache:true,
            cityId:2755,
            source:1,
            startNum:0,
            pageCount:2
        })
    ]).then(function(data){
        that.logger.info(JSON.stringify(req.body));
        that.logger.warn(JSON.stringify(req.body));
        that.logger.error(JSON.stringify(req.body));
        that.logger.debug(JSON.stringify(req.body));
        res.send(data);
    });
});

/**
 * 请求一个接口
 */
controller.get('/b.html',function(req,res){
    this.Item.detail({
        id:707869,
        storeId:303,
        isApp:false
    }).then(function(data){
        res.send(data);
    })
});


/**
 * 请求嵌套接口
 */
controller.get('/c.html',function(req,res){
    var that = this;
    that.Item.detail({
        id:707869,
        storeId:303,
        isApp:false
    }).then(function(data){
        that.Item.search({
            currentCityOnly:true,
            cache:true,
            cityId:2755,
            source:1,
            startNum:0,
            pageCount:2
        }).then(function(data){
            res.send(data);
        })
    })
});

module.exports = controller.router;