/**
 * TODO redis
 * 疑问：相当于java中web.xml？
 * 项目入口
 * 配置服务
 * 指定模板类型
 * 指定静态文件路径
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),//加载cookie模块
    app = express(),
    mall = require('./routes/mall'),
    querystring = require('querystring');

// 激活cookie,一次配置，全局通用
app.use(cookieParser());

/**
 * 中间件
 * 截获跟目录下所有请求请求，包括404
 * 统一url参数获取
 * TODO 个别页面当没有固定参数时，跳转引导页
 * TODO 记录log？
 * TODO sessionFilter，用作拦截器？
 * TODO html请求时，根据***返回304，使用客户端缓存?
 * TODO 是否生成静态文件，直接返回静态文件？
 */
app.use(function (req, res, next) {
    //TODO 1.封装url参数（锚点，转码问题未解决）
    var url = req.url.replace(/^.*\?/,'').replace(/#.*$/,'');
    req.tgParams = querystring.parse(url);
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

//静态文件，可被直接访问，相同文件名，放在前面，优先级高,相同地址，静态文件优先级高于请求
app.use(express.static('public/html'));
app.use(express.static('public'));

//设置模板路径
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

/**
 * 路由
 * 每个路由相当于controller
 * 配置RequestMapping
 * 需手动配置
 */
app.use('/mall', mall);

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
var server = app.listen(3000, function () {

});
/*----------------------设置监听 end---------------------**/

module.exports = app;