var str = 'a.b["c"]["d"].e.f',
    obj = {a:{ddd:123}};

function test(obj,str){
    obj = obj || {};
    var arr = str.match(/[0-9_a-zA-Z]/g),
        item = obj,
        key,
        i = 0,
        length = arr.length;
    for(; i < length; i++){
        key = arr[i];
        if(item.hasOwnProperty(key)){
            item = item[key];
            continue;
        }
        item = item[key] = {};
    }
    return obj;
}


test(obj,str)





