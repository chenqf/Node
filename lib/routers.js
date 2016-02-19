/**
 * Created by 陈其丰 on 2015/12/24.
 */
var fileList = require('./util/fileList');

module.exports = {
    init:function(app,opt){
        var fileRelPath = (opt || {}).fileRelPath || './controller',
            routerRelPath = (opt || {}).routerRelPath || '';
        fileList.list(fileRelPath,{suffix:false}).forEach(function(router){
            app.use(routerRelPath + router.path.replace(fileRelPath,''),require('../' + router.path));
        });
    }
};