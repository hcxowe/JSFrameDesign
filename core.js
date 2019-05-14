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

    // 确保第一个可用的对象
    if (typeof target !== 'object' &&　typeof target !== 'function') {
        target = {}
    }

    // 如果只有一个参数, 则新成员添加到 minix 所在的对象上
    if (i === length) {
        target = this
        i--
    }

    for (; i<length; i++) {
        options = arguments[i]
        if (options != null) {
            for (name in options) {
                try {
                    src = target[name]
                    copy = options[name]
                }
                catch(e) {
                    continue
                }

                // 防止循环引用
                if (target == copy) {
                    continue
                }

                // 数组或对象
                if (deep && copy && typeof copy == 'object' && (copyIsArray=Array.isArray(copy))) {
                    if (copyIsArray) {
                        copyIsArray = false
                        clone = src && Array.isArray(src) ? src : []
                    }
                    else {
                        clone = src && typeof src == 'object' ? src : {}
                    }

                    target[name] = minix(deep, clone, copy)
                }
                else if (copy !== void 0) {
                    target[name] = copy
                }
            }
        }
    }

    return target
}