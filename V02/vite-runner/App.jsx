/*
 * @Author: Tmier
 * @Date: 2024-01-13 22:44:52
 * @LastEditTime: 2024-01-17 22:48:12
 * @LastEditors: Tmier
 * @Description: 
 * 
 */
import React from './core/React.js'
// const App = React.createElement('div', { id: 'app' }, ' Hello World', 'Hello', 'Mini-React')
function Counter({num}) {
  const toLog = () => {
    console.log('1');
  }
  return <div>Counter: {num}
  <button onClick={toLog}>Test</button>
  </div>
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