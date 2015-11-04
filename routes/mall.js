var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoConfig = require('../config/mongoConfig.json');

/**
 * 中间件，所有router下的请求，都会先走这个方法
 */
router.use(function timeLog(req, res, next) {
    console.log('mall router fittler');
    next();
});

router.get('/',function(req,res,next){
    console.log("cookie: " + JSON.stringify(req.cookies));

    //连接数据库，ip，port
    var server = new mongo.Server(mongoConfig.url,mongoConfig.port);
    //获取数据库对象，指定数据库名称
    var db = new mongo.Db(mongoConfig.databaseName,server);
    db.open(function(error,db){
        console.log(db);
        console.log("db open ok")
    });
    //不强制关闭数据库，关闭后，还可通过open打开
    /*db.close(false,function(){
        console.log('db close ok');
    })*/

    res.send('router get /');
});

router.get('/mall',function(req,res,next){
    res.render('index', { title: 'He222y', message: 'Hello t222here!'});
});

module.exports = router;
