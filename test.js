/**
 * Created by Administrator on 2015/10/13.
 */

var express = require('express');
//����cookieģ��
var cookieParser = require('cookie-parser');
var mall = require('./routes/mall');
var app = express();



// ����cookie
app.use(cookieParser());

/**
 * �м�����ػ�����
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
    //�O��HTTP Header
    res.setHeader('Content-Type', 'application/json');
    res.send({a:123,b:456});
});
app.get('/redirect',function(req,res,next){
    //��ת
    res.redirect("http://www.baidu.com");
});
app.get('/user',function(req,res,next){
    //��ת
    res.send("user")
});
app.get('/file',function(req,res,next){
    //�ļ�
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


//��̬�ļ����ɱ�ֱ�ӷ��ʣ���ͬ�ļ���������ǰ�棬���ȼ���,��ͬ��ַ����̬�ļ����ȼ���������
app.use(express.static('public/html'));
app.use(express.static('public/style'));
app.use(express.static('public/js'));
app.use(express.static('public'));

//����ģ��·��
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});


//��ǰĿ¼��__dirname

//ʹ��·��
app.use('/mall', mall);








//���ü���
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('------------------');
    console.log('Example app listening at http://%s:%s', host, port);
});



module.exports = app;