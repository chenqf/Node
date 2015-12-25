/**
 * Created by Administrator on 2015/11/16.
 */
var BaseProxy = require('../lib/BaseProxy'),
    baseUrl = '';
if(process.env.NODE_ENV === 'online'){
    baseUrl = "http://coupon.51tiangou.com";
}else if(process.env.NODE_ENV === 'preOnline'){
    baseUrl = "http://coupon.66buy.com.cn";
}else if(process.env.NODE_ENV === 'test'){
    baseUrl = "http://test.51tiangou.com/coupon";
}else {
    baseUrl = "http://dev.51tiangou.com/coupon";
}

module.exports = new BaseProxy([
    {
        fnName:'query',//我的优惠券
        url:baseUrl + '/publics/couponCode/query'
    },
    {
        fnName:'get',//获取优惠券详情
        url:baseUrl + '/publics/couponCode/get'
    }
]);