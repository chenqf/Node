/**
 * Created by 陈其丰 on 2015/12/24.
 */
var fileList = require('./util/fileList');

module.exports = {
    init:function(app,relPath){
        relPath = relPath || './controller';
        fileList.list(relPath,{suffix:false}).forEach(function(router){
            app.use(router.path.replace(relPath,''),require('../' + router.path));
        });
    }
};