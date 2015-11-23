var controller = require('../lib/Controller').factory();

/**
 * �첽ͬʱ�������ӿ�
 */
controller.get('/a.html',function(req,res){
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
        res.send(data);
    });
});

/**
 * ����һ���ӿ�
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
 * ����Ƕ�׽ӿ�
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