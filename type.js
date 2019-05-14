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