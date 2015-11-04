var express = require('express');
var router = express.Router();

/**
 * �м��������router�µ����󣬶��������������
 */
router.use(function timeLog(req, res, next) {
    console.log('mall router fittler');
    next();
});

router.get('/',function(req,res,next){
    console.log("cookie: " + JSON.stringify(req.cookies));
    res.send('router get /');
});

router.get('/mall',function(req,res,next){
    res.render('index', { title: 'He222y', message: 'Hello t222here!'});
});

module.exports = router;
