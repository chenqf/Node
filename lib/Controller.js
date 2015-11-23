/**
 * Created by Administrator on 2015/11/17.
 */

var Item = require('../proxy/Item'),
    Promise = require('bluebird'),
    BaseController = require('./BaseController'),
    Controller = BaseController.extend({
        init:function(){
            BaseController.prototype.init.call(this);
            this.Item = Item;
            this.promise = Promise;
        },
        all:function(){
            return Promise.all(arguments);
        }
    });
Controller.factory = function(){
    return new Controller();
};

module.exports = Controller;
