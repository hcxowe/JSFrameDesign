// contains
function contains(target, it) {
    return !!~target.indexOf(it)
}

// startsWith 判断目标字符串是否位于原字符串的开始
function startsWith(target, str, ignorecase) {
    if (ignorecase) {
        target = target.toLowerCase()
        str = str.toLowerCase()
    }

    return target.indexOf(str) === 0
}

// endsWith 判断目标字符串是否位于原字符串的结尾
function startsWith(target, str, ignorecase) {
    if (ignorecase) {
        target = target.toLowerCase()
        str = str.toLowerCase()
    }

    return target.substring(target.length - str.length) === str
}

// repeat 重复字符串
function repeat(target, n) {
    // 方法一
    //return new Array(n+1).join(target)

    // 方法二
    //return Array.prototype.join.call({length: n + 1}, target)

    // 方法三
    /* var join = Array.prototype.join, obj = {}
    return function(target, n) {
        return join.call(obj, target)
    } */

    // 方法四
    var s = target, total = []
    while (n > 0) {
        if (n % 2 == 1) {
            total[total.length] = s
        }

        if (n == 1) {
            break
        }

        s += s
        n = n >> 1
    }

    return total.join('')

}

