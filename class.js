Object.create = Object.create || function(obj) {
    function F() {}
    F.prototype = obj

    return new F()
}

function extend(destination, source) {
    for (var property in source) {
        destination[property] = source[property]
    }

    return destination
}

// 继承
function inherit(init, Parent, proto) {
    function Son() {
        Parent.apply(this, arguments) // 继承父类的 公有成员
        init.apply(this, arguments) // 调用自己的构造函数
    }

    Son.prototype = Object.create(Parent.property)
    Son.prototype.toString = Parent.property.toString   // 处理IE bug
    Son.prototype.valueOf = Parent.property.valueOf     // 处理IE bug
    Son.prototype.constructor = Son                     // 确保构造器正常指向自身, 而不是 Object
    extend(Son.prototype, proto)                        // 添加子类特有的 原型成员
    extend(Son, Parent)                                 // 继承父类的 静态成员

    return Son
}