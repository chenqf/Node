var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoConfig = require('../config/mongoConfig.json');

/**
 * �м��������router�µ����󣬶��������������
 */
router.use(function timeLog(req, res, next) {
    console.log('mall router fittler');
    next();
});

router.get('/',function(req,res,next){
    console.log("cookie: " + JSON.stringify(req.cookies));

    //�������ݿ⣬ip��port
    var server = new mongo.Server(mongoConfig.url,mongoConfig.port);
    //��ȡ���ݿ����ָ�����ݿ�����
    var db = new mongo.Db(mongoConfig.databaseName,server);
    db.open(function(error,db){
        console.log(db);
        console.log("db open ok")
    });
    //��ǿ�ƹر����ݿ⣬�رպ󣬻���ͨ��open��
    /*db.close(false,function(){
        console.log('db close ok');
    })*/

    res.send('router get /');
});

router.get('/mall',function(req,res,next){
    res.render('index', { title: 'He222y', message: 'Hello t222here!'});
});

module.exports = router;
