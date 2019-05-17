var bind = function(bind) {
    return {
        bind: bind.bind(bind),
        call: bind.bind(bind.call),
        apply: bind.bind(bind.apply)
    }
}(Function.prototype.bind)