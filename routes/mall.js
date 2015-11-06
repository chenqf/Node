var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoConfig = require('../config/mongoConfig.json');
var http = require('http');
var Promise = require('bluebird')
var HttpUtils = require('../libs/HttpUtils.js');

Promise.promisifyAll(http);
/**
 * �м��������router�µ����󣬶��������������
 */
router.use(function timeLog(req, res, next) {
    console.log('mall router use');
    next();
});

router.get('/',function(req,res,next){
    //console.log("cookie: " + JSON.stringify(req.cookies));
    //
    ////�������ݿ⣬ip��port
    //var server = new mongo.Server(mongoConfig.url,mongoConfig.port);
    ////��ȡ���ݿ����ָ�����ݿ�����
    //var db = new mongo.Db(mongoConfig.databaseName,server);
    //db.open(function(error,db){
    //    db.collection("task",function(error,collection){
    //        collection.insert({username:'chenqf',password:'123456'},function(error,docs){
    //            console.log(docs);
    //            db.close();
    //        })
    //    });
    //    console.log(db);
    //    console.log("db open ok")
    //});
    //��ǿ�ƹر����ݿ⣬�رպ󣬻���ͨ��open��
    /*db.close(false,function(){
        console.log('db close ok');
    })*/

    res.send('router get /mall');
});

router.get('/index.html',function(req,res,next){
    /*HttpUtils.post({
        url:'http://item.51tiangou.com/front/listing/search',
        data:{
            cityId:2554,
            source:1,
            orderColumn:'item_heat desc,start_time',
            orderType:'DESC',
            startNum:0,
            pageCount:10
        },
        callback:function(data){
            console.log('post')
        }
    });
    HttpUtils.get({
        url:'http://item.51tiangou.com/front/listing/search/categoryCode',
        data:{},
        callback:function(data){
            console.log('get')
        }
    });*/

    var request = http.getAsync('http://item.51tiangou.com/front/listing/search/categoryCode',function(response){
        response.setEncoding('utf8');
        response.on('data',function(chunk){
            console.log(chunk);
        })
    }).then(function(response){

    });
    //request.endAsync();


    res.render('index',{title:'title',name:'name'});
});

module.exports = router;
