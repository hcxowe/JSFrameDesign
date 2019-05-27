var deleteRange = document.createRange()
// 清空元素内部
function clearChild(node) {
    deleteRange.setStartBefore(node.firstChild)
    deleteRange.setEndAfter(node.lastChild)

    deleteRange.deleteContents()
    return node
}

function clearChild1(node) {
    node.textContent = ''
    return node
}

function clearChild3(node) {
    while(node.firstChild) {
        node.removeChild(node.firstChild)
    }
    
    return node
}