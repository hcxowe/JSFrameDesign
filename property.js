var getClass = function(el) {
    return el.className.replace(/\s+/, ' ').split(' ')
}

var hasClass = function(el, cls) {
    return -1 < (' ' + el.className).indexOf(' ' + cls + ' ')
}

var addClass = function(el, cls) {
    if (!hasClass(el, cls)) {
        el.className += ' ' + cls
    }
}

var removeClass = function(el, cls) {
    if (hasClass(el, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s$)')
        el.className = el.className.replace(reg, ' ')
    }
}

var clearClass = function(el) {
    el.className = ''
}