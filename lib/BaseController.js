/**
 * Created by Administrator on 2015/11/17.
 */
var express = require('express'),
    Class = require('../lib/Class'),
    HttpUtils = require('../lib/HttpUtils'),
    BaseController = Class.extend({
        init:function(){
            this.router = express.Router();
        },
        get:function(key,callback){
            var that = this;
            that.router.get(key,function(req,res,next){
                var cookies = req.cookies || {};
                HttpUtils.token = cookies.token || '';
                req.body = req.query || {};
                try{
                    callback.apply(that,arguments);
                }catch(e){
                    res.send({
                        message:'error'
                    })
                }
            })
        },
        post:function(key,callback){
            var that = this;
            that.router.post(key,function(req,res,next){
                var cookies = req.cookies || {};
                HttpUtils.token = cookies.token || '';
                req.body = req.body || {};
                try{
                    callback.apply(that,arguments);
                }catch(e){
                    res.send({
                        message:'error'
                    })
                }
            })
        }
    });

module.exports = BaseController;

