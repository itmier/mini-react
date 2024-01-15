/*
 * @Author: Tmier
 * @Date: 2024-01-13 22:44:52
 * @LastEditTime: 2024-01-15 23:22:29
 * @LastEditors: Tmier
 * @Description: 
 * 
 */
import React from './core/React.js'
// const App = React.createElement('div', { id: 'app' }, ' Hello World', 'Hello', 'Mini-React')
function Counter({num}) {
  return <div>Counter: {num}</div>
}
// const App =<div id='app'>
//   Hello World
//   <h2>Hello MiniReact</h2>
//   <Counter />
// </div>
const App = () => {
  return (
    <div id='app'>
  Hello World
  <h2>Hello MiniReact</h2>
  <Counter num={20} />
  <Counter num={30} />
</div>
  )
}
export default App