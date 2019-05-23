// 选择器引擎

// 取得一个元素的所有子孙, 兼容IE5
function getAllChildren(e) {
    return e.all ? e.all : e.getElementByTagName('*')
}

document.getElementsBySelector = function(selector) {
    // 不支持 getElementsByTagName , 返回空数组
    if (!document.getElementsByTagName) {
        return []
    }

    var tokens = selector.split(' ')
    var currentContext = new Array(document)

    // 从左至右检测每个单元
    for (var i = 0; i < tokens.length; i++) {
        // 去掉首尾空白
        token = tokens[i].replace(/^\s+/, '').replace(/\s+$/, '')

        // ID 选择器
        if (token.indexOf('#') > -1) {
            // 假设选择器组以 tag#id 或者 #id 的形式
            var bits = token.split('#')
            var tagName = bits[0]
            var id = bits[1]

            // 根据 id 获取元素, 在判断元素类型是否为 tagName
            var element = document.getElementById(id) // 这里可能获取不到对应 id 的元素
            if (!element || tagName && element.nodeName.toLowerCase() != tagName) {
                return []
            }

            // 置换 currentContext , 跳到下一个选择器组
            currentContext = new Array(element)
            continue
        }

        // 类选择器, 形式 tag.class 或 .class
        if (token.indexOf('.') > -1) {
            var bits = token.split('.')
            var tagName = bits[0]
            var className = bits[1]

            if (!tagName) {
                tagName = '*'
            }

            // 从 currentContext 出发, 获取他们的所有子孙
            var found = new Array()
            var foundCount = 0
            for (var h = 0; h < currentContext.length; h++) {
                var elements
                if (tagName == '*') {
                    elements = getAllChildren(currentContext[h])
                }
                else {
                    elements = currentContext[h].getElementsByTagName(tagName)
                }

                for (var j = 0; j < elements.length; j++) {
                    found[foundCount++] = elements[j]
                }
            }

            currentContext = new Array()
            var currentContextIndex = 0
            for (var k = 0; k < found.length; k++) {
                if (found[k].className && found[k].className.match(new RegExp('\\b' + className + '\\b'))) {
                    currentContext[currentContextIndex++] = found[k]
                }
            }

            continue
        } 

        // 属性选择器        tag[class(=~^$*|)=attr]
        var regexp = token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?(\w*)?"?\]$/)
        if (regexp) {
            var tagName = regexp.$1
            var attrName = regexp.$2
            var attrOperator = regexp.$3
            var attrValue = regexp.$4

            if (!tagName) {
                tagName = '*'
            }

            // 从 currentContext 出发, 获取他们的所有子孙
            var found = new Array()
            var foundCount = 0
            for (var h = 0; h < currentContext.length; h++) {
                var elements
                if (tagName == '*') {
                    elements = getAllChildren(currentContext[h])
                }
                else {
                    elements = currentContext[h].getElementsByTagName(tagName)
                }

                for (var j = 0; j < elements.length; j++) {
                    found[foundCount++] = elements[j]
                }
            }

            var checkFunction = null

            // 根据第二个操作符生成检测函数
            switch(attrOperator) {
                case '=': 
                    checkFunction = function(e) {
                        return (e.getAttribute(attrName) == attrValue)
                    }
                    break

                case '~': 
                    checkFunction = function(e) {
                        return (e.getAttribute(attrName).match(new RegExp('\\b' + attrValue + '\\b')))
                    }
                    break

                case '|':
                    checkFunction = function(e) {
                        return (e.getAttribute(attrName).match(new RegExp('^' + attrValue + '-?')))
                    }
                    break

                case '^':
                    checkFunction = function(e) {
                        return (e.getAttribute(attrName).indexOf(attrValue) == 0)
                    }
                    break

                case '$':
                    checkFunction = function(e) {
                        return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length)
                    }
                    break

                case '*': 
                    checkFunction = function(e) {
                        return (e.getAttribute(attrName).indexOf(attrValue) > -1)
                    }
                    break

                default:
                    checkFunction = function(e) {
                        return e.getAttribute(attrName)
                    }
            }
            
            currentContext = new Array()
            var currentContextIndex = 0
            for (var k = 0; k < found.length; k++) {
                if (checkFunction(found[k])) {
                    currentContext[currentContextIndex++] = found[k]
                }
            }

            continue
        }

        // 没有 # . [] 这样的特殊符, 则当作 tagName
        tagName = token
        var found = new Array()
        var foundCount = 0
        for (var h = 0; h < currentContext.length; h++) {
            var  elements = currentContext[h].getElementsByTagName(tagName)

            for (var j = 0; j < elements.length; j++) {
                found[foundCount++] = elements[j]
            }
        }

        currentContext = found
    }

    return currentContext
}