/**
 * Created by Administrator on 2015/12/6.
 */

var fs = require('fs');

//删除文件
function deleteFile(){
    fs.unlink('./test', function (err) {
        if (err) throw err;
        console.log('successfully deleted /tmp/hello');
    });
}

//重命名,相当于 linux 里的mv ，可以改名，移动
function reName(){
    fs.rename('./lib/test.js', './test.js', function (err) {
        if (err) throw err;
        console.log('renamed complete');
    });
}

//获取文件信息
function getFileInfo(){
    fs.stat('./test.js',function(err,state){
        if(err) throw err;
        console.log(state)
    })
}

//像文件中追加内容
function appendFile(){
    fs.appendFile('./test.js', 'data to append', 'utf8', function(err){
        if(err) throw err;
    });
}

//TODO access 权限？
//TODO chmod 增加权限？
//TODO chown 改变所属人？


//读取文件,返回字符串,文件内容全部存入内存，copy使用与小文件
function readFile(){
    fs.readFile('./test.js', {encoding: 'utf8'},function(error,file){
        if(error) throw error;
        console.log(file.length)
    });
}

//覆盖文件内容，没有文件时，创建文件并写入
function writeFile(){
    fs.writeFile('./test12.js','汉字',{encoding:'utf8'},function(error){
        if(error) throw error;
    })
}

//大文件用流的方式复制
function bigFileCopy(){
    fs.createReadStream('./test1.js').pipe(fs.createWriteStream('./test2222212.js'));
}

//判断文件或文件夹是否存在
function isFile(){
    fs.exists('./bin', function(exists){
        console.log(exists)
    })
}
//创建文件夹
function mkdir(){
    fs.mkdir('./dddd', function(err){
        if(error) throw error;
    })
}








