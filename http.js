// 兼容获取 xhr 对象
window.$http = {}

var s = ['XMLHttpRequest', 'ActiveXObject("Msxml2.XMLHTTP.6.0")', 'ActiveXObject("Msxml2.XMLHTTP.3.0")', 'ActiveXObject("Msxml2.XMLHTTP")']

for (var i = 0, axo; axo = s[i++]; ) {
    try {
        if (eval("new" + axo)) {
            $http = new Function("return new " + axo)
            break
        }
    }
    catch(e) {

    }
}