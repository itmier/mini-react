/*
 * @Author: Tmier
 * @Date: 2024-01-13 22:44:11
 * @LastEditTime: 2024-01-14 23:36:07
 * @LastEditors: Tmier
 * @Description: 
 * 
 */
const createTextNode = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}
const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'string' ? createTextNode(child) : child
      })
    }
  }
}
let nextWorkOfUnit = null
const render = (el, container) => {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
  // const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type)
  // Object.keys(el.props).forEach(key => {
  //   if(key !== 'children') {
  //     dom[key] = el.props[key]
  //   }
  // })
  // const children = el.props.children
  // children.forEach(child => {
  //    child && render(child, dom) // 将子节点挂载到父节点上
  // })
  // container.append(dom)
}

function createDom (type) {
  return type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
}
function updateProps (dom, props) {
  Object.keys(props).forEach(key => {
    if(key !== 'children') {
      dom[key] = props[key]
    }
  })
}
function initChildren(fiber) {
  // 3. 转换链表, 设置好指针
  const children = fiber.props.children
  let prevChild = null
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    }
    if(index === 0) {
      fiber.child = newFiber
      newFiber.parent = fiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}
function performWorkOfUnit (fiber) {
  console.log('fiber', fiber);
  if(!fiber.dom) {
    // 1. 创建dom
    const dom = (fiber.dom =  createDom(fiber.type))
    // 2. 处理props
    updateProps(dom, fiber.props)
    fiber.parent.dom.append(dom)
  }
  initChildren(fiber)

  // 4. 返回下一个要执行的任务
  if(fiber.child) return fiber.child
  if(fiber.sibling) return fiber.sibling
  return fiber.parent?.sibling
}
function WorkLoop(deadline) {
  let shouldYield = false
  while(!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(WorkLoop)
}
requestIdleCallback(WorkLoop)
export default {
  render,
  createElement
}