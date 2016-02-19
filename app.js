/**
 *     redis
 * 疑问：相当于java中web.xml？
 * 项目入口
 * 配置服务
 * 指定模板类型
 * 指定静态文件路径
 */
var express = require('express'),
    underscore = require('underscore'),
    cookieParser = require('cookie-parser'),//加载cookie模块
    app = express(),
    compression = require('compression'),//gzip
    bodyParser = require('body-parser'),
    config = require('./config/config'),
    routers = require('./lib/routers'),
    log = require('./config/log');

log.use(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());// 激活cookie,一次配置，全局通用
app.use(compression());//TODO gzip

//设置全局变量，可在模板中直接使用
app.locals._ = underscore;

/**
 * 中间件
 * 截获跟目录下所有请求请求，包括404
 * 统一url参数获取
 * TODO 个别页面当没有固定参数时，跳转引导页
 * TODO 记录log？
 */
app.use(function (req, res, next) {
    var referer = req.headers['referer'];
    if(referer && referer.indexOf(config.domain) >= 0){
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
    }

    console.log(req.originalUrl);

    next();

});

app.use(express.static('public/html'));//静态文件，可被直接访问，相同文件名，放在前面，优先级高,相同地址，静态文件优先级高于请求
if(process.env.NODE_ENV === 'online'){
    app.use(express.static('public',{maxAge:31536000000,etag:false}));//缓存365天，不启用ETag
}else{
    app.use(express.static('public'));//不适用缓存
}

//设置模板路径
app.set('views', './views');
app.set('view engine', 'ejs');

//路由
routers.init(app,{routerRelPath:config.relPath});



/*----------------------统一配置异常 start---------------------**/
/**
 * 异常处理放在代码底部
 * 请求通过中间件层层调用
 * 找到真实的业务处理时中断链式调用
 * 业务处理发生异常时，通过调用下层中间件找到异常处理模块
 * 404时找不到业务处理，会进入同一配置的404处理
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
/*----------------------统一配置异常 end---------------------**/

/*----------------------设置监听 start---------------------**/
app.listen(config.port, function () {

});
/*----------------------设置监听 end---------------------**/

module.exports = app;