/**
 * Created by Administrator on 2015/10/13.
 */

var express = require('express');
//加载cookie模块
var cookieParser = require('cookie-parser');
var mall = require('./routes/mall');
var app = express();



// 激活cookie
app.use(cookieParser());

/**
 * 中间件，截获请求
 */
app.use(function (req, res, next) {
    console.log('ji chu zhong jian jian');
    next();
});
app.use('/user', function (req, res, next) {
    console.log('user zhong jian jian');
    next();
});
app.get('/json',function(req,res,next){
    console.log("cookie: " + JSON.stringify(req.cookies));
    //設定HTTP Header
    res.setHeader('Content-Type', 'application/json');
    res.send({a:123,b:456});
});
app.get('/redirect',function(req,res,next){
    //跳转
    res.redirect("http://www.baidu.com");
});
app.get('/user',function(req,res,next){
    //跳转
    res.send("user")
});
app.get('/file',function(req,res,next){
    //文件
    res.sendfile(__dirname + "/public/html/index.html");
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


//静态文件，可被直接访问，相同文件名，放在前面，优先级高,相同地址，静态文件优先级高于请求
app.use(express.static('public/html'));
app.use(express.static('public/style'));
app.use(express.static('public/js'));
app.use(express.static('public'));

//设置模板路径
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});


//当前目录：__dirname

//使用路由
app.use('/mall', mall);








//设置监听
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('------------------');
    console.log('Example app listening at http://%s:%s', host, port);
});



module.exports = app;