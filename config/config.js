/**
 * Created by Administrator on 2015/11/17.
 */

var config = {
    "port":3000,
    "mail":{
        "username":"546710115@qq.com",
        "password":"cqf5115215473",
        "fromName":"陈其丰 <546710115@qq.com>"
    }
};
if(process.env.NODE_ENV === 'preOnline'){
    config.domain = '66buy.com'
}else{
    config.domain = '51tiangou.com'
}

module.exports = config;
