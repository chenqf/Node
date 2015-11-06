/**
 * TODO redis
 * ���ʣ��൱��java��web.xml��
 * ��Ŀ���
 * ���÷���
 * ָ��ģ������
 * ָ����̬�ļ�·��
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),//����cookieģ��
    app = express(),
    mall = require('./routes/mall'),
    querystring = require('querystring');

// ����cookie,һ�����ã�ȫ��ͨ��
app.use(cookieParser());

/**
 * �м��
 * �ػ��Ŀ¼�������������󣬰���404
 * ͳһurl������ȡ
 * TODO ����ҳ�浱û�й̶�����ʱ����ת����ҳ
 * TODO ��¼log��
 * TODO sessionFilter��������������
 * TODO html����ʱ������***����304��ʹ�ÿͻ��˻���?
 * TODO �Ƿ����ɾ�̬�ļ���ֱ�ӷ��ؾ�̬�ļ���
 */
app.use(function (req, res, next) {
    //TODO 1.��װurl������ê�㣬ת������δ�����
    var url = req.url.replace(/^.*\?/,'').replace(/#.*$/,'');
    req.tgParams = querystring.parse(url);
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

//��̬�ļ����ɱ�ֱ�ӷ��ʣ���ͬ�ļ���������ǰ�棬���ȼ���,��ͬ��ַ����̬�ļ����ȼ���������
app.use(express.static('public/html'));
app.use(express.static('public'));

//����ģ��·��
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

/**
 * ·��
 * ÿ��·���൱��controller
 * ����RequestMapping
 * ���ֶ�����
 */
app.use('/mall', mall);

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
var server = app.listen(3000, function () {

});
/*----------------------���ü��� end---------------------**/

module.exports = app;