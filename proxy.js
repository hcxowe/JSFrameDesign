var obj = new Proxy({}, {
    get: function(target, prop) {
        console.log(prop, '取值')
        return target[prop]
    },
    set: function(target, prop, value) {
        console.log(prop, value, target[prop], '赋值')
        target[prop] = value
    },
    deleteProperty: function(target, prop) {
        console.log(prop, '删除')
        delete target[prop]
        return true
    },
    getPrototypeOf: function() {},
    setPrototypeOf: function() {},
    isExtensible: function() {},
    preventExtensions: function() {},
    getOwnPropertyDescriptor: function() {},
    defineProperty: function() {},
    has: function() {},
    get: function() {},
    set: function() {},
    deleteProperty: function() {},
    ownKeys: function() {},
    apply: function() {},
    construct: function() {}
})

//obj.a = 1 
//obj.a