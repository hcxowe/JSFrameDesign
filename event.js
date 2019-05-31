function addEvent(el, type, callback, useCapture) {
    if (el.dispatchEvent) {
        // 支持 W3C
        el.addEventListener(type, callback, !!useCapture)
    }
    else {
        el.attachEvent('on' + type, callback)
    }

    return callback // 返回 callback 方便卸载时使用
}

function removeEvent(el, type, callback, useCapture) {
    if (el.dispatchEvent) {
        // 支持 W3C
        el.removeEventListener(type, callback, !!useCapture)
    }
    else {
        el.detachEvent('on' + type, callback)
    }
}

function fireEvent(el, type, args, event) {
    args = args ||　{}
    if (el.dispatchEvent) {
        event = document.createEvent('HTMLEvents')
        event.initEvent(type, true, true)
    }
    else {
        event = document.createEventObject()
    }

    for (var i in args) {
        if (args.hasOwnProperty(i)) {
            event[i] = args[i]
        }
    }

    if(el.dispatchEvent) {
        el.dispatchEvent(event)
    }
    else {
        el.fireEvent('on' + type, event)
    }
}