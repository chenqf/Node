/**
 * Created by Administrator on 2015/11/17.
 */

var HttpUtils = require('./lib/HttpUtils');

HttpUtils.post({
    url:'http://chenqf.51tiangou.com:8080/financing/admin/login',
    data:{
        username:'333',
        password:'3333'
    }
}).then(function(data){
    console.log(data);
});

