ie = !!document.recale
ie = !!window.VBArray
ie = !!window.ActiveXObject
ie = !!window.createPopup
ie = /*@cc_on!@*/!1
ie = document.expando // document.all 在早期 opera firefox 版本也存在

ie678 = !+"\v1"
ie678 = !-[1, ]
ie678 = '\v' == 'v'

ie8 = !!window.XdomainRequest
ie9 = document.documentMode && document.documentMode === 9
ie10 = window.navigator.msPointerEnabled
ie11 = '-ms-scroll-limit' in document.documentElement.style
opera = window.opera
firefox = window.GeckoActiveXObject
safari = !!(navigator.verder && navigator.verder.match(/Apple/))
chrome = !!(window.chrome && window.google)

isIPhone = /iPhone/i.test(navigator.userAgent)
isIPhone4 = window.devicePixelRatio >= 2
isIPad = /iPad/i.test(navigator.userAgent)
isAndroid = /android/i.test(navigator.userAgent)
isIOS = isIPhone || isIPad

 