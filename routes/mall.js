var express = require('express');
var router = express.Router();

/**
 * �м��������router�µ����󣬶��������������
 */
router.use(function timeLog(req, res, next) {
    console.log('Time: router ', Date.now());
    next();
});

router.get('/',function(req,res,next){
    res.send('router get /');
});

router.get('/mall',function(req,res,next){
    res.send('router get mall');
});

module.exports = router;
