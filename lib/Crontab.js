var schedule = require('node-schedule'),
    list = [];
module.exports = {
    job:function(time,fn){
        var rule;
        if(typeof time === 'string'){
            rule = time;
            fn = fn || function(){};
        }else{
            rule = new schedule.RecurrenceRule();
            fn = time.fn || function(){};
            time.year && (rule.year = time.year);
            time.month && (rule.month = time.month);
            time.date && (rule.date = time.date);
            time.dayOfWeek && (rule.dayOfWeek = time.dayOfWeek);
            time.hour && (rule.hour = time.hour);
            time.minute && (rule.minute = time.minute);
            time.second && (rule.second = time.second);
        }
        var j = schedule.scheduleJob(rule, fn);
        list.push(j);
        return j;
    },
    cancel:function(key){
        if(!key){
            return false;
        }
        var i = list.indexOf(key);
        if(i < 0){
            return false;
        }
        if(key.cancel()){
            list.splice(i,1);
            return true;
        }else{
            return false;
        }
    }
};