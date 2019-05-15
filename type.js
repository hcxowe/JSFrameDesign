/* 类型判定 */

// 数组判定
function isArray(ary) {
    return Object.prototype.toString.call(ary) === '[object Array]'
}

// NaN
function isNaN(obj) {
    return obj !== obj
}

// null
function isNull(obj) {
    return obj === null
}

// undefined
function isUndefined(obj) {
    return obj === void 0
}

// IE 678
function isIE678() {
    return (window == document) != (document == window)
}

var class2type = {}
'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name) {
    class2type['[object ' + name + ']'] = name.toLowerCase()
})

// jQuery的type方法
function type(obj) {
    if (obj == null) {
        return String(obj) // toString
    }

    return typeof obj === 'object' || typeof obj === 'function' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj
}

// 1.3版本的jquery判定 function
function isFunction(fn) {
    return !!fn && typeof fn != 'string' && !fn.nodeName && fn.constructor != Array && /^\s[]?function/.test(fn + '')
}

// 判定是否为纯净 JS 对象, 既不是 DOM, BOM 对象, 也不是 自定义类的实例
function isPlainObject(obj) {
    // IE10+ 浏览器判定
    return typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype
}

// isWindow
function isWindow(obj) {
    if (!obj) {
        return false
    }

    // IE 678
    if (obj == obj.document && obj.document != obj) {
        return true
    }

    // 现代浏览器
    return /^\[object (?:Window|DONWindow|global)\]$/.test(Object.prototype.toString.call(obj))
}

// 类数组判定
function isArrayLike(obj) {
    var length = !!obj &&　'length' in obj && obj.length,
        type = type(obj)

    return type == 'array' || length == 0 || typeof length === 'number' && length > 0 && (length - 1) in obj
}

