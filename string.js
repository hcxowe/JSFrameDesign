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
function endsWith(target, str, ignorecase) {
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
    /* var s = target, total = []
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

    return total.join('') */

    // 方法五
    /* var s = target, c = s.length * n

    do {
        s += s
    }
    while (n = n >> 1)

    return s.substring(0, c) */

    // 方法六
    var s = target, total = ''
    while (n > 0) {
        if (n % 2 == 1) {
            total += s
        }

        if (n == 1) {
            break
        }

        s += s
        n = n >> 1
    }

    return total

    // 方法七
    /* if (n == 1) {
        return target
    }

    var s = repeat(target, Math.floor(n / 2))
    s += s
    if (n % 2) {
        s += target
    }

    return s */

    // 方法八
    /* return (n <= 0) ? '' : target.concat(repeat(target, --n)) */
}

// byteLen 取得一个字符串所有字节的长度
function byteLen(target) {
    var byteLength = target.length, i = 0

    for (; i < target.length; i++) {
        if (target.charCodeAt(i) > 255) {
            byteLength++
        }
    }

    return byteLength
}

function byteLen1(target, fix) {
    fix = fix || 2

    var str = new Array(fix + 1).join('-')
    return target.replace(/[^\x00-\xff]/g, str).length // 将汉字替换为指定数量的 -
}

function byteLen2(str, charset) {
    var total = 0,
        charCode,
        i,
        len

    charset = charset ? charset.toLowerCase() :　''
    if (charset === 'utf-16' || charset === 'utf16') {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i)
            if (charCode <= 0xffff) {
                total += 2
            }
            else {
                total += 4
            }
        }
    }
    else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i)
            if (charCode <= 0x007f) {
                total += 1
            }
            else if (charCode <= 0x07ff) {
                total += 2
            }
            else if (charCode <= 0xffff) {
                total += 3
            }
            else {
                total += 4
            }
        }
    }

    return total
}

// 字符串截断处理, 超出限定长度, 默认添加 ...
function truncate(target, length, truncation) {
    length = length || 30
    truncation = truncation === void 0 ? '...' : truncation

    return target.length > length ? target.slice(0, length - truncation.length) + truncation : String(target)
}

// 转换驼峰风格
function camelize(target) {
    if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
        return target
    }

    return target.replace(/[-_][^-_]/g, function(match) {
        return match.charAt(1).toUpperCase()
    })
}

// classClass-class => class_class_class
function underscored(target) {
    return target.replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/\-/g, '_').toLowerCase()
}

// classClass_class => class-class-class
function dasherize(target) {
    return target.replace(/([a-z\d])([A-Z])/g, '$1-$2').replace(/\_/g, '-').toLowerCase()
}

// 首字母大写
function capitalize(target) {
    return target.charAt(0).toUpperCase() + target.substring(1).toLowerCase()
}

// 移除字符串中的 html 标签
var rtag = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi
function stripTags(target) {
    return String(target || '').replace(rtag, '')
}

// 移除 script 标签
function stripScripts(target) {
    return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '')
}

// html 转义
function escapeHTML(target) {
    return target.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
}

// html还原
function unescapeHTML(target) {
    return target.replace(/&#39;/g, '\'')
                .replace(/&quot;/g, '"')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
}

// 利用 原生API innerText innerHTML 处理
function escapeHTML1(target) {
    var div = document.createElement('div')
    div.innerText = target
    return div.innerHTML
}

function unescapeHTML1(target) {
    var div = document.createElement('div')
    div.innerHTML = target

    return getText(div)
}

function getText(node) {
    if (node.nodeType !== 1) {
        return node.nodeValue
    }
    else if (node.nodeName !== 'SCRIPT') {
        var ret = ''
        for (var i=0, el; el=node.childNodes[i++];) {            
            ret += getText(el)
        }
    }
    else {
        return ''
    }
}

// pad 为字符串的某一端添加字符串

// 前面补 0
function pad(target, n) {
    // 方法一
    /* var zero = new Array(n).join('0')
    var str = zero + target
    return str.substr(-n) */

    // 方法二
    /* return Array((n+1) - target.toString().split('').length).join('0') + target */

    // 方法三
    /* return (Math.pow(10, n) + '' + target).slice(-n) */

    // 方法四
    /* return ((1 >> n).toString(2) + target).slice(-n) */

    // 方法五
    /* return (0..toFixed(n) + target).slice(-n) */

    // 方法六
    /* return (1e20 + '' + target).slice(-n) */

    // 方法七
    var len = target.toString().length
    while (len < n) {
        target = '0' + target
        len++
    }

    return target
}

function padNormal(target, n, filling, right, radix) {
    var num = target.toString(radix || 10)
    filling = filling || '0'
    while (num.length < n) {
        if (!right) {
            num = filling + num
        }
        else {
            num = num + filling
        }
    }

    return num
}

// format sprintf
function format(str, obj) {
    var array = Array.prototype.slice.call(arguments, 1)

    // name 在正则没有组时 为匹配成功的索引, 有组存在则为 组的内容;  这里为 ([^{}]+) 匹配的内容
    return str.splice(/\\?\#{([^{}]+)\}/gm, function(match, name) {
        if (match.charAt(0) == '\\') {
            return match.slice(1)
        }

        var index = Number(name)
        if (index >= 0) {
            return array[index]
        }

        if (object && object[name] !== void 0) {
            return object[name]
        }

        return ''
    })
}

// trim 与 空白
function trim(str) {
    // 方法一
    // return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '')

    // 方法二
    // return str.replace(/^\s+/, '').replace(/\s+$/, '')

    // 方法三
    // search 返回满足条件的 索引
    // return str.substring(Math.max(str.search(/\S/, 0)), str.search(/\S\s*$)/) + 1)

    // 方法四
    // return str.replace(/^\s+|\s+$/g, '')

    // 方法五
    // match 匹配到东西会返回一个类数组对象, 原字符匹配部分与分组将成为他的元素
    //str = str.match(/\S+(?:\s+\S+)*/)
    //return str ? str[0] : ''

    // 方法六
    /* return str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, '$1') */

    // 方法七
    /* return str.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, '$1') */

    // 方法八
    //return str.replace(/^\s*((?:[\S\s]*\S)?)\s*$/, '$1')

    // 方法九
    //return str.replace(/^\s*([\S\s]*?)\s*$/, '$1')

    // 方法十
    var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\u2004\u2005\u2006\u2007\u2008\u2009\u2000a\u200b\u2028\u2029\u3000'
    for (var i=0; i<str.length; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i)
            break
        }
    }

    for (i=str.length-1; i>=0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i+1)
            break
        }
    }

    return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''

    // 方法十一
    /* str = str.replace(/^\s+/, '')
    for (var i=str.length-1; i>=0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i+1)
            break
        }
    }

    return str */

    // 方法十二
    /* var m = str.length
    for (var i = -1; str.charCode(++i) <= 32;) {
        for (var j = m - 1; j > i && str.charCodeAt(j) <= 32;) {
            return str.slice(i, j + 1)
        }
    } */
}