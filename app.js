/**
 * TODO redis
 * ���ʣ��൱��java��web.xml��
 * ��Ŀ���
 * ���÷���
 * ָ��ģ������
 * ָ����̬�ļ�·��
 */
var express = require('express'),
    underscore = require('underscore'),
    cookieParser = require('cookie-parser'),//����cookieģ��
    app = express(),
    compression = require('compression'),//gzip
    bodyParser = require('body-parser'),
    config = require('./config/config'),
    routers = require('./config/routers'),
    i = 0,
    length = routers.length;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());// ����cookie,һ�����ã�ȫ��ͨ��
app.use(compression());//TODO gzip

//����ȫ�ֱ���������ģ����ֱ��ʹ��
app.locals._ = underscore;

/**
 * �м��
 * �ػ��Ŀ¼�������������󣬰���404
 * ͳһurl������ȡ
 * TODO ����ҳ�浱û�й̶�����ʱ����ת����ҳ
 * TODO ��¼log��
 */
app.use(function (req, res, next) {
    if(req.hostname.indexOf(config.domain) >= 0){
        res.header("Access-Control-Allow-Origin", config.domain);
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
    }
    next();
});

app.use(express.static('public/html'));//��̬�ļ����ɱ�ֱ�ӷ��ʣ���ͬ�ļ���������ǰ�棬���ȼ���,��ͬ��ַ����̬�ļ����ȼ���������
if(process.env.NODE_ENV === 'online'){
    app.use(express.static('public',{maxAge:31536000000,etag:false}));//����365�죬������ETag
}else{
    app.use(express.static('public'));//�����û���
}

//����ģ��·��
app.set('views', './views');
app.set('view engine', 'ejs');

/**
 * ·��
 */
for(; i < length; i++){
    app.use('/' + routers[i],require('./controller/' + routers[i]));
}


/*----------------------ͳһ�����쳣 start---------------------**/
/**
 * �쳣������ڴ���ײ�
 * ����ͨ���м��������
 * �ҵ���ʵ��ҵ����ʱ�ж���ʽ����
 * ҵ�������쳣ʱ��ͨ�������²��м���ҵ��쳣����ģ��
 * 404ʱ�Ҳ���ҵ���������ͬһ���õ�404����
 */
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
/*----------------------ͳһ�����쳣 end---------------------**/

/*----------------------���ü��� start---------------------**/
app.listen(config.port, function () {

});
/*----------------------���ü��� end---------------------**/

module.exports = app;