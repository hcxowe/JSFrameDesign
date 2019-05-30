// 区分固有属性与自定义属性
function isAttribute(attr, host) {
    // 有些属性是特殊元素才有的, 需要用到第二个参数
    host = host || document.createElement('div')

    return host.getAttribute(attr) === null && host[attr] === void 0
}