/*
 * @Author: Tmier
 * @Date: 2024-01-15 20:44:42
 * @LastEditTime: 2024-01-15 22:14:08
 * @LastEditors: Tmier
 * @Description: 
 * 
 */
let root = null


root = nextWorkOfUnit

if(!nextWorkOfUnit) {
  // 如果没有 表示最后一个完成

}
function commitRoot() {
  commitWork(root.child)
}

function commitWork () {
  if(!fiber) return 
  fiber.parent.dom.append(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

//  ---------------------------
const isFC = typeof FileSystemWritableFileStream.type == = 'function'

if(!isFC) {
  // ...
}
// 提取children