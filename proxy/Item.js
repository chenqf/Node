/**
 * Created by Administrator on 2015/11/16.
 */
var BaseProxy = require('../lib/BaseProxy'),
    baseUrl = '';
if(process.env.NODE_ENV === 'online'){
    baseUrl = "http://item.51tiangou.com";
}else if(process.env.NODE_ENV === 'preOnline'){
    baseUrl = "http://item.66buy.com.cn";
}else if(process.env.NODE_ENV === 'test'){
    baseUrl = "http://test.51tiangou.com/item";
}else {
    baseUrl = "http://dev.51tiangou.com/item";
}

module.exports = new BaseProxy([
    {
        fnName:'search',//商品列表
        method:'POST',
        url:baseUrl + '/front/listing/search'
    },
    {
        fnName:'detail',//商品详情
        url:baseUrl + '/front/listing/detailInfo'
    }
]);


