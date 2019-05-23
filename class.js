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

JS.Class = function(classDefinition) {
    // 返回目标类的真正构造器
    function getClassBase() {
        return function() {
            // 执行用户传入的构造器 construct
            // preventJSBaseConstructorCall 阻止在 createClassDefinition 辅助方法中执行父类的 construct
            if (typeof this['construct'] === 'function' && preventJSBaseConstructorCall === false) {
                this.construct.apply(this, arguments)
            }
        }
    }

    // 给目标类添加原型成员与类成员
    function createClassDefinition(classDefinition) {
        var parent = this.prototype['parent'] || (this.prototype['parent'] = {})
        for (var prop in classDefinition) {
            // 静态成员
            if (prop === 'statics') {
                for (var sprop in classDefinition.statics) {
                    this[sprop] = classDefinition.statics[prop]
                }
            }
            else {
                if (typeof this.prototype[prop] === 'function') {
                    var parentMethod = this.prototype[prop]
                    parent[prop] = parentMethod
                }

                this.property[prop] = classDefinition[prop]
            }

        }
    }

    var preventJSBaseConstructorCall = true
    var Base = getClassBase()
    preventJSBaseConstructorCall = false

    createClassDefinition.call(Base, classDefinition)

    Base.extend = function(classDefinition) {
        preventJSBaseConstructorCall = true
        var SonClass = getClassBase()
        SonClass.prototype = new this() // 父类的实例作为子类的原型
        preventJSBaseConstructorCall = false

        createClassDefinition.call(SonClass, classDefinition)

        SonClass.extend = this.extend

        return SonClass
    }

    return Base
}

// ES3 创建类
function Point(x, y) {
    this.x = x
    this.y = y
}

Point.prototype = {
    add: function() {
        return this.x + this.y
    }
}

// ES6
class MyPoint {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static staticMethod() {
        return 'static mypoint function'
    }

    add() {
        return this.x + this.y
    }

    get total() {
        return 'getter total'
    }

    set total(value) {
        console.log('setter total')
        this.total = value
    }
}

class YourPoint extends MyPoint {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }

    getColor() {
        return this.color
    }
}

// 继承原生构造函数
class VersionArray extends Array {
    constructor() {
        super()
        this.history = [[]]
    }

    commit() {
        this.history.push(this.slice())
    }

    revert() {
        this.splice(0, this.length, ...this.history[this.length - 1])
    }
}

var ary = new VersionArray()

ary.commit()