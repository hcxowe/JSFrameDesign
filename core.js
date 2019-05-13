// 对象扩展
var minix = function() {
    var options, 
        name, 
        src, 
        copy, 
        copyIsArray, 
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false

    // 如果第一个参数是布尔值, 判定是否深拷贝
    if (typeof target === 'boolean') {
        deep = target
        target = arguments[1] || {}
        i++
    }

    
}