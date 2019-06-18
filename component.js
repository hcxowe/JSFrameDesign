// mmHistory 模块 实现 window.history 功能
var mmHistory = {
    hash:  ,
    start: function(option) {
        if (this.started) {
            throw new Error('history has already been started!')
        }

        this.started = true

        // 监听模式
        if (typeof options === 'boolean') {
            options = {
                html5: options
            }
        }

        // 混合参数
        //options = mix({}, defaults, options || {})

        var rootPath = options.root
        var html5Mode = options.html5
        this.options = options
        this.mode = html5Mode ? 'popstate': 'hashchange'
        if (!supportPushState) {
            if (html5Mode) {
                console.log('浏览器不支持HTML5 pushState, 退化使用 onhashchange')
            }

            this.mode = 'hashchange'
        }

        if (!supportPushState) {
            this.mode = 'iframepoll'
        }

        switch(this.mode) {
            case 'popstate':
                setTimeout(function() {
                    window.onpopstate = mmHistory.onHashChanged
                }, 500)
                break

            case 'hashchange':
                window.onhashchange = mmHistory.onHashChanged
                break

            case 'iframepoll':
                $.ready(function() {
                    var iframe = document.createElement('iframe')
                    iframe.id = options.iframeID
                    iframe.style.display = 'none'
                    document.body.appendChild(iframe)
                    mmHistory.iframe = iframe
                    mmHistory.writeFrame('')
                    if (msie) {
                        function onPropertyChange() {
                            if (event.propertyName === 'location') {
                                mmHistory.check()
                            }
                        }

                        document.attachEvent('onpropertychange', onPropertyChange)
                        mmHistory.onPropertyChange = onPropertyChange
                    }

                    mmHistory.intervalID = window.setInterval(function() {
                        mmHistory.check()
                    }, options.interval)
                })
                break
        }

        this.onHashChanged()
    },
    stop: function() {

    },
    setHash: function(s, replace) {
        
    },
    writeFrame: function(s) {
        
    },
    syncHash: function() {
        
    },
    getPath: function() {
        
    },
    onHashChanged: function() {
        
    }
}