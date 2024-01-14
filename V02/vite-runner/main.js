import ReactDom from './core/ReactDom.js'
import App from './App.jsx'

function WorkLoop(deadline) {
  console.log(deadline.timeRemaining());
  // requestIdleCallback(WorkLoop)
}
requestIdleCallback(WorkLoop)

ReactDom.createRoot(document.querySelector('#root')).render(App)