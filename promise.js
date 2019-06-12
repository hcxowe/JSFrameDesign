var nextTick = new function() {
    // 把一些需要长时间运行的操作放在一个回调函数里,在浏览器完成后面的其他语句后,就立刻执行这个回调函数
    // 该方法最近刚刚被微软提出, 可能不会被w3c批准成为标准, 目前只有 Internet Explorer 10实现了该方法
    var tickImmediate = window.setImmediate 

    // 在指定的DOM发生变化时被调用
    var tickObserver = window.MutationObserver

    if (tickImmediate) {
        return tickImmediate.bind(window)
    }

    var queue = []
    function callback() {
        var n = queue.length
        for (var i = 0; i < n; i++) {
            queue[i]()
        }

        queue = queue.slice(n)
    }

    if (tickObserver) {
        var node = document.createTextNode('hcxowe')
        new tickObserver(callback).observe(node, { characterData: true })
        var bool = false

        return function(fn) {
            queue.push(fn)
            bool = !bool
            node.data = bool
        }
    }

    return function(fn) {
        setTimeout(fn, 4) // 标准浏览器的最小间隔是4
    } 
}