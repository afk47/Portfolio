import { useState } from 'react'
import './App.css'
import CanvasComponent from './components/canvas'
import Home from './pages/home'

function App() {
  const [count, setCount] = useState(0)

  return (    
    <div className='w-screen h-screen'>
        <Home/>
    </div> 
   
  )
}

export default App
