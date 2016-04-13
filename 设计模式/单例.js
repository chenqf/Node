/**
 * Created by Administrator on 2016/3/23.
 */

var C = function () {
    this.init();
};
C.prototype.init = function () {

};

var D = function () {
    this.init();
};
D.prototype.init = function () {

};

var proxySingleInstance = (function () {
    var instances = [],classes = [],uid;
    return function (Class,opt) {
        uid = classes.indexOf(Class);
        if(uid < 0 || !instances[uid]){
            classes.push(Class);
            instances.push(new Class(opt));
        }
        return instances[instances.length - 1];
    }
})();

var a = proxySingleInstance(C);
var b = proxySingleInstance(C);
var c = proxySingleInstance(D);

console.log(a===b)
console.log(a===c)
console.log(c===b)