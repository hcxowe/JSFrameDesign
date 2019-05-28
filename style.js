// 获取样式
var getStyle = function(el, name) {
    if (el.style) {
        name = name.replace(/\-(\w)/g, function(all, letter) {
            return letter.toUpperCase()
        })

        if (window.getComputedStyle) {
            return el.ownerDocument.getComputedStyle(el, null)[name]
        }
        else {
            return el.currentStyle[name]
        }
    }
}