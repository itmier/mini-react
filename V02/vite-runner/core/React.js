/*
 * @Author: Tmier
 * @Date: 2024-01-13 22:44:11
 * @LastEditTime: 2024-01-16 00:03:43
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
        const isTextNode = typeof child === 'string' || typeof child === 'number'
        return isTextNode ? createTextNode(child) : child
      })
    }
  }
}
let root = null
let nextWorkOfUnit = null
const render = (el, container) => {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
  root = nextWorkOfUnit
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
function initChildren(fiber, children) {
  // 3. 转换链表, 设置好指针
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
function updateFC (fiber) {
  const children = [fiber.type(fiber.props)] 
  initChildren(fiber, children)

}
function updateHostComponent (fiber) {
  if(!fiber.dom) {
    // 1. 创建dom
    const dom = (fiber.dom =  createDom(fiber.type))
    // 2. 处理props
    updateProps(dom, fiber.props)
    // fiber.parent.dom.append(dom)
  }
  const children = fiber.props.children
  initChildren(fiber, children)
}
function performWorkOfUnit (fiber) {
  const isFC = typeof fiber.type === 'function'
  if(isFC) {
    updateFC(fiber)
  } else {
    updateHostComponent(fiber)
  }

  // 4. 返回下一个要执行的任务
  if(fiber.child) return fiber.child
  let nextFiber = fiber
  while(nextFiber) {
    if(nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
function WorkLoop(deadline) {
  let shouldYield = false
  while(!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    shouldYield = deadline.timeRemaining() < 1
  }
  if(!nextWorkOfUnit && root) {
    commitRoot()
  }
  requestIdleCallback(WorkLoop)
}
function commitRoot () {
  commitWork(root.child)
  root = null
}
function commitWork(fiber) {
  if(!fiber) return
  let fiberParent = fiber.parent
  while(!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }
  fiber.dom && fiberParent.dom.append(fiber.dom)
  if(fiber.child) commitWork(fiber.child)
  if(fiber.sibling) commitWork(fiber.sibling) 
}
requestIdleCallback(WorkLoop)
export default {
  render,
  createElement
}