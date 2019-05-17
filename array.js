// 判定数组是否包含指定目标
function contains(target, item) {
    return target.indexOf(item) > -1
}

function removeAt(target, index) {
    return !!target.splice(index, 1).length
}

function remove(target, item) {
    var index = target.indexOf(item)
    if (~index) {
        return 
    }
}

// 洗牌
function shuffle(target) {
    var j, x, i = target.length

    for (; i > 0; j = parseInt(Math.random() * i), x = target[--i], target[i] = target[j], target[j] = x);

    return target
}

// 随机抽取一个元素
function random(target) {
    return target[Math.floor(Math.random() * target.length)]
}

// 平坦化
function flatten(target) {
    var result = []
    target.forEach(function(item) {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item))
        } 
        else {
            result.push(item)
        }
    })

    return result
}

// 去重
function unique(target) {
    var result = []
    loop: for (var i=0, n=target.length; i<n; i++) {
        for (var x=i+1; x<n; x++) {
            if (target[x] == target[i]) {
                continue loop
            }

            result.push(target[i])
        }
    }

    return result
}

// 过滤数组中的 null 和 undefined
function compact(target) {
    return target.filter(function(el) {
        return el != null
    })
}

// 获取对象数组中每个元素的指定属性, 组成数组返回
function pluck(target, name) {
    var result = [], prop
    target.forEach(function(item) {
        prop = item[name]
        if (prop != null) {
            result.push(prop)
        }
    })

    return result
}

// 根据指定条件进行分组, 构成对象返回
function groupBy(target, val) {
    var result = []
    var iterator = typeof val == 'function' ? val : function(obj) { return obj[val] }

    target.forEach(function(value, index) {
        var key = iterator(value, index)
        (result[key] || (result[key] = [])).push(value)
    })

    return result
}

// 根据指定条件进行排序, 通常用于对象数组排序
function sortBy(target, fn, scope) {
    var array = target.map(function(item, index) {
        return {
            el: item,
            re: fn.call(scope, item, index)
        }
    }).sort(function(left, right) {
        var a = left.re, b = right.re

        return a < b ? -1 : a > b ? 1 : 0
    })

    return pluck(array, 'el')
}

// 两数组去并集
function union(target, array) {
    return unique(target.concat(array))
}

// 取交集
function intersect(target, array) {
    return target.filter(function(n) {
        return ~array.indexOf(n)
    })
}

// 取差集/补集
function diff(target, array) {
    var result = target.slice()

    for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (result[i] === array[j]) {
                result.splice(i, 1)
                i--
                break
            }
        }
    }

    return result
}

// 去数字数组中最小的值
function min(target) {
    return Math.min.apply(null, target)
}

// 去数字数组中最大的值
function max(target) {
    return Math.max.apply(null, target)
}
 
export default {
    contains,
    removeAt,
    remove,
    shuffle,
    random,
    flatten,
    unique,
    compact,
    pluck,
    groupBy,
    sortBy,
    union,
    intersect,
    diff,
    min,
    max
}