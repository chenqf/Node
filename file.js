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


//组装用户名
function allName(){
    var array = [],
        i;
    for(i = 1; i<=16; i++){
        var file = fs.readFileSync('./wangMing' + i + '.json', {encoding: 'utf8'});
        array = array.concat(JSON.parse(file))
    }
    //数组去重
    var json = [];
    for(i = 0; i<array.length; i++){
        if(json.indexOf(array[i]) < 0 && array[i].indexOf('陈其') < 0 && array[i].indexOf('从日') && array[i].indexOf('丛日') && array[i].indexOf('/') < 0 && array[i].indexOf('\\') < 0){
            json.push(array[i]);
        }
    }

    fs.writeFile('./wangMing.json',JSON.stringify(array),{encoding:'utf8'},function(error){
        if(error) throw error;
    });

    console.log(array.length)

}


function allImage(){
    var array = [];
    var json = [];
    var i;
    for(i = 70; i<= 100; i++){
        var flg = fs.existsSync('./image' + i + '.json');
        var file;
        if(flg){
            file = fs.readFileSync('./image' + i + '.json', {encoding: 'utf8'});
            array = array.concat(JSON.parse(file));
        }
    }
    for(i = 0; i<array.length; i++){
        var openId = array[i].openId;
        if(json.indexOf(openId) >= 0){
            array.splice(i,1);
            i = i -1;
        }else{
            json.push(openId);
        }
    }

    fs.writeFile('./image.json',JSON.stringify(array),{encoding:'utf8'},function(error){
        if(error) throw error;
    });
}









var getRandomName = function(){
    var json = require('./wangMing.json');
    var getRandomArray = function() {
        var ge,shi,bai,qian,num;
        ge = parseInt(Number(Math.random() * 10));
        shi = parseInt(Number(Math.random() * 10));
        bai = parseInt(Number(Math.random() * 10));
        qian = parseInt(Number(Math.random() * 10));
        num = Number(String(qian) + String(bai) +String(shi) +String(ge));
        if(num > 5882){
            return getRandomArray();
        }else{
            return num;
        }
    };
    var num = getRandomArray();
    if(json[num]){
        return json[num];
    }else{
        return getRandomName();
    }
};


var getImage = function(page){
    page = page || 1;
    //每页100条
    var startNum = (page - 1) * 100;
    var length = startNum + 100;
    var HttpUtils = require('./lib/HttpUtils.js');
    var memberList = require('./member2.json').splice(40000,10000);
    var array = [];
    var memberIdList = [];
    for(var i = startNum; i<length; i++){
        (function(memberSecId){
            setTimeout(function(){
                HttpUtils.get({
                    url:'http://item.51tiangou.com/barginRecord/shareDetail',
                    data:{
                        activityProductId:127742,
                        memberSecId:memberSecId
                    }
                }).then(function(data){
                    if(data.data.bargainRecords.length){
                        console.log(memberSecId);
                        console.log('has')
                        for(var j = 0; j<data.data.bargainRecords.length; j++){
                            array.push({
                                openId:data.data.bargainRecords[j].openId,
                                image:JSON.parse(data.data.bargainRecords[j].wechatName).headimgurl
                            })
                        }
                        fs.writeFile('./image' + String(page) + '.json',JSON.stringify(array),{encoding:'utf8'},function(error){
                            if(error) throw error;
                        });

                        fs.writeFile('./image' + String(page) + '.json',JSON.stringify(array),{encoding:'utf8'},function(error){
                            if(error) throw error;
                        });

                    }
                })
            },500)
        })(memberList[i])
    }
}
//console.log(getRandomName());

//getImage(100);

getImage(85)







