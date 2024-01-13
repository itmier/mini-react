// console.log('Hello World');

// V1: 通过手动创建元素的方式，创建一个 div 元素，id 为 app，内容为 Hello World，并将其插入到 root 元素中
// const App = document.createElement('div') // type
// App.id = 'app' // props
// const container = document.querySelector('#root')
// container.append(App)
// const TextNode = document.createTextNode('Hello World') // children
// App.append(TextNode)

// V2 通过定义的 object 元素来创建元素
// const TEXT_EL = {
//   type: 'TEXT_ELEMENT',
//   props: {
//     nodeValue: 'Hello World',
//     children: []
//   }

// }
// const el = {
//   type: 'div',
//   props: {
//     id: 'app',
//     children: [
//       TEXT_EL
//     ]
//   }
// }
// const App = document.createElement(el.type) // type
// App.id = el.props.id // props
// const container = document.querySelector('#root')
// container.append(App)
// const TextNode = document.createTextNode(TEXT_EL.props.nodeValue) // children
// App.append(TextNode)

// V2 Plus 实现通过函数来创建元素
// const createTextNode = (text) => {
//   return {
//     type: 'TEXT_ELEMENT',
//     props: {
//       nodeValue: text,
//       children: []
//     }
//   }
// }
// const createElement = (type, props, ...children) => {
//   return {
//     type,
//     props: {
//       ...props,
//       children
//     }
//   }
// }
// const TEXT_EL = createTextNode('Hello World')
// const el = createElement('div', { id: 'app' }, TEXT_EL)
// const App = document.createElement(el.type) // 创建节点
// App.id = el.props.id // 设置props
// const container = document.querySelector('#root')
// container.append(App) // 插入到 container 节点中
// const TextNode = document.createTextNode(TEXT_EL.props.nodeValue) // 创建节点 -> 设置props
// App.append(TextNode) // 插入到 container 节点中

// V2 Pro Render函数

// const createTextNode = (text) => {
//   return {
//     type: 'TEXT_ELEMENT',
//     props: {
//       nodeValue: text,
//       children: []
//     }
//   }
// }
// const createElement = (type, props, ...children) => {
//   return {
//     type,
//     props: {
//       ...props,
//       children: children.map(child => {
//         return typeof child === 'string' ? createTextNode(child) : child
//       })
//     }
//   }
// }
// const render = (el, container) => {
//   const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type)
//   Object.keys(el.props).forEach(key => {
//     if(key !== 'children') {
//       dom[key] = el.props[key]
//     }
//   })
//   const children = el.props.children
//   children.forEach(child => {
//      child && render(child, dom) // 将子节点挂载到父节点上
//   })
//   container.append(dom)
// }
// const App = createElement('div', { id: 'app' }, ' Hello World', 'Hello', 'Mini-React') // 这里的App实际是el
// console.log('App', App);
// // render(App, document.querySelector('#root'))

// const ReactDOM = {
//   createRoot: (container) => {
//     return {
//       render: App => {
//         return render(App, container)
//       }
//     }
//   }
// }
// ReactDOM.createRoot(document.querySelector('#root')).render(App)

// V3 React / ReactDom

import ReactDom from './core/ReactDom.js'
import App from './App.js'

ReactDom.createRoot(document.querySelector('#root')).render(App)
