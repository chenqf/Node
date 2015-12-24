/**
 * Created by 陈其丰 on 2015/12/24.
 */

var fs = require('fs');

function geFileList(paths,list,opt){
    if(typeof paths === 'string'){
        paths = [paths];
    }else if(!Array.isArray(paths)){
        return [];
    }
    var suffix = opt.hasOwnProperty('suffix') ? opt.suffix : true;
    paths.forEach(function(path){
        var files = fs.readdirSync(path);
        files.forEach(function(i){
            var state = fs.statSync(path + '/' + i);
            if(state.isDirectory()){
                geFileList(path + '/' + i,list,opt)
            }else if(state.isFile()){
                list.push({
                    path:suffix ? (path + '/' + i):(path + '/' + i).replace(/([a-zA-Z0-9_])\.(js|css|html|json)$/,'$1'),
                    //path:path + '/' + i,
                    name:i,
                    size:state.size
                });
            }
        });
    })
}

module.exports = {
    list:function(paths){
        var list = [],
            opt = arguments[1] || {};
        geFileList(paths,list,opt);
        return list;
    }
};

